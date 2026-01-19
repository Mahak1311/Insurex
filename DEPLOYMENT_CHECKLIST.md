# ✅ Netlify Deployment Checklist

Copy this checklist and check off items as you complete them.

## Before Deployment

### Local Setup
- [ ] Project builds successfully (`npm run build`)
- [ ] No console errors when testing locally
- [ ] All pages load correctly
- [ ] Google Sign-In works locally (with .env file)

### Code Changes
- [ ] `google-auth-library` installed (`npm install google-auth-library`)
- [ ] `netlify.toml` file exists in project root
- [ ] `netlify/functions/google-auth.js` file exists
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub

## Google Cloud Console Setup

### Create OAuth Client (if not done)
- [ ] Logged into https://console.cloud.google.com
- [ ] Project created/selected
- [ ] APIs & Services → Credentials opened
- [ ] OAuth 2.0 Client ID created (Web application type)
- [ ] Client ID copied (format: xxxxx.apps.googleusercontent.com)

### Configure OAuth Client
- [ ] OAuth Client ID page opened
- [ ] **Authorized JavaScript origins** section:
  - [ ] Added: `http://localhost:5173` (for local dev)
  - [ ] Added: `https://your-actual-netlify-url.netlify.app`
- [ ] **Authorized redirect URIs** section:
  - [ ] Added: `http://localhost:5173` (for local dev)
  - [ ] Added: `https://your-actual-netlify-url.netlify.app`
  - [ ] Added: `https://your-actual-netlify-url.netlify.app/login`
- [ ] Clicked **Save**
- [ ] ⏰ Waited 5-10 minutes for changes to propagate

## Netlify Setup

### Initial Setup
- [ ] Signed up/logged into https://app.netlify.com
- [ ] Site created (either dragged dist folder or connected GitHub)
- [ ] Site name noted (e.g., your-app-name.netlify.app)

### Build Settings (if using GitHub)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Auto-deploy enabled

### Environment Variables
- [ ] Site settings → Environment variables opened
- [ ] Added variable: `VITE_GOOGLE_CLIENT_ID`
  - [ ] Value: (Google OAuth Client ID pasted)
  - [ ] Scope: All deploys
- [ ] Added variable: `GOOGLE_CLIENT_ID`
  - [ ] Value: (Same Google OAuth Client ID)
  - [ ] Scope: All deploys
- [ ] Added variable: `VITE_API_BASE` (optional)
  - [ ] Value: `` (empty) or `/`
- [ ] Clicked **Save**

### Deploy
- [ ] Triggered new deployment (if not auto-deployed)
- [ ] Deploy succeeded (no errors in logs)
- [ ] Site is live and accessible

## Testing on Netlify

### Basic Tests
- [ ] Site loads without errors
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] All pages accessible

### Google Authentication Tests
- [ ] Login page loads
- [ ] Google Sign-In button appears
- [ ] Can click Google Sign-In button
- [ ] Google popup/redirect appears
- [ ] Can select Google account
- [ ] Redirects back to site after authentication
- [ ] Lands on dashboard after successful login
- [ ] User info displayed correctly

### Browser Console Check
- [ ] No errors in console (F12 → Console tab)
- [ ] See: "✓ Google Identity ready"
- [ ] See: "✓ Google button rendered"
- [ ] No "Missing VITE_GOOGLE_CLIENT_ID" warnings

### Test in Different Browsers
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browser

### Test in Incognito/Private Mode
- [ ] Works in incognito/private browsing

## Troubleshooting (If Something Fails)

### Google Button Not Showing
- [ ] Checked browser console for errors
- [ ] Verified `VITE_GOOGLE_CLIENT_ID` in Netlify environment variables
- [ ] Redeployed site after adding environment variables
- [ ] Cleared browser cache and reloaded
- [ ] Tried incognito mode

### "Invalid Client" Error
- [ ] Verified Client ID matches Google Cloud Console exactly
- [ ] No extra spaces or characters in Client ID
- [ ] Checked both `VITE_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID` are set
- [ ] Redeployed after fixing

### "Redirect URI Mismatch" Error
- [ ] Verified exact Netlify URL added to Google Console (including https://)
- [ ] URL doesn't have trailing slash mismatch
- [ ] Waited 10+ minutes after Google Console changes
- [ ] Tried in incognito mode (clears Google's cache)

### Backend/Function Errors
- [ ] Checked Netlify Functions logs (Functions tab)
- [ ] Verified `GOOGLE_CLIENT_ID` is set (no VITE_ prefix)
- [ ] Checked `google-auth-library` is in package.json dependencies
- [ ] Viewed function invocation logs for specific error messages

### Still Not Working?
- [ ] Reviewed [GOOGLE_AUTH_FIX.md](./GOOGLE_AUTH_FIX.md)
- [ ] Checked [QUICK_START.md](./QUICK_START.md)
- [ ] Reviewed Netlify deploy logs
- [ ] Checked all environment variables are saved
- [ ] Contacted support with error messages from console

## Post-Deployment

### Documentation
- [ ] Updated README.md with deployment info
- [ ] Documented any custom configuration
- [ ] Added Netlify URL to project documentation

### Security
- [ ] Verified `.env` not committed to Git
- [ ] Confirmed API keys not exposed in frontend code
- [ ] Checked Google OAuth restricted to actual domains only

### Optional Improvements
- [ ] Set up custom domain
- [ ] Configure SSL (auto-enabled on Netlify)
- [ ] Set up continuous deployment
- [ ] Configure build notifications

---

## Quick Reference

**Google Cloud Console:**  
https://console.cloud.google.com/apis/credentials

**Netlify Dashboard:**  
https://app.netlify.com

**Your Netlify Site:**  
https://your-app-name.netlify.app

**Environment Variables Needed:**
- `VITE_GOOGLE_CLIENT_ID` = (Your Google OAuth Client ID)
- `GOOGLE_CLIENT_ID` = (Same value)

---

## Notes & Issues

Use this space to track any issues or special configurations:

```
Date: ___________
Issue: 
Solution:


Date: ___________
Issue:
Solution:


```

---

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Overall Status:** _____________

**Deployment URL:** _____________

**Deployed By:** _____________

**Date Deployed:** _____________
