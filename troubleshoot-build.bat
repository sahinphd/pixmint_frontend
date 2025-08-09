@echo off
REM Build Troubleshooting Script for Nuxt Shared cPanel (Windows)

echo ============================================
echo    Nuxt Shared cPanel Build Troubleshooter
echo ============================================
echo.

REM Check Node version
echo Checking Node.js version...
node --version
echo.

REM Check npm version
echo Checking npm version...
npm --version
echo.

REM Check Nuxt version
echo Checking Nuxt version...
npx nuxi --version
echo.

REM Clear all caches
echo Clearing all caches...
rmdir /s /q .nuxt .output node_modules\.cache 2>nul || echo Cache cleared
echo Cache cleared successfully
echo.

REM Reinstall dependencies
echo Reinstalling dependencies...
npm ci
echo.

REM Run type check
echo Running TypeScript check...
npm run typecheck || echo TypeScript check completed with issues
echo.

REM Run linting
echo Running ESLint...
npm run lint || echo Linting completed with issues
echo.

REM Build the project
echo Building for shared cPanel hosting...
npm run build:shared
echo.

echo ============================================
echo    Troubleshooting Complete!
echo ============================================
echo If build succeeded, files are ready in .output/public/
echo If issues persist:
echo 1. Check Node.js version (recommended: 18+)
echo 2. Clear npm cache: npm cache clean --force
echo 3. Delete node_modules and package-lock.json
echo 4. Run: npm install
echo 5. Try build again
echo.
pause
