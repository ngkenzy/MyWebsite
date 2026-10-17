#!/usr/bin/env python3
"""Produce a public-only Hostinger upload directory. No third-party dependencies."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'dist'
# Explicit file allowlist: never copy the repository root or image tree wholesale.
PUBLIC = [
    'index.html', 'research.html', 'resume.pdf', 'robots.txt', 'sitemap.xml',
    '.htaccess', 'css/portfolio.css', 'js/portfolio.js',
    'Evaluating_AI_generated_text_summaries_using_Open_AI_s_GPT_model.pdf',
    'Sentiment_Aware_Text_Summarization.pdf',
    'img/favicon.png', 'img/japan-mountains.jpg', 'img/Hackathon3.jpg',
    *[f'img/portfolio-{i}.jpg' for i in range(1, 7)],
    'MyBlog/blog.html', 'MyBlog/stocks.html', 'MyBlog/css/style.css', 'MyBlog/js/main.js',
]

def build():
    for name in PUBLIC:
        source = ROOT / name
        if not source.is_file() or source.is_symlink():
            raise ValueError(f'Missing or unsafe public file: {name}')
    if DEST.is_symlink():
        raise ValueError('dist must not be a symlink')
    if DEST.exists():
        shutil.rmtree(DEST)
    for name in PUBLIC:
        target = DEST / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / name, target)
    print(f'Built {len(PUBLIC)} public files in {DEST}')

if __name__ == '__main__':
    build()
