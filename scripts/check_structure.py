"""Check a few static HTML semantics; this is not a browser or WCAG audit."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import sys


class Structure(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


def audit_html(text):
    tags = Structure(text).tags
    errors = []
    for landmark in ('h1', 'main'):
        count = sum(tag == landmark for tag, _ in tags)
        if count != 1:
            errors.append(f'Expected one {landmark}, found {count}')
    ids = Counter(attrs['id'] for _, attrs in tags if attrs.get('id'))
    for name, count in ids.items():
        if count > 1:
            errors.append(f'Duplicate id: {name}')
    toggles = [(tag, attrs) for tag, attrs in tags if attrs.get('id') == 'nav-toggle']
    if len(toggles) != 1:
        errors.append('Expected one main navigation toggle')
    else:
        tag, attrs = toggles[0]
        if tag != 'button' or attrs.get('type') != 'button' or not attrs.get('aria-label'):
            errors.append('Main navigation toggle must be a named button')
        if attrs.get('aria-expanded') not in ('true', 'false'):
            errors.append('Main navigation toggle needs aria-expanded')
        if not attrs.get('aria-controls') or attrs['aria-controls'] not in ids:
            errors.append('Main navigation toggle controls a missing element')
    if not any(tag == 'nav' and attrs.get('aria-label') == 'Main navigation' for tag, attrs in tags):
        errors.append('Missing named main navigation landmark')
    return errors


def main(directory='dist'):
    pages = sorted(Path(directory).rglob('*.html'))
    if not pages:
        print('No HTML pages found. Build first.')
        return 1
    errors = []
    for page in pages:
        errors.extend(f'{page}: {error}' for error in audit_html(page.read_text(encoding='utf-8')))
    for error in errors:
        print(error)
    print(f'Checked {len(pages)} HTML pages; {len(errors)} structural errors.')
    return bool(errors)


if __name__ == '__main__':
    raise SystemExit(main(sys.argv[1] if len(sys.argv) > 1 else 'dist'))
