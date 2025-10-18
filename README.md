# Snyk Security Testing Project

This repository demonstrates Snyk's security scanning capabilities and GitHub Actions integration.

## 📁 Contents

- `vulnerable-app.js` - Sample JavaScript file with intentional security vulnerabilities (for testing only)
- `.github/workflows/` - GitHub Actions workflows for automated security scanning

## 🚀 Setting Up Snyk with GitHub Actions

### Prerequisites

1. **Snyk Account** - Sign up at [snyk.io](https://snyk.io) (free tier available)
2. **GitHub Repository** - This project
3. **Snyk API Token** - From your Snyk account settings

### Step-by-Step Setup

#### 1. Get Your Snyk API Token

1. Log in to [app.snyk.io](https://app.snyk.io)
2. Click on your profile icon (top right)
3. Go to **Account Settings**
4. Find **General** → **API Token**
5. Click **Show** and copy your token

#### 2. Add Snyk Token to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `SNYK_TOKEN`
5. Value: Paste your Snyk API token
6. Click **Add secret**

#### 3. Enable GitHub Actions

The workflows are already configured in `.github/workflows/`:

- **`snyk-simple.yml`** - Basic Snyk scan (recommended for getting started)
- **`snyk-security.yml`** - Comprehensive scan with multiple Snyk products

#### 4. Push to GitHub

```bash
git add .
git commit -m "Add Snyk security scanning"
git push origin main
```

The GitHub Actions will automatically run and scan your code!

## 🔍 Snyk Workflow Features

### Simple Workflow (`snyk-simple.yml`)

- ✅ Scans for code vulnerabilities (SAST)
- ✅ Scans for dependency vulnerabilities
- ✅ Uploads results to GitHub Security tab
- ✅ Runs on push and pull requests

### Comprehensive Workflow (`snyk-security.yml`)

Includes multiple scanning jobs:

1. **Snyk Code** - Static Application Security Testing (SAST)
2. **Snyk Open Source** - Dependency vulnerability scanning
3. **Snyk Monitor** - Continuous monitoring (runs on main branch)
4. **Snyk IaC** - Infrastructure as Code scanning
5. **Snyk Container** - Docker image scanning (if Dockerfile exists)

## 📊 Viewing Results

### In GitHub

1. Go to your repository
2. Click **Security** tab
3. Click **Code scanning** → View Snyk results
4. Or check the **Actions** tab to see workflow runs

### In Snyk Dashboard

1. Log in to [app.snyk.io](https://app.snyk.io)
2. Your project will appear in the Projects section
3. View detailed vulnerability information
4. Get fix recommendations

## 🛠️ Using Snyk CLI Locally

### Install Snyk CLI

```bash
npm install -g snyk
```

### Authenticate

```bash
snyk auth
```

### Run Scans

```bash
# Scan for code vulnerabilities
snyk code test

# Scan for dependency vulnerabilities
snyk test

# Monitor project (sends snapshot to Snyk dashboard)
snyk monitor
```

## 💡 Using Snyk in Your IDE

### VS Code

1. Install extension: **Snyk Security**
2. Authenticate with your Snyk account
3. Open any file - Snyk will automatically scan
4. Look for ⚡ lightning bolt icons for AI-powered fixes

### Enable AI Fix (DeepCode AI)

1. Go to [app.snyk.io](https://app.snyk.io) → **Settings**
2. Navigate to **Organization Settings**
3. Find **DeepCode AI Fix** section
4. Toggle **Enable DeepCode AI Fix Suggestions**
5. Use AI-powered fixes in your IDE!

## 🔐 Security Note

⚠️ **WARNING**: `vulnerable-app.js` contains intentional security vulnerabilities for testing purposes only. 

**NEVER use this code in production!**

## 📚 Additional Resources

- [Snyk Documentation](https://docs.snyk.io)
- [Snyk GitHub Actions](https://github.com/snyk/actions)
- [Snyk CLI Documentation](https://docs.snyk.io/snyk-cli)
- [DeepCode AI Fix Documentation](https://docs.snyk.io/scan-with-snyk/snyk-code/manage-code-vulnerabilities/fix-code-vulnerabilities-automatically)

## 🎯 What You'll Learn

This project helps you understand:

- ✅ How to integrate Snyk with GitHub Actions
- ✅ Different types of security scanning (SAST, SCA, IaC, Container)
- ✅ How to view and manage security findings
- ✅ Using AI-powered automated fixes
- ✅ Security testing in CI/CD pipelines

## 📝 Workflow Triggers

### Simple Workflow
- Runs on `push` to main branch
- Runs on `pull_request` to main branch

### Comprehensive Workflow
- Runs on push/PR to main and develop branches
- Scheduled weekly scan (Mondays at 9am UTC)
- Different jobs for different scan types

## 🚦 Next Steps

1. ✅ Set up Snyk token in GitHub Secrets
2. ✅ Push code to trigger the workflow
3. ✅ Check the Security tab for results
4. ✅ Install Snyk IDE extension
5. ✅ Enable DeepCode AI Fix in Snyk settings
6. ✅ Try fixing vulnerabilities using AI suggestions

## 💬 Support

- [Snyk Support](https://support.snyk.io)
- [Snyk Community](https://community.snyk.io)
- [GitHub Discussions](https://github.com/snyk/snyk/discussions)
