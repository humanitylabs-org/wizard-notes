# Notes backend capabilities

| Capability | Entry point | Responsibility |
|---|---|---|
| Notes backlinks invalid-link isolation | `Vault.backlinks`, `Vault.link_target`, `Vault.resolve` | Skips rejected outgoing links via the existing resolver; requested-note validation unchanged. No shared shell capability or UI dependency. |
| Notes hidden-trash confinement | `Vault.trash_path`, `Vault.delete`, `Vault.restore` | Extends the existing vault path policy to reject current symlinks in hidden trash paths before delete/restore. No external-folder setting or shell dependency; not hostile concurrent-writer isolation. |
| Notes owner-selected vault folder | `Vault(data, root)`, `start.py` `ident` | Off by default: `NOTES_VAULT_DIR` (absolute, existing folder) serves an owner-mounted folder without seeding it; `NOTES_UID` / `NOTES_GID` (default 1000) choose the runtime ids. No shell UI or shared-files service. |
