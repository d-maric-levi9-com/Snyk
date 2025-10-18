# Quick Setup Guide: Snyk + GitHub Actions

## 🎯 5-Minute Setup

### 1. Get Your Snyk Token (2 minutes)

```
1. Go to https://app.snyk.io
2. Login/Sign up (free)
3. Click your profile icon → Account Settings
4. Copy your API Token
```

### 2. Add Token to GitHub (1 minute)

```
1. Go to your GitHub repo
2. Settings → Secrets and variables → Actions
3. New repository secret
4. Name: SNYK_TOKEN
5. Paste token → Add secret
```

### 3. Push Your Code (1 minute)

```bash
git add .
git commit -m "Add Snyk security scanning"
git push origin main
```

### 4. Watch It Work! (1 minute)

```
1. Go to "Actions" tab in GitHub
2. Watch the workflow run
3. Check "Security" tab for results
```

## ✅ That's It!

Your repository now has automated security scanning on every push!

---

## 📊 Available Workflows

### `snyk-simple.yml` (Recommended for Beginners)
- Runs on: Push & Pull Requests to main
- Scans: Code vulnerabilities + Dependencies
- Time: ~2-3 minutes

### `snyk-security.yml` (Advanced)
- Runs on: Push, PR, and Weekly
- Scans: Code, Dependencies, IaC, Containers
- Time: ~5-10 minutes
- Features: Continuous monitoring

## 🔧 Customization

### Change Trigger Branches

Edit the workflow file:

```yaml
on:
  push:
    branches: [ main, develop, staging ]  # Add your branches
  pull_request:
    branches: [ main ]
```

### Change Severity Threshold

```yaml
with:
  args: --severity-threshold=high  # Options: low, medium, high, critical
```

### Fail Build on Issues

Remove `continue-on-error: true` to fail the build when vulnerabilities are found:

```yaml
- name: Run Snyk to check for vulnerabilities
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  # Removed: continue-on-error: true
```

## 🎨 Workflow Features

### What Each Job Does

| Job | Purpose | When It Runs |
|-----|---------|--------------|
| `snyk-code-scan` | Finds code vulnerabilities (XSS, SQLi, etc.) | Every push/PR |
| `snyk-open-source` | Checks dependencies for vulnerabilities | Every push/PR |
| `snyk-monitor` | Sends snapshot to Snyk for tracking | Only on main branch |
| `snyk-iac` | Scans infrastructure configs | Every push/PR |
| `snyk-container` | Scans Docker images | If Dockerfile exists |

### Results Location

**GitHub:**
- Actions tab: Workflow run details
- Security tab → Code scanning: Vulnerability details
- Pull Request: Inline comments (if configured)

**Snyk Dashboard:**
- app.snyk.io → Projects: Full vulnerability details
- Recommendations and fix advice
- Historical tracking

## 🚀 Pro Tips

### 1. Enable Security Tab Integration

The workflows already upload SARIF files to GitHub Security:

```yaml
- name: Upload results to GitHub Security
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: snyk.sarif
```

### 2. Add Status Badge to README

```markdown
![Snyk Security](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/snyk-simple.yml/badge.svg)
```

### 3. Run on Schedule

Already configured in `snyk-security.yml`:

```yaml
schedule:
  - cron: '0 9 * * 1'  # Weekly on Mondays at 9am
```

### 4. Scan Specific Files Only

```yaml
with:
  args: --file=package.json
```

### 5. Use Different Snyk Actions by Language

**Python:**
```yaml
- uses: snyk/actions/python@master
```

**Java/Maven:**
```yaml
- uses: snyk/actions/maven@master
```

**Docker:**
```yaml
- uses: snyk/actions/docker@master
```

**Terraform:**
```yaml
- uses: snyk/actions/iac@master
```

## 🔍 Debugging

### Workflow Not Running?

1. Check if `SNYK_TOKEN` is set in GitHub Secrets
2. Verify the workflow file is in `.github/workflows/`
3. Check Actions tab for error messages
4. Ensure you're pushing to the correct branch

### Token Issues?

```bash
# Test your token locally
export SNYK_TOKEN=your_token_here
snyk auth $SNYK_TOKEN
snyk test
```

### Workflow Failing?

Common issues:
- Missing `package.json` (for Node.js projects)
- Dependencies not installing
- Network timeouts (add retry logic)

## 📱 Notifications

### Get Notified on Failures

GitHub → Settings → Notifications → Actions:
- ✅ Email notifications for workflow failures
- ✅ Pull request comments
- ✅ Slack/Discord webhooks (via integrations)

## 🔐 Security Best Practices

1. ✅ Never commit `SNYK_TOKEN` to your code
2. ✅ Use GitHub Secrets for all tokens
3. ✅ Regularly rotate API tokens
4. ✅ Limit token scope to necessary permissions
5. ✅ Use branch protection rules with required checks

## 📚 Learn More

- [Snyk GitHub Actions Docs](https://github.com/snyk/actions)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SARIF Format](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)

---

## 🆘 Need Help?

- Check the [Actions tab] for detailed logs
- Visit [Snyk Support](https://support.snyk.io)
- Search [Snyk Community](https://community.snyk.io)

