# NovaTech Solutions

Demo project for the **Advanced Claude Code** course on Pluralsight.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/nyisztor/novatech-demo.git
cd novatech-demo

# Install dependencies
npm install

# Launch Claude Code
claude
```

## ⚠️ Important: View Hidden Files

This project uses a `.claude/` folder for Claude Code configurations. This folder is **hidden by default** on most operating systems.

**To see hidden files:**

| OS | Method |
|----|--------|
| **macOS** | In Finder: Press `Cmd + Shift + .` |
| **Windows** | In File Explorer: View → Show → Hidden items |
| **VS Code** | Hidden files are visible by default |
| **Linux** | In file manager: `Ctrl + H` or View → Show Hidden Files |
| **Terminal** | Use `ls -la` instead of `ls` |

The `.claude/` folder contains subagents, skills, hooks, and enterprise templates used throughout this course.

## About This Project

NovaTech Solutions is a fictional tech consultancy website. It serves as a hands-on learning environment for advanced Claude Code features:

| Module | Feature | Key Files |
|--------|---------|-----------|
| 1 | MCP Server Integration | `.mcp.json` |
| 2 | Subagents | `.claude/agents/` |
| 3 | Git Worktrees | `scripts/setup-worktrees.sh` |
| 4 | Enterprise Features | `.claude/enterprise-templates/` |
| 5 | Agent Skills | `.claude/skills/` |
| 6 | Hooks | `.claude/settings.json` |

## Project Structure

```
novatech-demo/
├── src/
│   ├── pages/          # HTML pages (5 pages)
│   ├── css/            # Stylesheets with design system
│   └── js/             # JavaScript modules
├── tests/
│   ├── e2e/            # Playwright tests
│   └── unit/           # Node.js unit tests
├── docs/               # Design specs, API docs
├── scripts/            # Automation scripts
├── .claude/
│   ├── agents/         # Subagent definitions
│   ├── skills/         # Custom skills
│   ├── commands/       # Slash commands
│   ├── enterprise-templates/
│   └── settings.json   # Hooks configuration
├── .mcp.json           # MCP server configuration
└── CLAUDE.md           # Project context
```

## Available Commands

Run these from the project root (`novatech-demo/`):

```bash
npm run dev         # Start local server
npm run lint        # Run ESLint
npm run format      # Run Prettier
npm run test        # Run all tests
npm run test:e2e    # Run Playwright E2E tests
npm run test:unit   # Run unit tests
```

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- Node.js 18+
- Git
- GitHub account (for MCP integration)

## Course Setup

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/novatech-demo.git
cd novatech-demo
npm install
```

### 2. Configure Environment

Create a `.env` file (not committed to git):

```bash
GITHUB_TOKEN=your_github_personal_access_token
FIGMA_ACCESS_TOKEN=your_figma_token  # Optional
```

### 3. Verify Setup

```bash
# Open the website
npm run dev

Open: **http://localhost:3000/pages/index.html**

# In another terminal, launch Claude Code
claude
```

## Pre-configured Branches

The repository includes branches for the Git Worktrees module:

- `feature/services-redesign` — Services page layout updates
- `feature/contact-form` — Form validation improvements  
- `bugfix/responsive-nav` — Mobile navigation fixes

## Open Pull Requests

Two PRs are available for the MCP/GitHub integration demo:

- **PR #1**: Add client testimonials section
- **PR #2**: Update team page with new hires

## License

Educational project for Pluralsight. All rights reserved.
