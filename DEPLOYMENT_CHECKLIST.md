# 🚀 SHARED CPANEL DEPLOYMENT CHECKLIST

## Pre-Deployment
- [ ] Run `npm run build:shared` successfully
- [ ] Verify `.output/public` folder contains all files
- [ ] Check that `.htaccess` file exists in build output
- [ ] Backup existing website files (if any)

## Upload Process
- [ ] Login to cPanel account
- [ ] Open File Manager
- [ ] Navigate to `public_html` directory
- [ ] Clear existing files (backup first!)
- [ ] Upload ALL contents from `.output/public/` to `public_html/`
- [ ] Verify `.htaccess` file was uploaded correctly
- [ ] Check file permissions (755 for folders, 644 for files)

## Post-Upload Verification
- [ ] Visit your domain - main page loads
- [ ] Test navigation between pages
- [ ] Check browser console for errors
- [ ] Test on mobile devices
- [ ] Verify images and assets load correctly
- [ ] Test any contact forms or API calls

## File Structure Verification
Ensure your `public_html` contains:
- [ ] `.htaccess` file (routing)
- [ ] `index.html` (main app)
- [ ] `200.html` (SPA fallback)
- [ ] `404.html` (error page)
- [ ] `favicon.ico`
- [ ] `robots.txt`
- [ ] `sitemap.xml` folder
- [ ] Page folders (`about/`, `chat/`, `login/`, `profile/`)
- [ ] `_nuxt/` folder with all assets

## Common Issues Checklist
If site doesn't load:
- [ ] Check if `.htaccess` was uploaded
- [ ] Verify mod_rewrite is enabled (contact hosting provider)
- [ ] Check file permissions
- [ ] Review error logs in cPanel

If assets don't load:
- [ ] Verify `_nuxt/` folder uploaded completely
- [ ] Check MIME types in cPanel
- [ ] Clear browser cache
- [ ] Check for blocked files in error logs

If routing doesn't work:
- [ ] Confirm `.htaccess` contains rewrite rules
- [ ] Test direct file access (yourdomain.com/about/index.html)
- [ ] Contact hosting provider about mod_rewrite support

## Performance Verification
- [ ] Page load speed acceptable
- [ ] Images load quickly
- [ ] No console errors
- [ ] Mobile responsiveness works
- [ ] SEO meta tags present

## Security Verification
- [ ] Sensitive files blocked (try accessing .env, package.json)
- [ ] Directory browsing disabled
- [ ] HTTPS working (if SSL installed)

## Final Success Criteria
- [ ] All pages accessible via navigation
- [ ] Direct URL access works (refresh on any page)
- [ ] Mobile version displays correctly
- [ ] All functionality working as expected
- [ ] Site loading speed acceptable

---

## 📞 Hosting Provider Support
If issues persist, contact your shared hosting provider with:
- "Static file hosting support"
- "mod_rewrite availability"
- ".htaccess configuration help"

## 🔄 Future Updates
To update your site:
1. Make changes locally
2. Run `npm run build:shared`
3. Upload new `.output/public/` contents
4. Clear any caches
