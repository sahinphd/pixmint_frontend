# 🔧 Production Deployment Troubleshooting Guide

## 🚨 Common Issues: Dev Works, Production Doesn't

### Issue 1: Routing Problems (404 on page refresh)

#### Symptoms:
- Main page (/) loads fine
- Navigation works initially
- Page refresh shows 404 error
- Direct URL access fails

#### Solutions:
```bash
# Check if .htaccess was uploaded
# Verify mod_rewrite is enabled
# Ensure correct base URL configuration
```

#### Fix:
1. **Verify .htaccess Upload:**
   - Enable "Show Hidden Files" in cPanel File Manager
   - Check `.htaccess` exists in `public_html`
   - Content should include rewrite rules

2. **Check mod_rewrite:**
   - Contact hosting provider
   - Ask: "Is mod_rewrite enabled for my account?"

3. **Alternative .htaccess for problematic hosts:**
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

### Issue 2: Assets Not Loading (CSS/JS/Images)

#### Symptoms:
- Page loads but looks unstyled
- Images don't appear
- JavaScript doesn't work
- Console shows 404 errors for assets

#### Solutions:
1. **Check _nuxt folder upload:**
   - Verify complete `_nuxt/` folder uploaded
   - Check all CSS, JS, PNG files present

2. **Fix file permissions:**
   - Files: 644
   - Folders: 755

3. **Check base URL configuration:**
   ```typescript
   // In nuxt.config.ts - if deployed to subdirectory
   app: {
     baseURL: '/your-subfolder/', // Add if not in root
   }
   ```

### Issue 3: API Calls Failing

#### Symptoms:
- App loads but API requests fail
- CORS errors in console
- Features don't work

#### Solutions:
1. **Check API URLs:**
   - Verify HTTPS vs HTTP
   - Check if APIs are accessible from production domain

2. **Update environment variables:**
   ```bash
   # Create .env file if using environment-specific APIs
   NUXT_PUBLIC_API_BASE=https://api.pixmintai.com
   NUXT_PUBLIC_PAYMENT_API=https://api.nowpayments.io
   ```

### Issue 4: White Screen / Blank Page

#### Symptoms:
- Page loads but shows nothing
- Console errors about modules not found

#### Solutions:
1. **Check browser console** for specific errors
2. **Verify all files uploaded** correctly
3. **Check file paths** are correct

## 🛠️ Quick Fixes

### Fix 1: Rebuild with Correct Configuration
```bash
# Clean and rebuild
npm run clean:win
npm run build:shared
```

### Fix 2: Enhanced .htaccess for Shared Hosting
```apache
# Force HTTPS (optional)
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Main SPA routing
RewriteEngine On
RewriteBase /

# Handle specific files
RewriteRule ^index\.html$ - [L]
RewriteRule ^200\.html$ - [L]
RewriteRule ^404\.html$ - [L]

# Handle assets
RewriteRule ^_nuxt/ - [L]
RewriteRule ^favicon\.ico$ - [L]
RewriteRule ^robots\.txt$ - [L]

# Fallback to index.html for SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^.*$ /index.html [L]

# Error pages
ErrorDocument 404 /index.html
```

### Fix 3: Alternative Deployment Structure
If main deployment doesn't work, try subdirectory:

1. **Create subfolder** in `public_html` (e.g., `app/`)
2. **Upload files** to `public_html/app/`
3. **Update config:**
   ```typescript
   app: {
     baseURL: '/app/',
   }
   ```
4. **Access via** `yourdomain.com/app/`

## 🔍 Debugging Steps

### Step 1: Check Browser Console
```javascript
// Open browser dev tools (F12)
// Check Console tab for errors
// Common errors:
// - 404 on assets
// - CORS issues
// - Module not found
```

### Step 2: Test Production Build Locally
```bash
# Test before uploading
npx serve .output/public
# Visit http://localhost:3000
# Test all features work locally
```

### Step 3: Verify cPanel Upload
```bash
# Check these files exist in public_html:
- .htaccess (CRITICAL)
- index.html
- _nuxt/ folder (complete)
- All page folders (about/, chat/, etc.)
```

### Step 4: Check Hosting Compatibility
Contact hosting provider about:
- mod_rewrite support
- .htaccess compatibility  
- Static file hosting capabilities
- PHP/Node.js requirements (none needed)

## 🚨 Emergency Fallback

If nothing works, try this minimal approach:

### 1. Create Simple Test
```html
<!-- test.html - upload to public_html -->
<!DOCTYPE html>
<html>
<head><title>Test</title></head>
<body><h1>Test Page Works!</h1></body>
</html>
```

### 2. Test .htaccess Separately
```apache
# minimal-htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ /index.html [L]
```

### 3. Incremental Upload
1. Upload just `index.html` first
2. Add `.htaccess`
3. Add `_nuxt/` folder
4. Add page folders one by one

## 📞 Get Specific Help

### Hosting Provider Questions:
1. "Is mod_rewrite enabled for my account?"
2. "Do you support single-page applications?"
3. "Can you check my .htaccess file works?"
4. "Are there any restrictions on static file hosting?"

### Common Hosting Provider Solutions:
- **Bluehost**: Usually works, check mod_rewrite
- **HostGator**: May need custom .htaccess
- **GoDaddy**: Often requires ErrorDocument directives
- **SiteGround**: Usually works out of the box

Your production build should work once these issues are resolved! 🚀
