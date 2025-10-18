# 🔑 Getting the CORRECT Snyk Token

## ⚠️ Common Mistake: Integration ID vs API Token

Many users accidentally use the **Integration ID** instead of the **API Token**. They are different!

| Type | What it looks like | Where it is | Use case |
|------|-------------------|-------------|----------|
| ❌ **Integration ID** | Short UUID like `abc123...` | Integrations page | For SCM integrations only |
| ✅ **API Token** | Long UUID: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` | Account Settings | For CLI and GitHub Actions |

**You need the API Token!**

---

## ✅ Step-by-Step: Get Your API Token

### Step 1: Go to Account Settings

1. Visit [https://app.snyk.io](https://app.snyk.io)
2. Login to your account
3. **Click your profile picture/icon** (top-right corner)
4. Select **"Account settings"** from dropdown

**DO NOT** go to Organization Settings or Integrations!

---

### Step 2: Find API Token Section

1. You'll be on the "Account Settings" page
2. Look for the **"General"** section (should be default)
3. Scroll down until you see **"API Token"** or **"Auth Token"**
4. You'll see something like:

```
API Token
────────────────────────────────────
To authenticate the Snyk CLI, API, or an integration

[Click to show]  or  [key icon]
```

---

### Step 3: Reveal and Copy Token

1. Click **"Click to show"** button
2. You'll see a long string like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
3. Click the **copy icon** or select all and copy
4. The token should be **36 characters** (including dashes)

**Format check:**
```
✅ Good:  a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6
❌ Wrong: abc123def (too short - this is Integration ID)
❌ Wrong: 1234567890 (just numbers)
```

---

### Step 4: Update GitHub Secret

Now that you have the **correct** token:

1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Find `SNYK_TOKEN` in the list
4. Click on it
5. Click **"Update secret"**
6. **Paste the API Token** (delete old value first)
7. Click **"Update secret"**

---

## 🔍 How to Tell Which One You Have

### If you accidentally used Integration ID:

**Symptoms:**
- ❌ Error: `Authentication error (SNYK-0005)`
- ❌ Error: `401 Unauthorized`
- ❌ Token looks short or doesn't have 4 dashes

**Where you probably found it:**
- Organization Settings → Integrations → GitHub → Integration ID
- This is NOT what you need!

### If you have the correct API Token:

**Characteristics:**
- ✅ Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- ✅ Length: 36 characters including 4 dashes
- ✅ Found in: Account Settings → General → API Token
- ✅ Authentication works!

---

## 📸 Visual Guide

### ❌ WRONG PLACE (Integration ID)

```
app.snyk.io
  └─ Settings (gear icon)
      └─ Integrations
          └─ GitHub
              └─ Integration ID: abc123... ❌ DON'T USE THIS!
```

### ✅ CORRECT PLACE (API Token)

```
app.snyk.io
  └─ Profile Icon (top right, your avatar/initials)
      └─ Account settings
          └─ General tab
              └─ API Token section
                  └─ Click to show
                      └─ Copy this! ✅
```

---

## 🧪 Test Your Token

Before updating GitHub, test it locally:

```bash
# Replace YOUR_API_TOKEN with your actual token
snyk auth YOUR_API_TOKEN

# Expected success:
# "Your account has been authenticated. Snyk is now ready to be used."

# Expected failure (if wrong token):
# "Authentication failed. Please check your token."
```

Or use the test script:

```bash
./test-snyk-auth.sh YOUR_API_TOKEN
```

---

## 🎯 Quick Checklist

Before updating GitHub Secret:

- [ ] Logged into app.snyk.io
- [ ] Went to **Profile Icon → Account settings** (NOT Organization Settings)
- [ ] Found **API Token** section
- [ ] Clicked **"Click to show"**
- [ ] Copied the long token (36 chars with 4 dashes)
- [ ] Token format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- [ ] Tested locally with `snyk auth YOUR_TOKEN`
- [ ] Authentication succeeded ✅

---

## 💡 Pro Tips

### Regenerate if Needed

If you've shared or exposed your token:

1. Go to Account Settings → API Token
2. Look for **"Regenerate"** button
3. Click it to create a new token
4. Old token will be invalidated
5. Update GitHub Secret with new token

### Keep It Secret

**Never:**
- ❌ Commit tokens to git
- ❌ Share tokens publicly
- ❌ Use tokens in URLs
- ❌ Post tokens in issues/forums

**Always:**
- ✅ Use GitHub Secrets
- ✅ Use environment variables locally
- ✅ Rotate regularly
- ✅ Regenerate if exposed

---

## 🔄 After Getting Correct Token

### Update GitHub Secret

```bash
# In GitHub UI:
# Settings → Secrets and variables → Actions
# Click SNYK_TOKEN → Update secret → Paste new token → Save
```

### Trigger Workflow

```bash
git commit --allow-empty -m "Fix: Use correct Snyk API token"
git push origin main
```

### Verify Success

1. Go to **Actions** tab
2. Watch workflow run
3. Should see: ✅ "Snyk authenticated successfully"
4. Check [app.snyk.io](https://app.snyk.io) → Projects for results

---

## 🆘 Still Getting 401 Error?

After using the correct API Token, if you still get authentication errors:

### Check Token Validity

1. Go back to Account Settings
2. Try **regenerating** the token
3. Sometimes old tokens stop working

### Check Organization Access

1. Make sure you're in the correct Snyk organization
2. Top-left dropdown in Snyk dashboard shows current org
3. Get token from the org you want to use

### Check Snyk Code is Enabled

1. Organization Settings → Snyk Code
2. Make sure it's enabled (should be free)

---

## ✅ Summary

**The Fix:**

1. ✅ Go to [app.snyk.io](https://app.snyk.io)
2. ✅ Profile Icon → **Account settings** (NOT Organization Settings!)
3. ✅ Find **API Token** section
4. ✅ Click **"Click to show"**
5. ✅ Copy the long token (36 chars)
6. ✅ Update GitHub Secret `SNYK_TOKEN`
7. ✅ Push to trigger workflow

**You need THIS:**
```
API Token: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx ✅
```

**NOT this:**
```
Integration ID: abc123def ❌
```

---

## 📞 Need Help?

If you're still having trouble finding it:

1. **Screenshot method**: Take a screenshot of your Snyk dashboard (hide the actual token!)
2. **Contact Snyk Support**: [support.snyk.io](https://support.snyk.io)
3. **Snyk Community**: [community.snyk.io](https://community.snyk.io)

---

Good luck! 🚀

