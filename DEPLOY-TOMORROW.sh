#!/bin/bash
# Quick Deployment Script for PBM Knowledge Base
# Run this tomorrow morning to deploy the demo

set -e  # Exit on error

echo "======================================================================"
echo "PBM KNOWLEDGE BASE - DEPLOYMENT SCRIPT"
echo "======================================================================"
echo ""

cd ~/Projects/ai-helpdesk

echo "📂 Current directory: $(pwd)"
echo ""

# Check if gh is authenticated
echo "🔐 Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "❌ GitHub CLI not authenticated"
    echo "Please run: gh auth login"
    echo ""
    echo "Then re-run this script."
    exit 1
fi

echo "✅ GitHub authenticated"
echo ""

# Create GitHub repository
echo "📦 Creating GitHub repository (private)..."
if gh repo create pbm-knowledge-base --private --source=. --remote=origin --push --yes; then
    echo "✅ Repository created and pushed"
else
    echo "⚠️  Repository might already exist, trying to push..."
    git remote add origin git@github.com:$(gh api user --jq '.login')/pbm-knowledge-base.git 2>/dev/null || true
    git push -u origin master
fi

echo ""

# Enable GitHub Pages
echo "🌐 Enabling GitHub Pages..."
sleep 2  # Wait for repo to be fully created
gh repo edit --enable-pages --pages-branch master --pages-path /public

echo "✅ GitHub Pages enabled"
echo ""

# Get the URL
USERNAME=$(gh api user --jq '.login')
PAGES_URL="https://${USERNAME}.github.io/pbm-knowledge-base/"

echo "======================================================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================================================================"
echo ""
echo "🌐 Your demo is deploying to:"
echo "   $PAGES_URL"
echo ""
echo "⏱️  Wait 2-3 minutes for GitHub Pages to build"
echo ""
echo "🧪 Then test:"
echo "   1. Homepage: $PAGES_URL"
echo "   2. Article: ${PAGES_URL}basics/what-is-pbm.html"
echo "   3. Search: Type 'PBM' in search bar"
echo ""
echo "======================================================================"
echo ""

# Optional: Open in browser (if xdg-open available)
if command -v xdg-open &> /dev/null; then
    echo "🚀 Opening in browser..."
    sleep 3
    xdg-open "$PAGES_URL" 2>/dev/null || true
fi

echo "✅ Deployment script complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Wait 2-3 minutes"
echo "   2. Open: $PAGES_URL"
echo "   3. Test all functionality"
echo "   4. Present your demo!"
echo ""
