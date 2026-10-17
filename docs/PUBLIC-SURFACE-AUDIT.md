# Public surface review — 2026-10-17

Scope: current repository checkout and generated deployment files. No attempt was made to decrypt personal content, guess a PIN, access the finance sheet, rewrite history, or inspect the Hostinger account. This is a focused exposure review, not a full penetration test.

## Findings and changes

| Priority | Finding | Change / remaining action |
| --- | --- | --- |
| High | `personal/` contains a public verifier, AES-GCM encrypted payloads, and a bundled copy in `vault-data.js`. PBKDF2 uses 600,000 iterations, but a short numeric PIN can still be guessed offline without server rate limits. | Removed the homepage entry, excluded the entire directory from the deployment allowlist, and added a server deny rule. The encrypted files remain in the repository and history. Move sensitive material to authenticated private hosting; assess the contents as potentially exposed if protected by a weak PIN. |
| High | `img/Pictures/` contains Lightroom catalogs, database files, caches, and personal image collections unrelated to the portfolio. | Excluded the entire tree and added a server deny rule. Review and remove these from public GitHub separately after retaining a private backup. History and existing downloads are not revoked by deployment changes. |
| Medium | The personal notes navigation exposes a finance spreadsheet URL. | Removed that navigation link. Sharing permissions were not inspected or changed. Review the sheet's sharing settings; the URL remains in Git history. |
| Medium | The vault exports its decryption key into same-origin `sessionStorage`. Any executing same-origin script could read it while unlocked. | The new public site does not deploy or link the vault. Isolate any future private application on an authenticated origin; do not use this static portfolio as an access-control boundary. |
| Medium | Loose documents, a raw health dataset, résumé source, and an older résumé copy are present at repository root or in `img/`. | Publish only the allowlist. These files were excluded, not destroyed. Current `resume.pdf` and the two public research PDFs are intentionally retained. |
| Medium | The notes and stocks tools store browser-local content; stocks accepts HTML and the notes framework restores stored HTML. These are authoring utilities, not authenticated private services. | Preserved existing routes/functionality as requested. Do not paste untrusted HTML or sensitive records into these tools. Keep them isolated from future authentication and private storage. |
| Low | Homepage loads remote icons, WebGL, and a downloadable AI model interface plus public reflection content. | New homepage/research pages use local CSS and a small navigation script. No fonts, icon kits, WebGL, model download, or assistant are loaded. Old scripts remain in source but are excluded from deployment. |

## Deployment boundary

`scripts/build_site.py` copies an explicit public file list into `dist/`. It never recursively copies `img/`, `personal/`, or the repository. The checker verifies that output against the allowlist. The older notes/stocks pages remain public by design and still use their existing implementation; the notes page retains Google Fonts.

Upload only the contents of `dist/`, including `.htaccess`. Uploading on top of an existing directory does not delete old files: remove the previously uploaded personal directory, Lightroom tree, unused scripts, and loose source files from the web root after keeping a private backup. Server deny rules are defense in depth and must be verified on Hostinger; the local Python preview does not execute `.htaccess`.

`robots.txt` is a crawler preference, not authentication. Removing links, adding deny rules, or deploying a clean directory does not remove data from a public Git repository, Git history, caches, or previously downloaded copies.

The published résumé intentionally retains the contact information and clearance description already present in the supplied résumé. No new personal details or performance metrics were added. Confirm those details are still intended for public use.
