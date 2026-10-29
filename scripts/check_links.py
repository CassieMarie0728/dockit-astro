"""Check local href destinations and HTML fragment IDs in an Astro static build."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('name'):
            self.ids.add(attrs['name'])
        if attrs.get('href'):
            self.links.append(attrs['href'])


def check_site(directory):
    root = Path(directory).resolve()
    pages = sorted(root.rglob('*.html'))
    if not pages:
        return 0, ['No HTML pages found. Build the site first.']
    docs = {p: Document(p.read_text(encoding='utf-8')) for p in pages}
    errors = []
    for source, doc in docs.items():
        relative = source.relative_to(root).as_posix()
        route = '/' + relative
        if route.endswith('index.html'):
            route = route[:-len('index.html')]
        for href in doc.links:
            link = urlsplit(href)
            # External URLs and non-web schemes are intentionally not fetched.
            if link.scheme or link.netloc:
                continue
            resolved = urlsplit(urljoin(route, href))
            target = (root / unquote(resolved.path).lstrip('/')).resolve()
            if not target.is_relative_to(root):
                errors.append(f'{relative}: destination escapes build directory: {href}')
                continue
            if target.is_dir():
                target /= 'index.html'
            if not target.is_file():
                errors.append(f'{relative}: missing destination: {href}')
                continue
            if resolved.fragment and target.suffix == '.html':
                target_doc = docs.get(target)
                if target_doc is None:
                    target_doc = Document(target.read_text(encoding='utf-8'))
                    docs[target] = target_doc
                anchor = unquote(resolved.fragment)
                # Browsers use text fragments without requiring an element ID.
                anchor = anchor.split(':~:text=', 1)[0]
                if anchor and anchor not in target_doc.ids:
                    errors.append(f'{relative}: missing fragment: {href}')
    return len(pages), sorted(set(errors))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', nargs='?', default='dist')
    args = parser.parse_args()
    count, errors = check_site(args.directory)
    for error in errors:
        print(error)
    print(f'Checked {count} HTML pages; {len(errors)} link errors.')
    return bool(errors)


if __name__ == '__main__':
    raise SystemExit(main())
