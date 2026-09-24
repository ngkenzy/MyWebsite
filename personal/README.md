# Personal Vault

The Personal Vault is designed for private pages that should not appear openly on the public portfolio.

## How it works

- `personal/index.html` is the shared unlock screen and private-page launcher.
- `personal/config.json` stores the PBKDF2 salt and encrypted verifier. It does not store the PIN.
- `personal/links.json` is the registry of private pages shown after unlock.
- `personal/data/*.part` contains encrypted page payloads.
- The browser derives the vault key from the PIN and stores the unlocked key only in `sessionStorage`.
- One successful unlock applies to all pages in the vault for that browser session.
- Clicking **Lock** clears the session key.

## Adding another personal page

1. Compress the HTML with gzip.
2. Encrypt it with AES-256-GCM using the same vault key derivation parameters.
3. Split the encrypted JSON into one or more files under `personal/data/`.
4. Add a new item to `personal/links.json` with its title, subtitle, updated date, and parts array.

Do not commit the original unencrypted private HTML to this repository.

## Security note

This repo is public. Encryption protects the private page contents from casual inspection, but a short numeric PIN is not equivalent to strong server-side authentication. For highly sensitive material, use a longer passphrase or move the vault behind authenticated server access.
