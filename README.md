# MyWebsite v2 — Phuoc H. Nguyen

Version 2 of Phuoc H. Nguyen's professional portfolio. This redesign is developed on the `redesign/professional-portfolio` branch while the existing website remains on `main`.

Static HTML, CSS, and a small progressive-enhancement navigation script. No framework, dependency installation, or external services are required for the homepage and research page.

## Preview and validate

```sh
python3 scripts/check_site.py
node --check js/portfolio.js
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:8765`. The checker builds the site and checks local links, anchor targets, primary-page landmarks, image alternatives, and the public file allowlist.

## Edit

- `index.html`: positioning, selected projects, experience, and contact.
- `research.html`: papers, publication status, research system, and education.
- `css/portfolio.css`: shared responsive design, focus states, print and reduced-motion rules.
- `js/portfolio.js`: mobile navigation with Escape, focus handling, and no-JavaScript fallback.
- `scripts/build_site.py`: the explicit list of files permitted in a public deployment.

Career copy is grounded in the existing pages and résumé. Project benefits describe what the work enables; no unsupported adoption, accuracy, revenue, team-size, or savings metrics are claimed. arXiv work is labeled as a preprint, with the separate manuscript labeled prepublication.

## Deploy to Hostinger

1. Run the checks above and inspect both pages at desktop and phone widths.
2. Back up the current Hostinger web root privately.
3. Upload **only the contents of `dist/`**, including the hidden `.htaccess` file, into the domain's web root. Do not upload the repository.
4. Remove stale public files excluded by the allowlist, particularly `personal/`, `img/Pictures/`, old assistant scripts, loose source documents, and datasets. An overlay upload does not remove them.
5. Confirm homepage, research, résumé, papers, notes, and images load. Confirm `/personal/config.json`, `/personal/vault-data.js`, `/img/Pictures/`, `/.git/config`, and `/resume.tex` return 403 or 404. Confirm `.htaccess` is supported before relying on its rules.

No automatic Hostinger deployment is configured. The existing résumé-building workflow is preserved. The validation workflow builds a public-only artifact; it does not publish it.

Read [the public-surface audit](docs/PUBLIC-SURFACE-AUDIT.md) before deployment. Sensitive legacy files remain in the source repository and Git history; the deployment allowlist does not make the repository private.
