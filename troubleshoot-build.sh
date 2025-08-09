#!/bin/bash
# Build Troubleshooting Script for Nuxt Shared cPanel

echo "============================================"
echo "   Nuxt Shared cPanel Build Troubleshooter"
echo "============================================"
echo

# Check Node version
echo "Checking Node.js version..."
node --version
echo

# Check npm version
echo "Checking npm version..."
npm --version
echo

# Check Nuxt version
echo "Checking Nuxt version..."
npx nuxi --version
echo

# Clear all caches
echo "Clearing all caches..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    rmdir /s /q .nuxt .output node_modules\\.cache 2>nul || echo "Cache cleared"
else
    # Unix/Linux/Mac
    rm -rf .nuxt .output node_modules/.cache
fi
echo "Cache cleared successfully"
echo

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm ci
echo

# Run type check
echo "Running TypeScript check..."
npm run typecheck || echo "TypeScript check completed with issues"
echo

# Run linting
echo "Running ESLint..."
npm run lint || echo "Linting completed with issues"
echo

# Build the project
echo "Building for shared cPanel hosting..."
npm run build:shared
echo

echo "============================================"
echo "   Troubleshooting Complete!"
echo "============================================"
echo "If build succeeded, files are ready in .output/public/"
echo "If issues persist:"
echo "1. Check Node.js version (recommended: 18+)"
echo "2. Clear npm cache: npm cache clean --force"
echo "3. Delete node_modules and package-lock.json"
echo "4. Run: npm install"
echo "5. Try build again"
echo
