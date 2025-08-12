# Production Deployment Troubleshooting Guide

## Current Status ✅
- ✅ Development server working (`npm run dev`)
- ✅ Production build successful (`npm run build:shared`)
- ✅ Local production test working (`npx serve .output/public`)
- ❌ Production deployment on cPanel not working

## Step-by-Step Deployment Debug Process

### Step 1: Verify Your cPanel Setup

1. **Check PHP Version**: Ensure you're using PHP 7.4+ in cPanel
2. **Verify File Manager Access**: Can you access File Manager in cPanel?
3. **Check public_html Directory**: Is it accessible and writable?

### Step 2: Upload Process Verification

1. **Clear public_html**: 
   - Delete ALL existing files in public_html
   - Don't leave old files that might conflict

2. **Upload ALL files from .output/public**:
   ```
   Files to upload from .output/public/:
   ├── .htaccess (CRITICAL!)
   ├── index.html
   ├── 200.html
   ├── 404.html
   ├── favicon.ico
   ├── robots.txt
   ├── sitemap.xml/
   ├── about/
   ├── chat/
   ├── login/
   ├── profile/
   └── _nuxt/ (entire folder with all assets)
   ```

3. **Verify .htaccess Upload**:
   - MOST IMPORTANT: Ensure .htaccess is uploaded
   - Some FTP clients hide .htaccess files
   - In cPanel File Manager, enable "Show Hidden Files"

### Step 3: Test Your Domain

1. **Visit your domain**: `https://yourdomain.com`
2. **Test direct pages**: 
   - `https://yourdomain.com/about`
   - `https://yourdomain.com/login`
   - `https://yourdomain.com/profile`

### Step 4: Common Issues & Solutions

#### Issue 1: "Page Not Found" or "404 Error"
**Cause**: .htaccess not working or missing
**Solutions**:
- Verify .htaccess is uploaded
- Check if your hosting supports mod_rewrite
- Contact hosting provider to enable mod_rewrite

#### Issue 2: "Internal Server Error" (500)
**Cause**: .htaccess configuration incompatible
**Solution**: Use simplified .htaccess:

```apache
RewriteEngine On
RewriteBase /

# Handle static files
RewriteRule ^_nuxt/ - [L]
RewriteRule ^favicon\.ico$ - [L]
RewriteRule ^robots\.txt$ - [L]

# Fallback to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^.*$ /index.html [L,QSA]
```

#### Issue 3: Pages Load but Assets Missing
**Cause**: _nuxt folder not uploaded or incorrect path
**Solutions**:
- Verify entire _nuxt folder is uploaded
- Check file permissions (755 for folders, 644 for files)

#### Issue 4: Blank White Page
**Cause**: JavaScript errors or base URL issues
**Solutions**:
- Open browser Developer Tools (F12)
- Check Console for errors
- Verify all assets are loading correctly

### Step 5: Hosting Provider Specific Checks

#### For Shared cPanel Hosting:
1. **Check if mod_rewrite is enabled**:
   - Create a test .htaccess with just `RewriteEngine On`
   - If you get 500 error, mod_rewrite is disabled

2. **Verify PHP version**: Some hosts require specific PHP versions

3. **Check file limits**: Ensure you haven't exceeded file count limits

### Step 6: Advanced Debugging

#### Enable Debug Mode:
1. **Check Network Tab** in browser dev tools
2. **Look for 404s** on asset loading
3. **Verify base paths** are correct

#### Test Simplified Version:
If nothing works, try uploading just `index.html` and `_nuxt/` folder first.

### Step 7: Contact Information for Hosting Provider

**Questions to ask your hosting provider**:
1. Is mod_rewrite enabled on my account?
2. Do you support Single Page Applications (SPAs)?
3. Are there any restrictions on .htaccess files?
4. What PHP version am I using?
5. Are there any file upload limits?

## Emergency Fallback

If routing doesn't work, users can still access:
- Main page: `yourdomain.com`
- Direct HTML files: `yourdomain.com/about/index.html`

## Need Help?

If you're still having issues:
1. Check your domain in a browser
2. Open Developer Tools (F12) → Console tab
3. Share any error messages you see
4. Verify which files are successfully uploaded to your hosting

## Success Checklist

- [ ] All files from .output/public uploaded
- [ ] .htaccess file is present and uploaded
- [ ] Domain loads without errors
- [ ] Navigation between pages works
- [ ] Images and styles load correctly
- [ ] No 404 errors in browser console

---

**Remember**: The production build works perfectly locally, so the issue is with the hosting environment, not your code!
