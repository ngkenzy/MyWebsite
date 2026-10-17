#!/usr/bin/env python3
"""Check published local links, fragments, semantics, and the deployment boundary."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from build_site import DEST, PUBLIC, build

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.references = []
        self.errors = []
        self.h1 = 0
        self.main = 0
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids: self.errors.append('Duplicate ID: ' + a['id'])
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'main': self.main += 1
        if tag == 'img' and 'alt' not in a: self.errors.append('Image has no alt attribute')
        for attr in ('href', 'src'):
            if attr in a: self.references.append(a[attr])

build()
pages = {p: Page(p.read_text()) for p in DEST.rglob('*.html')}
errors = []
for path, page in pages.items():
    errors.extend(f'{path.name}: {e}' for e in page.errors)
    if path.name in ('index.html', 'research.html'):
        if page.h1 != 1 or page.main != 1: errors.append(f'{path.name}: expected one h1 and main')
    for ref in page.references:
        u = urlsplit(ref)
        if u.scheme or u.netloc: continue
        target = (DEST / unquote(u.path.lstrip('/')) if u.path.startswith('/') else path.parent / unquote(u.path)).resolve() if u.path else path
        if not target.is_relative_to(DEST): errors.append(f'Outside publish directory: {ref}'); continue
        if not target.exists(): errors.append(f'{path.name}: missing {ref}'); continue
        if u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:
            errors.append(f'{path.name}: missing fragment {ref}')
actual = {str(p.relative_to(DEST)) for p in DEST.rglob('*') if p.is_file()}
if actual != set(PUBLIC): errors.append('Published files do not match the public allowlist')
for forbidden in ('personal', 'img/Pictures', '.git', 'resume.tex', 'framingham.csv', 'js/ask-phuoc-reflections.js'):
    if (DEST / forbidden).exists(): errors.append(f'Private/legacy asset published: {forbidden}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML pages; local links and fragments; primary page landmarks; image alternatives; {len(actual)} allowlisted files.')
