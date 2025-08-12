# Shared cPanel Hosting Deployment Guide

## Overview
This guide is specifically for **shared cPanel hosting** providers like Bluehost, HostGator, GoDaddy, etc.

## 🚀 Quick Deployment Steps

### 1. Build for Shared Hosting
```bash
npm run build:shared
```
or
```bash
npm run deploy:shared
```

### 2. Upload Files
1. **Log into cPanel File Manager**
2. **Navigate to `public_html`** (your domain's root directory)
3. **Delete any existing files** in public_html (backup first!)
4. **Upload ALL contents** from `.output/public/` to `public_html/`

### 3. Verify Upload Structure
Your `public_html` should look like this:
```
public_html/
├── .htaccess          ← CRITICAL for routing
├── index.html         ← Main app file
├── 200.html          ← SPA fallback
├── 404.html          ← Error page
├── favicon.ico
├── robots.txt
├── sitemap.xml/
├── about/
├── chat/
├── login/
├── profile/
└── _nuxt/            ← All optimized assets
    ├── *.css files
    ├── *.js files
    └── *.png images
```

## 🔧 Shared Hosting Optimizations

### Performance Optimizations
- ✅ **Static generation** enabled
- ✅ **SSR disabled** for compatibility
- ✅ **Payload extraction disabled** (reduces complexity)
- ✅ **Image optimization disabled** (uses local images only)
- ✅ **WASM disabled** for better compatibility
- ✅ **Conservative caching** strategies

### Compatibility Features
- ✅ **Fallback compression** methods
- ✅ **Conservative security headers**
- ✅ **MIME types** for web fonts
- ✅ **Directory browsing** disabled
- ✅ **Sensitive file** protection

## 📁 File Upload Methods

### Method 1: cPanel File Manager (Recommended)
1. Login to cPanel
2. Open "File Manager"
3. Navigate to `public_html`
4. Upload/drag files from `.output/public/`

### Method 2: FTP/SFTP
1. Use FileZilla, WinSCP, or similar
2. Connect to your hosting account
3. Navigate to `/public_html/`
4. Upload all files from `.output/public/`

### Method 3: cPanel Backup/Restore
1. Create ZIP of `.output/public/` contents
2. Upload ZIP to `public_html`
3. Extract in cPanel File Manager

## ⚙️ Configuration for Subdirectories

If deploying to a subdirectory (e.g., `yourdomain.com/app/`):

### 1. Update `nuxt.config.ts`:
```typescript
app: {
  baseURL: '/app/', // Your subdirectory name
}
```

### 2. Upload to subdirectory:
- Create folder: `public_html/app/`
- Upload to: `public_html/app/` instead of `public_html/`

## 🔧 Common Shared Hosting Issues & Solutions

### Issue: 404 Errors on Page Refresh
**Solution:** Ensure `.htaccess` is uploaded and contains routing rules

### Issue: Assets Not Loading
**Solutions:**
- Check file permissions (755 for folders, 644 for files)
- Verify `baseURL` in config matches deployment path
- Ensure all files uploaded correctly

### Issue: Slow Loading
**Solutions:**
- Enable compression in cPanel (if available)
- Use shared hosting CDN (if provided)
- Optimize images before upload

### Issue: CSS/JS Not Loading
**Solutions:**
- Check MIME types in `.htaccess`
- Verify web fonts are uploaded
- Check browser console for errors

## 🌐 Domain Configuration

### Root Domain (yourdomain.com)
- Upload to: `public_html/`
- baseURL: `'/'`

### Subdomain (app.yourdomain.com)
- Upload to: `public_html/` (subdomain folder)
- baseURL: `'/'`

### Addon Domain
- Upload to: addon domain's folder
- baseURL: `'/'`

## 📊 Performance Tips for Shared Hosting

### 1. Image Optimization
- Compress images before including in project
- Use WebP format if supported
- Keep image sizes reasonable

### 2. Caching Strategy
- `.htaccess` includes optimized cache headers
- Use browser caching effectively
- Consider shared hosting CDN options

### 3. File Size Management
- Keep bundle sizes small
- Remove unused dependencies
- Use code splitting (automatically handled)

## 🔒 Security for Shared Hosting

### Included Security Features
- ✅ **Sensitive file protection**
- ✅ **Directory browsing disabled**
- ✅ **XSS protection headers**
- ✅ **Content type validation**
- ✅ **Server signature hidden**

### Additional Security Tips
- Keep cPanel login secure
- Use strong passwords
- Enable 2FA if available
- Regular backups

## 🚨 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .nuxt .output node_modules
npm install
npm run build:shared
```

### Upload Issues
- Check file size limits in cPanel
- Ensure sufficient disk space
- Try uploading in smaller batches

### Routing Issues
- Verify `.htaccess` is in root directory
- Check mod_rewrite is enabled (ask hosting provider)
- Test with direct file access first

## 📞 Hosting Provider Support

Most shared hosting providers support:
- ✅ **Static file hosting**
- ✅ **mod_rewrite** (for routing)
- ✅ **Custom .htaccess**
- ✅ **File compression**

If issues persist, contact your hosting provider with:
- Details about static file hosting
- mod_rewrite support questions
- .htaccess compatibility

## 🎯 Success Checklist

Before going live:
- [ ] Build completes without errors
- [ ] All files uploaded to correct directory
- [ ] `.htaccess` file is present and working
- [ ] Main page loads correctly
- [ ] Navigation between pages works
- [ ] Images and assets load properly
- [ ] Mobile responsiveness works
- [ ] Contact forms/APIs function (if applicable)
