# NovaTech Solutions

Demo project for the **Advanced Claude Code** course on Pluralsight.

NovaTech Solutions is a fictional tech consultancy website built with vanilla HTML, CSS, and JavaScript — intentionally framework-free to keep the focus on Claude Code features.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- Node.js 18+
- Git
- GitHub account (for MCP integration)

---

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/nyisztor/novatech-demo.git
cd novatech-demo
npm install
```

### 2. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000/pages/index.html](http://localhost:3000/pages/index.html) in your browser.

The port defaults to `3000`. Override it with the `PORT` environment variable:

```bash
PORT=4000 npm run dev
```

### 3. Launch Claude Code

In a separate terminal:

```bash
claude
```

---

## MCP Server Configuration

MCP (Model Context Protocol) servers extend Claude Code with external capabilities. This project ships a template at `.mcp.example.json`. Your live config lives in `.mcp.json` (gitignored).

Copy the template and fill in your credentials:

```bash
cp .mcp.example.json .mcp.json
```

Three MCP servers are pre-configured in the template:

| Server | Purpose | Auth |
|--------|---------|------|
| `github` | Read/write GitHub repos, PRs, issues | `GITHUB_CLAUDE_KEY_PERSONAL` env var |
| `figma` | Inspect and sync Figma design files | `FIGMA_ACCESS_TOKEN` env var |
| `filesystem` | Scoped file access to `src/`, `docs/`, `tests/` | None |

### Setting Up API Tokens

Store tokens as environment variables — never in `.mcp.json` or committed files.

#### GitHub Token

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a new classic token named `Claude Code MCP`
3. Select scopes: `repo` (private repos) and `read:org` (org access)
4. Copy the token

```bash
# macOS / zsh
echo 'export GITHUB_CLAUDE_KEY_PERSONAL=your_token_here' >> ~/.zshrc
source ~/.zshrc
```

```bash
# Linux / bash
echo 'export GITHUB_CLAUDE_KEY_PERSONAL=your_token_here' >> ~/.bashrc
source ~/.bashrc
```

```cmd
# Windows (PowerShell / Command Prompt) — restart terminal after
setx GITHUB_CLAUDE_KEY_PERSONAL "your_token_here"
```

#### Figma Token (Optional)

Required only for the remote MCP server; the Figma Desktop app uses OAuth.

1. Go to [https://www.figma.com/settings](https://www.figma.com/settings)
2. Scroll to "Personal access tokens" and generate one named `Claude Code MCP`
3. Copy the token

```bash
# macOS / zsh
echo 'export FIGMA_ACCESS_TOKEN=your_token_here' >> ~/.zshrc
source ~/.zshrc
```

Verify both tokens are available:

```bash
echo $GITHUB_CLAUDE_KEY_PERSONAL
echo $FIGMA_ACCESS_TOKEN
```

### Figma Design File (Optional)

[NovaTech Solutions on Figma](https://www.figma.com/design/UZ2t3sc5vi2cn9MXHkOfLY/NovaTech-Solutions?node-id=1-2&p=f)

Duplicate it to your Drafts for an editable copy. Includes: Homepage and Homepage - Updated (with design changes for demos).

---

## Project Structure

```
novatech-demo/
├── src/
│   ├── pages/              # Five HTML pages
│   │   ├── index.html
│   │   ├── services.html
│   │   ├── portfolio.html
│   │   ├── team.html
│   │   └── contact.html
│   ├── css/
│   │   ├── variables.css   # Design tokens (colors, spacing, typography)
│   │   ├── base.css        # Resets and defaults
│   │   ├── components.css  # Reusable UI components
│   │   └── pages/          # Page-scoped stylesheets
│   └── js/
│       ├── navigation.js
│       ├── contact-form.js
│       ├── portfolio-filters.js
│       └── validation.js
├── tests/
│   ├── e2e/                # Playwright end-to-end tests
│   │   ├── navigation.spec.js
│   │   └── contact-form.spec.js
│   └── unit/               # Node.js built-in test runner
│       └── validation.test.js
├── docs/
│   ├── api-spec.md
│   └── figma-spec.md
├── scripts/
│   └── setup-worktrees.sh  # Git worktree helper for parallel sessions
├── .claude/
│   ├── agents/             # Subagent definitions
│   ├── skills/             # Reusable skill prompts
│   ├── enterprise-templates/
│   ├── rules/
│   ├── logs/               # Hook-generated logs (gitignored content)
│   └── settings.json       # Hooks and permissions config
├── .mcp.example.json       # MCP server template (copy to .mcp.json)
├── .eslintrc.json
├── playwright.config.js
├── package.json
└── CLAUDE.md               # Project context for Claude Code
```

---

## Available npm Scripts

Run all commands from the project root.

| Script | What it does |
|--------|-------------|
| `npm run dev` | Starts `serve` on port 3000 (override with `PORT`) |
| `npm run lint` | Runs ESLint against `src/js/` |
| `npm run lint:fix` | Runs ESLint with `--fix` |
| `npm run format` | Formats `src/**/*.{html,css,js}` with Prettier |
| `npm run format:check` | Checks formatting without writing |
| `npm run test` | Runs unit tests then E2E tests |
| `npm run test:unit` | Runs Node.js built-in test runner on `tests/unit/` |
| `npm run test:e2e` | Runs Playwright tests (auto-starts dev server) |
| `npm run test:e2e:ui` | Opens the Playwright interactive UI |

Run tests before committing:

```bash
npm test
```

The E2E suite (`test:e2e`) starts the dev server automatically via Playwright's `webServer` config. No separate `npm run dev` needed.

---

## Claude Code Features by Module

| Module | Feature | Key Files |
|--------|---------|-----------|
| 1 | MCP Server Integration | `.mcp.json`, `.mcp.example.json` |
| 2 | Subagents | `.claude/agents/` |
| 3 | Git Worktrees | `scripts/setup-worktrees.sh` |
| 4 | Enterprise Features | `.claude/enterprise-templates/` |
| 5 | Agent Skills | `.claude/skills/` |
| 6 | Hooks | `.claude/settings.json` |

### Subagents

| Agent | Model | Role |
|-------|-------|------|
| `code-reviewer` | Opus | Security, correctness, a11y, performance review |
| `content-reviewer` | Sonnet | Copy quality, tone, placeholder detection |
| `doc-generator` | Sonnet | README and technical documentation |
| `style-fixer` | — | CSS bugs, responsive design, design tokens |
| `test-runner` | — | Execute tests, triage failures |

### Hooks (`.claude/settings.json`)

- **PreToolUse / Bash** — logs every shell command to `.claude/logs/commands.log`
- **PreToolUse / Write|Edit|MultiEdit** — blocks writes to `.env`, `.key`, and `secrets/` paths
- **PostToolUse / Write|Edit|MultiEdit** — auto-formats modified `.js`, `.css`, `.html` files via Prettier
- **Notification** — logs all notifications to `.claude/logs/notifications.log`
- **Stop** — logs session end reason to `.claude/logs/sessions.log`

### Git Worktrees

Set up parallel working directories for concurrent Claude Code sessions:

```bash
bash scripts/setup-worktrees.sh
```

This creates three worktrees one level above the repo root:

| Branch | Description |
|--------|-------------|
| `feature/services-redesign` | Services page layout updates |
| `feature/contact-form` | Contact form validation improvements |
| `bugfix/responsive-nav` | Mobile navigation fixes |

---

## Viewing Hidden Files

This project uses a `.claude/` folder that is hidden by default on most systems.

| Environment | How to show hidden files |
|-------------|--------------------------|
| macOS Finder | `Cmd + Shift + .` |
| Windows File Explorer | View > Show > Hidden items |
| VS Code | Visible by default |
| Linux file manager | `Ctrl + H` or View > Show Hidden Files |
| Terminal (any OS) | `ls -la` |

---

## Tech Stack

- HTML5 semantic markup
- CSS3 with custom properties (design tokens)
- Vanilla JavaScript ES6+ modules
- [Playwright](https://playwright.dev/) for E2E testing
- Node.js built-in test runner for unit tests
- [ESLint](https://eslint.org/) (`eslint:recommended`, ES2021, single quotes, 2-space indent)
- [Prettier](https://prettier.io/) for formatting
- [serve](https://github.com/vercel/serve) as the local dev server

---

## License

Licensed under the MIT License. Educational project for Pluralsight, authored by Károly Nyisztor.
