# 🔐 Fix Snyk Authentication Error (SNYK-0005)

## Error You're Seeing

```
ERROR   Authentication error (SNYK-0005)
Authentication credentials not recognized, or user access is not provisioned.
Status: 401 Unauthorized
```

## ✅ Step-by-Step Fix

### Step 1: Get a Fresh Snyk API Token

1. **Go to Snyk**: [https://app.snyk.io](https://app.snyk.io)
2. **Login** to your account
3. **Click your profile icon** (top right corner)
4. **Select "Account Settings"**
5. **Scroll down to "API Token"** section
6. **Click "Click to show"** to reveal your token
7. **Copy the entire token** (should start with something like `5b4e9f9c-...`)

> **Note**: If you see "Regenerate", your token might be old. Click it to create a new one.

---

### Step 2: Add Token to GitHub Secrets

1. **Go to your GitHub repository**
2. **Click "Settings"** tab (top navigation)
3. **Click "Secrets and variables"** → **"Actions"** (left sidebar)
4. **Look for existing `SNYK_TOKEN` secret**:
   
   **If it EXISTS:**
   - Click on `SNYK_TOKEN`
   - Click **"Update secret"**
   - Paste your new token
   - Click **"Update secret"**
   
   **If it DOESN'T exist:**
   - Click **"New repository secret"**
   - Name: `SNYK_TOKEN` (must be exact, all caps)
   - Secret: Paste your token
   - Click **"Add secret"**

---

### Step 3: Verify Token Format

Your token should look like:
```
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**Common mistakes:**
- ❌ Extra spaces before/after
- ❌ Copy only part of the token
- ❌ Wrong secret name (must be `SNYK_TOKEN`)
- ❌ Token from wrong organization

---

### Step 4: Test Locally (Optional but Recommended)

Test your token works before pushing:

```bash
# Install Snyk CLI
npm install -g snyk

# Test authentication with your token
snyk auth YOUR_TOKEN_HERE

# If successful, test a scan
snyk code test vulnerable-app.js
```

**Expected output if working:**
```
Your account has been authenticated. Snyk is now ready to be used.
```

---

### Step 5: Trigger Workflow Again

After updating the secret:

```bash
# Make a small change to trigger workflow
git commit --allow-empty -m "Test Snyk authentication"
git push origin main
```

Or manually trigger:
1. Go to **Actions** tab
2. Select **Snyk Security (Simple)** workflow
3. Click **"Run workflow"** button
4. Select branch and click **"Run workflow"**

---

## 🔍 Debugging Checklist

### Check GitHub Secret is Set

1. ✅ Go to Settings → Secrets and variables → Actions
2. ✅ Verify `SNYK_TOKEN` appears in the list
3. ✅ Name must be **exactly** `SNYK_TOKEN` (all caps, no spaces)

### Check Workflow References Secret Correctly

The workflow should have:
```yaml
env:
  SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

✅ Your workflows already have this!

### Check Token is Valid

**In Snyk Dashboard:**
1. Go to Account Settings
2. Check token isn't expired
3. If old, regenerate a new one

### Check Organization Access

1. Make sure you're logged into the correct Snyk organization
2. Verify you have access to create projects
3. Check if your organization has Snyk Code enabled

---

## 🧪 Test Token Locally

Create a quick test file:

```bash
# Save your token temporarily (will be hidden from history)
export SNYK_TOKEN="your-token-here"

# Test authentication
snyk auth $SNYK_TOKEN

# Test scanning
snyk code test

# Should see: "Testing /Users/.../Snyk..."
```

**If this works locally but not in GitHub Actions:**
- ✅ Token is valid
- ❌ GitHub Secret might not be set correctly
- → Update the GitHub Secret again

**If this fails locally:**
- ❌ Token is invalid/expired
- → Get a new token from Snyk

---

## 🎯 Common Issues & Solutions

### Issue 1: "Secret not found"

**Problem**: Workflow can't find the secret

**Solution**: 
- Secret name must be **EXACTLY** `SNYK_TOKEN`
- Check for typos: `SNYK_TOKEN` not `SNYK-TOKEN` or `snyk_token`

### Issue 2: "Token expired"

**Problem**: Token is old or revoked

**Solution**:
1. Go to Snyk → Account Settings
2. Click **"Regenerate"** to create new token
3. Update GitHub Secret with new token

### Issue 3: "Wrong organization"

**Problem**: Token is from different Snyk organization

**Solution**:
1. Make sure you're logged into correct Snyk org
2. Get token from the right organization
3. Update GitHub Secret

### Issue 4: "Snyk Code not enabled"

**Problem**: Organization doesn't have Snyk Code enabled

**Solution**:
1. Go to Snyk → Organization Settings
2. Enable **Snyk Code** (should be free)
3. Wait a few minutes for activation
4. Try again

---

## 📸 Visual Guide

### Where to find your token:

```
app.snyk.io
  └─ Profile Icon (top right)
      └─ Account Settings
          └─ Scroll down to "API Token"
              └─ Click "Click to show"
                  └─ Copy the token
```

### Where to add GitHub Secret:

```
GitHub Repository
  └─ Settings tab
      └─ Secrets and variables (left sidebar)
          └─ Actions
              └─ New repository secret (or Update)
                  ├─ Name: SNYK_TOKEN
                  └─ Secret: [paste token]
```

---

## ✅ Verification Steps

After adding the token:

### 1. Check Secret is Saved
- [ ] Go to Settings → Secrets → Actions
- [ ] See `SNYK_TOKEN` in the list
- [ ] Updated timestamp shows recent time

### 2. Run Workflow
- [ ] Push code or manually trigger workflow
- [ ] Check Actions tab

### 3. Look for Success
Expected in workflow logs:
```
✓ Snyk authenticated successfully
Testing /github/workspace...
```

### 4. Check Snyk Dashboard
- [ ] Go to app.snyk.io
- [ ] Navigate to Projects
- [ ] Your repository should appear after successful scan

---

## 🆘 Still Not Working?

### Quick Debug Commands

Add this step to your workflow temporarily (before Snyk scan):

```yaml
- name: Debug Snyk Token
  run: |
    if [ -z "$SNYK_TOKEN" ]; then
      echo "❌ SNYK_TOKEN is not set!"
    else
      echo "✅ SNYK_TOKEN is set (first 8 chars): ${SNYK_TOKEN:0:8}..."
    fi
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

This will show if the token is reaching the workflow.

---

## 💡 Pro Tips

1. **Keep Token Secure**: Never commit tokens to code
2. **Rotate Regularly**: Generate new tokens periodically
3. **Use Organization Tokens**: For team projects, use service accounts
4. **Test Locally First**: Always verify token works with CLI before using in CI/CD
5. **Check Expiration**: Some tokens might have expiration dates

---

## 📞 Getting Help

If still stuck:

1. **Snyk Support**: [support.snyk.io](https://support.snyk.io)
2. **Snyk Community**: [community.snyk.io](https://community.snyk.io)
3. **GitHub Actions Docs**: [docs.github.com/actions](https://docs.github.com/en/actions)

---

## 🎬 Quick Summary

1. ✅ Get token from app.snyk.io → Account Settings
2. ✅ Add as GitHub Secret named `SNYK_TOKEN`
3. ✅ Test locally with `snyk auth YOUR_TOKEN`
4. ✅ Push code to trigger workflow
5. ✅ Check Actions tab for success

**Most common fix**: Just regenerate the token and update the GitHub Secret!

