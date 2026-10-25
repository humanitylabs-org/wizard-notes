# Wizard Notes

A private-by-default, Obsidian-compatible vault of plain `.md` files. Organise nested folders, connect thoughts with wiki links, search titles and text, or write in Markdown without losing ownership of your notes.

## Privacy & your data

The vault is plain `.md` on your disk in the app's data folder: `${APP_DATA_DIR}/data/vault` (mounted as `/data/vault`). It survives uninstall; include this app data folder in your Wizard backups. It is **not** the shared owner Files/media root and the package declares no `shares:` export.

Wizard Notes joins private agents by default, never the main agent. The install sheet offers **Set up private agent** when none exists. The vault is readable/editable through Wizard only by agents you tick; the owner can explicitly tick other agents and revoke access later. The owner view remains available regardless of agent assignment. This is an app/gateway boundary, not protection against an administrator or a process with access to the owner's disk.

The service accepts owner-authenticated, same-host Wizard browser requests. Optional trusted hosts/origins come from the Runtipi form, never baked-in owner addresses. The declared `/gateway/mcp` route is a box-trusted transport behind owner ingress and the agent-scoped Wizard gateway (which does not inject per-app credentials); browser requests cannot use that route. Direct `/mcp` integrations use the app-data `agent.token` bearer credential. Do not expose the container directly to the Internet.

## Features

- One-screen nested vault tree; sort by name or modified time; new notes/folders, rename, move, trash and restore.
- Plain Markdown editing and reading, formatting shortcuts, linked notes/backlinks, title/body search, daily notes.
- Revision-checked atomic saves, retained local drafts and explicit conflict recovery; external file changes are read on demand.
- Phone thumb swipe opens/closes the drawer with finger tracking, distance/velocity snaps, native vertical scrolling and focused-editor edge protection. Back closes nested views and never exits Wizard.
- Shared Wizard appearance, dialogs, Back, sharing transport and Markdown/editor services; desktop and phone layouts.

## Install

Use the **Wizard Alpha** catalog, select **Wizard Notes**, then choose which agents can use it. The catalog release supplies amd64/arm64 image archives. Runtipi keeps data on uninstall. No sign-up or paid provider is required.

This public package has id `wizard-notes`. An existing local `notes` installation is a separate identity and must not be reinstalled or migrated implicitly.

## API & MCP

`openapi.json` describes the HTTP API. `GET /healthz`, `/api/tree`, `/api/note?path=Inbox/Idea.md`, `/api/search?q=phrase`, `/api/backlinks` and `/api/resolve` are read-only. Mutations use `/api/note`, `/api/folder`, `/api/move`, `/api/delete`, `/api/restore` and `/api/today`.

The Wizard registry declares streamable-HTTP `/gateway/mcp`; direct integrations use authenticated `/mcp`. Tools are `notes_tree`, `notes_search`, `notes_read`, `notes_write`, `notes_mkdir`, `notes_move`, `notes_delete`. Read before writing and send the current `rev`; never overwrite a conflict blindly. The installed `skill/SKILL.md` documents safe tool use. Paths are vault-relative; no dot segments, absolute paths, symlinks or hidden paths. `Vault.path()` is the central server path gate, reserved as the extension point for future per-path access.

## Run & test

Python 3.12+ and Node 20+; the server uses only Python's standard library.

```sh
DATA_DIR=.data HOST=127.0.0.1 PORT=8799 python3 app/server.py
python3 -m unittest discover -s tests
node --test tests/editor.test.cjs
python3 scripts/check_release.py
```

The app view uses `/wizard-os-home/core/app-client.js` from a Wizard installation. It is not a second copy of the Wizard shell. For real Chromium touch/Back acceptance, install Playwright, provide `WIZARD_CORE` (the approved shell `web/core` directory), and run `node tests/swipe.test.cjs`. Optional `QA_PLAYWRIGHT`, `QA_CHROME` and `QA_OUT` select installed tools/evidence locations. Touch QA uses an in-memory fake vault, never the owner's notes.

Build/release images on your configured build worker using `python3 scripts/release_images.py --help`; publish only archives built from the exact tagged commit. See `scripts/publish_alpha.py --help` for manifest generation from real release assets. No release receipt is fabricated or inferred from source checks.

## Reuse

- REUSE: `WizardApp` appearance, Back, dialogs, Markdown, editor transforms and sharing transport.
- EXTEND: the app-owned tree drawer with touch intent consistent with shell swipe thresholds. No shell navigation code is copied or modified.
- NEW: none in the shared shell. The app owns only vault/domain state and callbacks.

## Live Preview & offline dependencies

Live Preview is the default editor: headings, emphasis, nested list markers, tasks, quotes, fenced code and wiki links render in place. Markdown syntax appears on the caret/selection lines; tap a rendered wiki link to navigate, or move the caret onto that line to edit its source. The book button is a separate non-editable Reading view. Backlinks remain below both views.

- REUSE: CodeMirror 6's native editable DOM, Android/IME handling, selection, history and keymaps; the existing `WizardApp.update.hold`, revision-conflict recovery, appearance, Back and sharing services.
- EXTEND: the existing Notes editor adapter, formatting transforms, list continuation and drawer intent guard. A Lezer Markdown parse supplies disposable decorations without rewriting the document. Composition updates map existing decorations; they never replace the composing DOM or replay native text. Autosave waits for composition to settle.
- NEW: no parallel shell capability. The app-owned Markdown projection/model lives in `editor/`, and its offline bundle in `web/vendor/`. The shared shell has no Live Preview service to reuse; this is a domain editor, not a replacement for `WizardApp.editor` transforms.

CodeMirror was chosen over a home-grown contenteditable line model because preserving native Android composition/autocorrect is the primary risk. It handles platform input; our code only decorates and routes transactions. The raw-string adapter applies LF-indexed editor changes back to original Markdown, preserving untouched BOM, mixed line endings, whitespace and final-newline bytes. Undo/redo retains exact recent raw snapshots, not HTML serialization. The server already reads/writes UTF-8 bytes atomically.

The minified MIT-only editor bundle is committed. No CDN, network font, `node_modules` or Node process is needed at runtime. All bundled dependencies, versions and license texts are in **[NOTICE](web/vendor/NOTICE.txt)**. `package-lock.json` pins build inputs; regenerate with `npm ci --ignore-scripts && npm run build:editor`. CI regenerates it and rejects drift. Run `npm test` for original transforms plus the Live Preview model tests. Browser acceptance uses `tests/live-preview.browser.cjs` and `tests/live-preview-input.browser.cjs` against a disposable scratch host; never use an owner's vault for typing tests. `tests/swipe.test.cjs` keeps the real hosted Back and CDP touch checks.

Synthetic Chromium composition is regression coverage, **not proof of Gboard, Samsung Keyboard, voice typing or WebView on a real phone**. Physical-device keyboard checks remain required before making that claim.

## Roadmap

Sharing (later): the vault is private by default. You can share single notes or whole folders with a standard agent on an ongoing basis (e.g. an "Archimedes" folder: anything moved in is readable/editable by that agent). Moving a note into a shared folder first runs a private-agent redaction pass that marks what you may want to remove; you approve, then it is shared. Access is per agent, per path, revocable.

Sharing and redaction are not implemented in this release.

## License

GPL-3.0-only; see `LICENSE`. The original app and its Wizard UI kit are retained under their existing license. No personal notes, private deployment configuration or owner QA evidence are included in this repository.
