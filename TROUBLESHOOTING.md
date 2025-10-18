# Troubleshooting Snyk GitHub Actions

## Common Issues and Solutions

### ⚠️ Issue 1: "Code scanning is not enabled for this repository"

This happens when GitHub Advanced Security (Code Scanning) is not enabled.

#### **Solution A: Enable Code Scanning (For Public Repos - FREE)**

Public repositories have Code Scanning enabled by default. If you see this error:

1. Go to your repository on GitHub
2. Click **Settings** → **Code security and analysis**
3. Find **Code scanning** section
4. Click **Set up** → **Advanced**
5. This will create a CodeQL workflow (you can delete it later if you only want Snyk)

#### **Solution B: Enable Advanced Security (For Private Repos)**

Private repositories need GitHub Advanced Security (paid feature for organizations):

1. Go to **Settings** → **Code security and analysis**
2. Enable **GitHub Advanced Security** (requires GitHub Enterprise or Team plan)
3. Then enable **Code scanning**

> **Note**: GitHub Advanced Security is FREE for public repositories!

#### **Solution C: Use Artifacts Instead (No Advanced Security needed)**

If you can't enable Code Scanning, the workflows now upload results as **artifacts** automatically.

**How to view artifact results:**

1. Go to **Actions** tab in your repository
2. Click on a workflow run
3. Scroll down to **Artifacts** section
4. Download the `snyk-sarif-results` file
5. View the SARIF file using:
   - [SARIF Viewer Extension](https://marketplace.visualstudio.com/items?itemName=MS-SarifVSCode.sarif-viewer) for VS Code
   - Online viewers like [SARIF Web Viewer](https://microsoft.github.io/sarif-web-component/)
   - Or just view it in the Snyk Dashboard at [app.snyk.io](https://app.snyk.io)

---

### ⚠️ Issue 2: "Error: Path does not exist: snyk.sarif"

This happens when the Snyk scan doesn't generate a SARIF file.

#### **Possible Causes:**

1. **Snyk Token not set** - Check that `SNYK_TOKEN` is in GitHub Secrets
2. **Snyk scan failed** - Check the workflow logs for errors
3. **No vulnerabilities found** - Sometimes Snyk doesn't generate SARIF if nothing is found
4. **Wrong file path** - The SARIF file might be in a different location

#### **Solution:**

The workflows have been updated to:
- ✅ Check if SARIF file exists before uploading
- ✅ Upload as artifact if Code Scanning fails
- ✅ Use `continue-on-error` to prevent workflow failures

---

### ⚠️ Issue 3: Workflow Not Running

#### Checklist:

- [ ] Workflow files in `.github/workflows/` directory
- [ ] `SNYK_TOKEN` added to GitHub Secrets
- [ ] Pushing to the correct branch (`main` by default)
- [ ] GitHub Actions enabled for the repository

#### How to check:

```bash
# Verify workflow files exist
ls -la .github/workflows/

# Check branch name
git branch --show-current

# Verify you're pushing to the right branch
git push origin main
```

---

### ⚠️ Issue 4: Authentication Error (SNYK-0005) - "401 Unauthorized"

**Error message:**
```
ERROR   Authentication error (SNYK-0005)
Authentication credentials not recognized
Status: 401 Unauthorized
```

#### Quick Fix:

1. **Get fresh token**: [app.snyk.io](https://app.snyk.io) → Profile → Account Settings → API Token → **Regenerate** or **Show**
2. **Update GitHub Secret**: Repository Settings → Secrets and variables → Actions → Update `SNYK_TOKEN`
3. **Trigger workflow**: Push any change or run workflow manually

#### Detailed Solution:

**Step 1: Get your Snyk API token**
1. Login to [app.snyk.io](https://app.snyk.io)
2. Click profile icon (top right) → **Account Settings**
3. Scroll to **API Token** section
4. Click **"Click to show"** to reveal token (or **"Regenerate"** for new one)
5. **Copy the entire token** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

**Step 2: Add/Update GitHub Secret**
1. Go to your repository → **Settings**
2. **Secrets and variables** → **Actions**
3. If `SNYK_TOKEN` exists:
   - Click on it → **Update secret** → Paste token
4. If it doesn't exist:
   - **New repository secret**
   - Name: `SNYK_TOKEN` (must be exact, all caps)
   - Value: Paste your token (no extra spaces!)

**Step 3: Test locally** (recommended):
```bash
# Install Snyk CLI
npm install -g snyk

# Test authentication
snyk auth YOUR_TOKEN_HERE

# If successful, test scan
snyk code test
```

**Step 4: Trigger workflow**:
```bash
git commit --allow-empty -m "Test Snyk authentication"
git push origin main
```

**Common Mistakes:**
- ❌ Secret name is not exactly `SNYK_TOKEN` (check for typos)
- ❌ Extra spaces before/after token
- ❌ Token from wrong Snyk organization
- ❌ Old/expired token
- ❌ Copied only part of the token

**See detailed guide**: [`AUTHENTICATION_FIX.md`](AUTHENTICATION_FIX.md)

---

### ⚠️ Issue 5: Workflow Succeeds but No Results

If the workflow runs without errors but you don't see results:

#### Where to Look:

1. **Snyk Dashboard** (always works):
   - Go to [app.snyk.io](https://app.snyk.io)
   - Check **Projects** section
   - Your project should appear after running `snyk monitor`

2. **GitHub Security Tab** (needs Code Scanning enabled):
   - Repository → **Security** → **Code scanning**
   - Results appear here after SARIF upload

3. **GitHub Artifacts** (always available):
   - **Actions** → Select a workflow run
   - Scroll to **Artifacts**
   - Download SARIF files

4. **Workflow Logs**:
   - **Actions** → Select workflow run
   - Click on job name
   - Expand each step to see detailed output

---

### ⚠️ Issue 6: "Permission denied" or "403 Forbidden"

#### Possible Causes:

1. **Token expired** - Regenerate your Snyk token
2. **Wrong token** - Verify you copied the correct token
3. **Organization permissions** - Check Snyk organization settings

#### Solution:

```bash
# Test token locally
snyk auth your_token_here

# If successful, update GitHub Secret with same token
```

---

### ⚠️ Issue 7: Too Many Vulnerabilities Found

If Snyk finds too many issues and the workflow is overwhelming:

#### Solution: Adjust Severity Threshold

Edit the workflow file:

```yaml
with:
  args: --severity-threshold=critical  # Only show critical issues
```

Options: `low`, `medium`, `high`, `critical`

Or focus on specific files:

```yaml
with:
  args: --file=vulnerable-app.js
```

---

## 🔍 Debugging Steps

### Step 1: Check Workflow Logs

```
Actions → Select workflow run → Click job → Expand steps
```

Look for:
- ✅ Green checkmarks (success)
- ⚠️ Yellow warnings (non-fatal)
- ❌ Red X's (errors)

### Step 2: Test Locally

```bash
# Install Snyk CLI
npm install -g snyk

# Authenticate
snyk auth

# Test code scanning
snyk code test

# Test dependencies
snyk test

# Check what will be sent to dashboard
snyk monitor --dry-run
```

### Step 3: Verify Repository Settings

**For Public Repos:**
- ✅ Actions enabled
- ✅ Code scanning available (free)

**For Private Repos:**
- ✅ Actions enabled
- ✅ GitHub Advanced Security (paid)
- ✅ Code scanning enabled

### Step 4: Check Snyk Dashboard

Even if GitHub integration fails, Snyk Dashboard should always work:
1. Go to [app.snyk.io](https://app.snyk.io)
2. Check **Projects** section
3. Look for your repository

---

## 📋 Quick Fixes

### Remove SARIF Upload (if Code Scanning unavailable)

Comment out or remove these steps in your workflow:

```yaml
# Comment out or remove:
# - name: Upload results to GitHub Security
#   uses: github/codeql-action/upload-sarif@v3
#   with:
#     sarif_file: snyk.sarif
```

The artifact upload will still work!

### Make Workflow Fail on Vulnerabilities

Remove `continue-on-error: true` from the Snyk scan step:

```yaml
- name: Run Snyk to check for vulnerabilities
  uses: snyk/actions/node@master
  # Removed: continue-on-error: true
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### Add Slack Notifications

Add to your workflow:

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 🆘 Still Having Issues?

1. **Check workflow logs** in the Actions tab
2. **Test locally** with Snyk CLI
3. **View Snyk Dashboard** at [app.snyk.io](https://app.snyk.io)
4. **Check artifacts** in the workflow run
5. **Read Snyk documentation**: [docs.snyk.io](https://docs.snyk.io)
6. **Get help**: [support.snyk.io](https://support.snyk.io)

---

## ✅ Verification Checklist

- [ ] Snyk token added to GitHub Secrets
- [ ] Workflow files in `.github/workflows/`
- [ ] Pushing to correct branch
- [ ] GitHub Actions enabled
- [ ] Can see workflow runs in Actions tab
- [ ] Results visible in Snyk Dashboard
- [ ] (Optional) Code Scanning enabled for Security tab
- [ ] (Optional) Artifacts available in workflow runs

---

## 💡 Pro Tips

1. **Start Simple**: Use `snyk-simple.yml` first, then try `snyk-security.yml`
2. **Test Locally**: Always test with Snyk CLI before pushing
3. **Check Dashboard**: Snyk Dashboard ([app.snyk.io](https://app.snyk.io)) is the most reliable place for results
4. **Use Artifacts**: If Code Scanning doesn't work, artifacts are your friend
5. **Adjust Thresholds**: Start with `--severity-threshold=high` to reduce noise
6. **Monitor Regularly**: Use scheduled scans to catch new vulnerabilities

---

## 📞 Support Resources

- [Snyk Documentation](https://docs.snyk.io)
- [Snyk GitHub Actions Repo](https://github.com/snyk/actions)
- [Snyk Community](https://community.snyk.io)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

