# NovaTech Enterprise Standards

Organization-wide Claude Code standards for all NovaTech projects.

## Security Requirements

### Never Commit
- API keys or tokens
- Passwords or secrets
- Private keys (.pem, .key)
- Environment files (.env)

### Always Use
- Environment variables for sensitive data
- HTTPS for all external requests
- Parameterized queries for databases

## Code Standards

### All Languages
- Maximum file length: 500 lines
- Maximum function length: 50 lines
- Meaningful variable names
- Comments for complex logic

### JavaScript
- ES6+ syntax
- Strict mode
- JSDoc for public functions
- ESLint compliance

### CSS
- BEM naming convention
- CSS custom properties for theming
- Mobile-first responsive design

## Git Workflow

### Branch Naming
- `feature/` — New features
- `bugfix/` — Bug fixes
- `hotfix/` — Production emergencies
- `release/` — Release preparation

### Commit Messages
Format: `type: description`

Types: feat, fix, docs, style, refactor, test, chore

### Pull Requests
- Require at least one review
- All tests must pass
- No merge conflicts
- Updated documentation

## Approved Tools

### Allowed
- npm packages from registry.npmjs.org
- GitHub for version control
- Playwright for E2E testing

### Requires Approval
- New external API integrations
- Database schema changes
- Authentication modifications

## Support

Questions: engineering@novatech.example
