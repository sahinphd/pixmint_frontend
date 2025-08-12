# 🚀 Complete cPanel Deployment Guide

## 📋 Pre-Deployment Checklist
- [ ] Build completed successfully (`npm run build:shared`)
- [ ] Files ready in `.output/public/` folder
- [ ] cPanel login credentials ready
- [ ] Domain/subdomain configured in cPanel

## 🎯 Step-by-Step Deployment to cPanel

### Step 1: Access cPanel
1. **Login to your cPanel account**
   - URL: Usually `yourdomain.com/cpanel` or `yourdomain.com:2083`
   - Or through your hosting provider's client area

### Step 2: Open File Manager
1. **Find "File Manager"** in cPanel dashboard
2. **Click "File Manager"**
3. **Select "Web Root (public_html/www)"**
4. **Click "Go"**

### Step 3: Prepare the Directory
1. **Navigate to `public_html`** folder
2. **BACKUP existing files** (if any):
   - Select all files
   - Click "Compress" → Create ZIP backup
3. **DELETE all existing files** in `public_html`:
   - Select all files/folders
   - Click "Delete"

### Step 4: Upload Your Files

#### Method A: Upload ZIP (Recommended)
1. **Create ZIP of your build files:**
   - Go to: `c:\Users\OMEN\Pictures\pixmintai.com\8-8-2025\nuxt\.output\public\`
   - Select ALL contents
   - Right-click → "Send to" → "Compressed folder"
   - Name it: `nuxt-app.zip`

2. **Upload ZIP to cPanel:**
   - In File Manager, click "Upload"
   - Click "Select File"
   - Choose your `nuxt-app.zip`
   - Wait for upload to complete
   - Click "Back to File Manager"

3. **Extract ZIP:**
   - Right-click on `nuxt-app.zip`
   - Click "Extract"
   - Choose "Extract to: /public_html/"
   - Click "Extract Files"
   - Delete the ZIP file after extraction

#### Method B: Upload Individual Files
1. **Upload each folder/file:**
   - Click "Upload" in File Manager
   - Upload ALL contents from `.output\public\`:
     - `.htaccess` (CRITICAL!)
     - `index.html`
     - `200.html`
     - `404.html`
     - `favicon.ico`
     - `robots.txt`
     - `about/` folder
     - `chat/` folder
     - `login/` folder
     - `profile/` folder
     - `sitemap.xml/` folder
     - `_nuxt/` folder (entire folder with all assets)

### Step 5: Verify Upload
Check that your `public_html` contains:
```
public_html/
├── .htaccess          ← MUST BE PRESENT!
├── index.html
├── 200.html
├── 404.html
├── favicon.ico
├── robots.txt
├── about/
├── chat/
├── login/
├── profile/
├── sitemap.xml/
└── _nuxt/            ← ALL CSS, JS, IMAGES
    ├── *.css files
    ├── *.js files
    └── *.png files
```

### Step 6: Check File Permissions
1. **Select all files and folders**
2. **Click "Permissions"**
3. **Set permissions:**
   - **Folders**: 755
   - **Files**: 644
4. **Check "Recurse into subdirectories"**
5. **Click "Change Permissions"**

### Step 7: Verify .htaccess File
1. **Enable hidden files visibility:**
   - Click "Settings" in File Manager
   - Check "Show Hidden Files"
   - Click "Save"
2. **Verify `.htaccess` is present** in `public_html`
3. **If missing, upload it manually**

## 🌐 Alternative Upload Methods

### Method 1: FTP/SFTP (Advanced Users)
1. **Use FTP client** (FileZilla, WinSCP, etc.)
2. **Connect to your hosting:**
   - Host: Your domain or FTP server
   - Username: cPanel username
   - Password: cPanel password
   - Port: 21 (FTP) or 22 (SFTP)
3. **Navigate to `/public_html/`**
4. **Upload all files** from `.output\public\`

### Method 2: cPanel Backup Manager
1. **Create backup locally:**
   - ZIP the `.output\public\` contents
2. **Upload via Backup Manager:**
   - Go to "Backup Wizard" in cPanel
   - Choose "Restore"
   - Upload your ZIP file

## ✅ Post-Deployment Verification

### 1. Test Your Website
- **Visit your domain**: `https://yourdomain.com`
- **Main page should load** with your Nuxt app
- **Test navigation** between pages
- **Check on mobile device**

### 2. Test Routing
- **Direct URL access**: Try `yourdomain.com/about`
- **Page refresh**: Refresh any page (should work)
- **Browser back/forward**: Should work properly

### 3. Check Assets
- **Images loading**: All PNG files display
- **CSS working**: Styling appears correct
- **JavaScript active**: Interactive elements work

### 4. Verify SEO Files
- **Robots.txt**: Visit `yourdomain.com/robots.txt`
- **Sitemap**: Visit `yourdomain.com/sitemap.xml`
- **Favicon**: Should appear in browser tab

## 🚨 Troubleshooting Common Issues

### Issue: "404 Not Found" on page refresh
**Solution**: 
- Ensure `.htaccess` file is uploaded
- Check if mod_rewrite is enabled (contact hosting support)

### Issue: Assets not loading (CSS/JS/Images)
**Solution**:
- Verify `_nuxt/` folder uploaded completely
- Check file permissions (644 for files, 755 for folders)
- Clear browser cache

### Issue: White screen or errors
**Solution**:
- Check browser console for errors
- Verify all files uploaded correctly
- Check cPanel error logs

### Issue: HTTPS not working
**Solution**:
- Install SSL certificate in cPanel
- Update any hardcoded HTTP URLs to HTTPS

## 📞 Getting Help

### From Hosting Provider
Contact your hosting support with:
- "Need help with static website deployment"
- "Verify mod_rewrite is enabled"
- "Check .htaccess compatibility"

### Hosting Provider Specific:
- **Bluehost**: Use File Manager or FTP
- **HostGator**: Advanced File Manager
- **GoDaddy**: cPanel File Manager
- **SiteGround**: Site Tools File Manager

## 🎉 Success Indicators

Your deployment is successful when:
- [ ] Main page loads at your domain
- [ ] All navigation works
- [ ] Page refresh doesn't break routing
- [ ] Images and styling display correctly
- [ ] Mobile version works
- [ ] No console errors in browser

## 🔄 Future Updates

To update your site:
1. Make changes locally
2. Run `npm run build:shared`
3. Upload new `.output/public/` contents
4. Overwrite existing files in `public_html`

Your Nuxt app is now live on cPanel shared hosting! 🚀
