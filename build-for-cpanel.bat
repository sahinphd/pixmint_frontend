@echo off
echo ========================================
echo   Building Nuxt App for SHARED cPanel
echo ========================================
echo.

REM Build the application optimized for shared hosting
call npm run build:shared

echo.
echo ========================================
echo   SHARED HOSTING BUILD COMPLETE!
echo ========================================
echo.
echo Files are ready in the .output/public folder
echo Optimized for shared cPanel hosting providers
echo.
echo TO DEPLOY TO SHARED CPANEL:
echo ========================================
echo 1. Login to your cPanel account
echo 2. Open "File Manager"
echo 3. Navigate to "public_html" folder
echo 4. DELETE existing files (backup first!)
echo 5. Upload ALL contents from ".output/public" to "public_html"
echo 6. Ensure .htaccess file is uploaded (CRITICAL!)
echo.
echo IMPORTANT FILES TO VERIFY:
echo - .htaccess (enables routing)
echo - index.html (main app file)
echo - _nuxt/ folder (all assets)
echo.
echo Compatible with: Bluehost, HostGator, GoDaddy, etc.
echo.
echo Your site will be live at your domain after upload!
echo See SHARED_CPANEL_GUIDE.md for detailed instructions
echo.
pause
