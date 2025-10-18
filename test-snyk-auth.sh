#!/bin/bash

# Quick script to test your Snyk authentication
# Usage: ./test-snyk-auth.sh YOUR_SNYK_TOKEN

echo "🔍 Testing Snyk Authentication..."
echo ""

if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Snyk token"
    echo "Usage: ./test-snyk-auth.sh YOUR_SNYK_TOKEN"
    echo ""
    echo "Get your token from: https://app.snyk.io → Account Settings → API Token"
    exit 1
fi

SNYK_TOKEN=$1

# Check if snyk is installed
if ! command -v snyk &> /dev/null; then
    echo "📦 Snyk CLI not found. Installing..."
    npm install -g snyk
    echo ""
fi

# Test authentication
echo "🔐 Authenticating with Snyk..."
snyk auth $SNYK_TOKEN

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Authentication successful!"
    echo ""
    echo "🧪 Testing a quick scan..."
    snyk code test vulnerable-app.js --severity-threshold=high
    echo ""
    echo "✅ Everything is working!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Copy this token to GitHub Secrets as 'SNYK_TOKEN'"
    echo "2. Push your code to trigger the workflow"
    echo "3. Check the Actions tab for results"
else
    echo ""
    echo "❌ Authentication failed!"
    echo ""
    echo "Possible issues:"
    echo "- Token is invalid or expired"
    echo "- You copied only part of the token"
    echo "- Token is from wrong organization"
    echo ""
    echo "Solution:"
    echo "1. Go to https://app.snyk.io"
    echo "2. Account Settings → API Token → Regenerate"
    echo "3. Try again with the new token"
fi

