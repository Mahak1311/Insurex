# 🚀 Fix Google Sign-In on Netlify - Complete Guide

## 📋 The Problem

Your Google Sign-In works locally but fails on Netlify because:
1. ❌ Missing environment variables (VITE_GOOGLE_CLIENT_ID)
2. ❌ Google OAuth not configured for your Netlify domain
3. ❌ Backend API endpoint not accessible

## ✅ The Solution (Choose One)

I've provided **TWO solutions**. Pick the one that works best for you:

### Option A: Netlify Functions (RECOMMENDED - Easier)
Everything runs on Netlify. No separate backend needed.

### Option B: Separate Backend Server
Deploy backend on Render/Railway. More control, better for complex APIs.

---

## 🎯 Option A: Netlify Functions (Recommended)

### Step 1: Install Dependency
```bash
npm install google-auth-library
```

### Step 2: Get Your Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (or create one)
3. **APIs & Services** → **Credentials**
4. If you don't have an OAuth Client ID:
   - Click **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Name: "Insurex Web App"
   - Click **Create**
5. Copy your **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)

### Step 3: Configure Google OAuth

In Google Cloud Console → Your OAuth Client ID:

1. **Authorized JavaScript origins** - Add:
   ```
   https://your-site-name.netlify.app
   ```
   
2. **Authorized redirect URIs** - Add:
   ```
   https://your-site-name.netlify.app
   https://your-site-name.netlify.app/login
   ```

3. Click **Save**

### Step 4: Set Netlify Environment Variables

Go to Netlify Dashboard → Your Site → **Site settings** → **Environment variables**

Add these variables:

| Key | Value | Example |
|-----|-------|---------|
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID | `123456.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_ID` | Same value as above | `123456.apps.googleusercontent.com` |
| `VITE_API_BASE` | Leave empty or `/` | `` |

### Step 5: Deploy

```bash
# Commit your changes
git add .
git commit -m "Add Netlify Functions for Google auth"
git push

# Or build and drag & drop
npm run build
# Then drag the 'dist' folder to Netlify
```

### Step 6: Test

1. Visit your Netlify site
2. Go to Login page
3. Click "Sign in with Google"
4. ✅ Should work now!

---

## 🎯 Option B: Separate Backend Server

If you prefer a separate backend (for more complex API needs):

### Step 1: Deploy Backend on Render.com

1. Go to [render.com](https://render.com) and sign up
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `insurex-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add Environment Variables:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `PORT`: `5000`
6. Click **Create Web Service**
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://insurex-backend.onrender.com`)

### Step 2: Update netlify.toml

Change the redirect to point to your backend:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://insurex-backend.onrender.com/api/:splat"
  status = 200
```

### Step 3: Set Netlify Environment Variables

| Key | Value |
|-----|-------|
| `VITE_GOOGLE_CLIENT_ID` | Your Google OAuth Client ID |
| `VITE_API_BASE` | Your backend URL |

### Step 4: Deploy Netlify

```bash
git add .
git commit -m "Configure backend API"
git push
```

---

## 🔧 Troubleshooting

### Google Button Not Showing

**Check browser console:**
```
Missing VITE_GOOGLE_CLIENT_ID
```
**Solution:** Add `VITE_GOOGLE_CLIENT_ID` in Netlify environment variables and redeploy.

---

### "Invalid Client" Error

**Solution:** 
- Verify the Client ID matches exactly what's in Google Cloud Console
- Check for extra spaces or characters
- Redeploy after fixing

---

### "Redirect URI Mismatch" Error

**Console shows:**
```
Error 400: redirect_uri_mismatch
```

**Solution:**
1. Add your exact Netlify URL to Google Cloud Console
2. Don't forget `https://` prefix
3. Wait 5-10 minutes for changes to propagate
4. Try in incognito mode

---

### Backend/API Errors (401, 500)

**For Netlify Functions:**
- Check Netlify function logs: Site → Functions → google-auth
- Ensure `GOOGLE_CLIENT_ID` is set (without VITE_ prefix)
- Verify `google-auth-library` is installed

**For Separate Backend:**
- Check backend logs on Render/Railway
- Ensure backend is running (visit backend URL in browser)
- Verify `VITE_API_BASE` points to correct backend URL

---

### CORS Errors

**Console shows:**
```
Access to fetch blocked by CORS policy
```

**For Netlify Functions:** Should not happen (same origin)

**For Separate Backend:**
- Ensure `app.use(cors())` is in server/index.js
- Or add specific origin:
  ```javascript
  app.use(cors({
    origin: 'https://your-site.netlify.app'
  }))
  ```

---

## 📱 Test Locally

### Test with Netlify Functions:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run local dev server (includes functions)
netlify dev
```

### Test with Separate Backend:
```bash
# Terminal 1: Run backend
cd server
node index.js

# Terminal 2: Run frontend
npm run dev
```

---

## 🔐 Security Checklist

- ✅ Never commit `.env` file to Git
- ✅ Use environment variables for all secrets
- ✅ Restrict OAuth origins to your actual domains
- ✅ Don't expose API keys in frontend code

---

## 📁 Files Created

- ✅ `netlify.toml` - Netlify configuration
- ✅ `netlify/functions/google-auth.js` - Serverless function for OAuth
- ✅ `server/package.json` - Backend dependencies
- ✅ `.env.example` - Updated with all required variables

---

## 🆘 Still Having Issues?

1. **Check Netlify Deploy Logs**
   - Go to Deploys tab
   - Click on the latest deploy
   - Check build logs for errors

2. **Check Browser Console**
   - Right-click → Inspect → Console tab
   - Look for error messages

3. **Check Netlify Function Logs**
   - Go to Functions tab
   - Click on `google-auth`
   - View recent invocations

4. **Verify Environment Variables**
   - All variables set in Netlify dashboard
   - No typos in variable names
   - Values don't have extra spaces

---

## 📚 Documentation Links

- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Google OAuth Setup](https://developers.google.com/identity/gsi/web/guides/overview)
- [Render.com Docs](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## ✨ Quick Start Checklist

- [ ] Get Google OAuth Client ID from Google Cloud Console
- [ ] Add Netlify URL to Authorized JavaScript origins in Google Console
- [ ] Set `VITE_GOOGLE_CLIENT_ID` in Netlify environment variables
- [ ] Set `GOOGLE_CLIENT_ID` in Netlify environment variables
- [ ] Run `npm install google-auth-library`
- [ ] Commit and push changes
- [ ] Deploy on Netlify
- [ ] Test Google Sign-In

That's it! Your Google authentication should now work on Netlify. 🎉
