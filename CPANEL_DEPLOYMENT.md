# cPanel Deployment Guide

## Building for cPanel

This Nuxt.js application is configured for static deployment on cPanel hosting.

### 1. Build the Application

Run the following command to build the application for cPanel:

```bash
npm run build:cpanel
```

This will generate static files in the `.output/public` directory.

### 2. Upload to cPanel

1. **Connect to your cPanel File Manager** or use FTP/SFTP
2. **Navigate to the `public_html` directory** (or your domain's document root)
3. **Upload all contents** from the `.output/public` folder to `public_html`
4. **Make sure the `.htaccess` file is uploaded** (it handles routing and security)

### 3. Directory Structure on cPanel

Your cPanel `public_html` should look like this after upload:

```
public_html/
├── .htaccess
├── index.html
├── _nuxt/
│   ├── [hash].css
│   ├── [hash].js
│   └── ...
├── assets/
│   └── img/
└── ...other files
```

### 4. Configuration Notes

- **Base URL**: Currently set to `/` (root domain)
- **SSR**: Disabled for static hosting
- **Routing**: Client-side routing with fallback to index.html

### 5. Subdirectory Deployment

If you need to deploy to a subdirectory (e.g., `yourdomain.com/app/`):

1. Update `nuxt.config.ts`:
   ```typescript
   app: {
     baseURL: '/app/', // Your subdirectory
   }
   ```

2. Upload files to `public_html/app/` instead of `public_html/`

### 6. Environment Variables

For production API URLs, create a `.env` file in your project root:

```env
NUXT_PUBLIC_API_BASE_URL=https://api.pixmintai.com
NUXT_PUBLIC_PAYMENT_API_URL=https://api.nowpayments.io
```

Then update your API files to use these variables.

### 7. Troubleshooting

**404 Errors on Page Refresh:**
- Ensure `.htaccess` file is uploaded and working
- Check if your hosting supports mod_rewrite

**Assets Not Loading:**
- Verify the `baseURL` in `nuxt.config.ts` matches your deployment path
- Check file permissions (755 for directories, 644 for files)

**API Calls Failing:**
- Update API base URLs in your utility files
- Check CORS settings on your backend

### 8. Quick Deployment Script

For faster deployment, you can create a deployment script that builds and prepares files for upload.

The `npm run deploy:cpanel` command will build the project and show instructions.
