# Netlify Deployment Guide

## MIME Type Error Fix

If you see this error after deploying to Netlify:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script 
but the server responded with a MIME type of "application/octet-stream"
```

This is fixed by the configuration files added to this project:

### Files Added

1. **`netlify.toml`** - Main Netlify configuration
   - Sets build command and output directory
   - Configures redirects for React Router SPA
   - Sets proper MIME types for all asset types
   - Adds security headers
   - Configures caching strategy

2. **`public/_headers`** - Netlify headers file
   - Specifies MIME types for JavaScript, CSS, WASM
   - Sets cache control headers
   - Adds security headers

3. **`public/_redirects`** - Netlify redirects file
   - Routes all non-file requests to index.html
   - Essential for React Router SPA routing

4. **Updated `vite.config.ts`**
   - Ensures output directory is `dist`
   - Disables source maps for production
   - Optimizes build output

## Deployment Steps

### 1. Push to GitHub/GitLab
```bash
git add .
git commit -m "fix: add Netlify configuration and fix MIME type issues"
git push -u origin main
```

### 2. Connect to Netlify
- Go to https://app.netlify.com
- Click "New site from Git"
- Connect your Git provider
- Select the repository

### 3. Configure Build Settings
Netlify should auto-detect:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20 (or latest LTS)

If not, set them manually:
- Go to Site settings → Build & deploy → Build settings
- Update as shown above

### 4. Deploy
- Push any commit to trigger auto-deploy
- Or manually trigger from Netlify dashboard

## Troubleshooting

### MIME Type Issues Still Occurring?

1. **Clear Netlify Cache**
   - Site settings → Build & deploy → Clear cache and rebuild
   - Or delete `node_modules/.cache` locally and redeploy

2. **Check Headers in DevTools**
   - Open Network tab in browser DevTools
   - Check Response Headers for JavaScript files
   - Should show: `Content-Type: application/javascript`

3. **Verify _headers and _redirects Files**
   - These files must be in the `public/` folder
   - They're automatically copied to `dist/` during build
   - Netlify reads them from the deployed `dist/` folder

### Build Failing?

1. Check build logs in Netlify dashboard
2. Ensure Node version is compatible (18+)
3. Run `npm run build` locally to verify
4. Check for missing environment variables

### Routes Not Working?

- Verify `_redirects` file is in `dist/` folder after build
- Check that React Router is properly configured in `src/App.tsx`
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## Performance Optimization

### Caching Strategy

The configuration implements a smart caching strategy:

- **HTML**: `max-age=0` (always revalidate)
- **JS/CSS/Fonts/Images**: `max-age=31536000, immutable` (1 year)
- **JSON/XML**: `max-age=3600` (1 hour)

This works because Vite adds content hashes to file names (e.g., `main.abc123.js`).

### Monitor Deployment

1. **Netlify Analytics**: Site settings → Analytics
2. **Google Search Console**: Track indexing
3. **Lighthouse**: Test performance on Chrome DevTools

## Environment Variables

If needed later, add environment variables:
1. Site settings → Build & deploy → Environment
2. Add variables like API keys, endpoints
3. Redeploy to apply

## Custom Domain

1. Site settings → Domain management
2. Add custom domain
3. Update DNS records at your domain registrar
4. Wait for DNS propagation (5-48 hours)

## SSL Certificate

Netlify automatically provides free SSL/HTTPS via Let's Encrypt.
- Automatically enabled for all sites
- Renews automatically
- No action needed

## Useful Netlify Commands

```bash
# Test deployment locally with Netlify CLI
npm install -g netlify-cli
netlify deploy --prod

# View live site
netlify open:site

# Check deployment status
netlify status
```

## References

- [Netlify Docs - React](https://docs.netlify.com/frameworks-and-platforms/frameworks/react/)
- [Netlify TOML Reference](https://docs.netlify.com/configure-builds/file-conventions/)
- [Vite Deployment - Netlify](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server)

## Support

If issues persist:
1. Check Netlify build logs
2. Test locally: `npm run build && npm run preview`
3. Contact Netlify support with deployment ID
4. Check GitHub Issues for similar problems
