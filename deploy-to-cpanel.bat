@echo off
echo ========================================
echo        cPanel Deployment Helper
echo ========================================
echo.
echo Your Nuxt app is ready for cPanel deployment!
echo.
echo FILES LOCATION:
echo %CD%\.output\public\
echo.
echo WHAT TO UPLOAD TO CPANEL:
echo ========================================
echo 1. .htaccess          (CRITICAL - routing)
echo 2. index.html         (main app)
echo 3. 200.html           (SPA fallback)
echo 4. 404.html           (error page)
echo 5. favicon.ico        (site icon)
echo 6. robots.txt         (SEO)
echo 7. about/ folder      (about page)
echo 8. chat/ folder       (chat page) 
echo 9. login/ folder      (login page)
echo 10. profile/ folder   (profile page)
echo 11. sitemap.xml/ folder (SEO sitemap)
echo 12. _nuxt/ folder     (ALL ASSETS - CSS, JS, IMAGES)
echo.
echo CPANEL UPLOAD STEPS:
echo ========================================
echo 1. Login to cPanel
echo 2. Open "File Manager"
echo 3. Go to "public_html" folder
echo 4. DELETE all existing files (backup first!)
echo 5. Upload ALL contents from .output\public\
echo 6. Set permissions: Files=644, Folders=755
echo 7. Verify .htaccess file is uploaded
echo.
echo QUICK METHOD:
echo 1. Create ZIP of all files in .output\public\
echo 2. Upload ZIP to public_html in cPanel
echo 3. Extract ZIP in cPanel File Manager
echo 4. Delete the ZIP file after extraction
echo.
echo Your domain will be live after upload!
echo.
echo Opening the deployment folder...
start "" "%CD%\.output\public"
echo.
pause
