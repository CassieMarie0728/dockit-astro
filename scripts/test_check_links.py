import tempfile
import unittest
from pathlib import Path
from check_links import check_site


class CheckLinksTests(unittest.TestCase):
    def site(self, files):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        root = Path(temp.name)
        for name, text in files.items():
            target = root / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(text, encoding='utf-8')
        return root

    def test_root_relative_query_and_fragment(self):
        root = self.site({'index.html': '<a href="/guide/?q=x&amp;n=2#step">go</a>',
                          'guide/index.html': '<h2 id="step">Step</h2>'})
        self.assertEqual(check_site(root), (2, []))

    def test_relative_url_and_encoded_id(self):
        root = self.site({'guide/index.html': '<a href="../other/#caf%C3%A9">go</a>',
                          'other/index.html': '<h2 id="café">Step</h2>'})
        self.assertEqual(check_site(root), (2, []))

    def test_missing_page_fails(self):
        root = self.site({'index.html': '<a href="/missing/">no</a>'})
        self.assertIn('missing destination', check_site(root)[1][0])

    def test_missing_fragment_fails(self):
        root = self.site({'index.html': '<a href="#missing">no</a>'})
        self.assertIn('missing fragment', check_site(root)[1][0])

    def test_external_and_non_web_schemes_are_skipped(self):
        root = self.site({'index.html': '<a href="https://example.invalid">x</a><a href="mailto:test@example.invalid">m</a><a href="//example.invalid">y</a>'})
        self.assertEqual(check_site(root), (1, []))

    def test_assets_and_text_fragments(self):
        root = self.site({'index.html': '<link href="/style.css"><a href="#:~:text=hello">t</a>',
                          'style.css': 'body{}'})
        self.assertEqual(check_site(root), (1, []))

    def test_empty_build_fails(self):
        self.assertTrue(check_site(self.site({}))[1])

    def test_subpath_links_map_to_artifact_root(self):
        root = self.site({'index.html': '<a href="/dockit-astro/guide/#step">go</a>',
                          'guide/index.html': '<h1 id="step">Step</h1>'})
        self.assertEqual(check_site(root, '/dockit-astro'), (2, []))

    def test_unprefixed_link_fails_for_subpath_host(self):
        root = self.site({'index.html': '<a href="/guide/">go</a>', 'guide/index.html': ''})
        self.assertIn('outside deployment base', check_site(root, '/dockit-astro')[1][0])

    def test_script_and_image_sources_are_checked(self):
        root = self.site({'index.html': '<script src="/dockit-astro/app.js"></script><img src="/dockit-astro/missing.png">', 'app.js': ''})
        errors = check_site(root, '/dockit-astro')[1]
        self.assertEqual(len(errors), 1)
        self.assertIn('missing.png', errors[0])


if __name__ == '__main__':
    unittest.main()
