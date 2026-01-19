# Security Review Checklist

## Input Validation

### User Input
- [ ] All form inputs are validated on both client and server
- [ ] Input length limits are enforced
- [ ] Special characters are properly escaped
- [ ] File uploads validate type, size, and content

### URL Parameters
- [ ] Query parameters are sanitized before use
- [ ] Route parameters are validated against expected patterns
- [ ] Redirect URLs are validated against allowlist

## Cross-Site Scripting (XSS)

### Output Encoding
- [ ] User-generated content is escaped before rendering
- [ ] HTML attributes use proper encoding
- [ ] JavaScript contexts use JSON encoding
- [ ] URLs are validated before use in href/src attributes

### DOM Manipulation
- [ ] `innerHTML` is avoided; use `textContent` instead
- [ ] Dynamic element creation uses safe methods
- [ ] Event handlers don't execute user input

## Authentication & Authorization

### Session Management
- [ ] Session tokens are cryptographically secure
- [ ] Sessions expire after reasonable timeout
- [ ] Session is invalidated on logout
- [ ] Concurrent session limits are enforced

### Access Control
- [ ] Authorization checks on every protected route
- [ ] Server-side validation (don't trust client)
- [ ] Principle of least privilege applied
- [ ] Admin functions properly restricted

## Data Protection

### Sensitive Data
- [ ] Passwords never logged or exposed
- [ ] API keys not hardcoded in source
- [ ] Personal data minimized in responses
- [ ] Error messages don't leak internal details

### Storage
- [ ] Sensitive data encrypted at rest
- [ ] LocalStorage not used for secrets
- [ ] Cookies use Secure and HttpOnly flags
- [ ] Database queries use parameterization

## Dependencies

### Third-Party Code
- [ ] Dependencies from trusted sources only
- [ ] No known vulnerabilities (check npm audit)
- [ ] Licenses compatible with project
- [ ] Minimal dependency footprint

### CDN Resources
- [ ] Integrity hashes used for external scripts
- [ ] Fallbacks for CDN failures
- [ ] Version pinning to prevent supply chain attacks

## Common Vulnerabilities

### SQL Injection
```javascript
// BAD: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD: Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### Path Traversal
```javascript
// BAD: Direct path usage
const file = fs.readFileSync(`./uploads/${filename}`);

// GOOD: Validate and normalize
const safePath = path.normalize(filename).replace(/^(\.\.(\/|\\|$))+/, '');
const file = fs.readFileSync(path.join('./uploads', safePath));
```

### Insecure Direct Object Reference
```javascript
// BAD: Trust user-provided ID
app.get('/documents/:id', (req, res) => {
  return getDocument(req.params.id);
});

// GOOD: Verify ownership
app.get('/documents/:id', (req, res) => {
  const doc = getDocument(req.params.id);
  if (doc.ownerId !== req.user.id) return res.status(403);
  return doc;
});
```

## Reporting Security Issues

When you find a security issue:

1. **Severity**: Critical / High / Medium / Low
2. **Location**: File path and line number
3. **Description**: What the vulnerability allows
4. **Recommendation**: How to fix it
5. **References**: CWE ID or OWASP category if applicable
