import unittest
from check_structure import audit_html

VALID = '<nav aria-label="Main navigation"><button id="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu"></button><ul id="nav-menu"></ul></nav><main><h1 id="top">Title</h1></main>'


class StructureTests(unittest.TestCase):
    def test_valid_structure(self):
        self.assertEqual(audit_html(VALID), [])

    def test_missing_main_heading(self):
        self.assertTrue(any('one h1' in e for e in audit_html(VALID.replace('<h1 id="top">Title</h1>', ''))))

    def test_duplicate_ids(self):
        self.assertIn('Duplicate id: top', audit_html(VALID + '<div id="top"></div>'))

    def test_checkbox_is_not_a_menu_button(self):
        self.assertIn('Main navigation toggle must be a named button', audit_html(VALID.replace('<button', '<input')))

    def test_missing_control_target(self):
        self.assertIn('Main navigation toggle controls a missing element', audit_html(VALID.replace('id="nav-menu"', 'id="other"')))


if __name__ == '__main__':
    unittest.main()
