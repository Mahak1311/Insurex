# 🔧 Quick Fix for Google Authentication on Netlify

## Immediate Steps (5 minutes)

### Step 1: Add Environment Variables in Netlify
1. Go to: [Netlify Dashboard](https://app.netlify.com) → Your Site → **Site settings** → **Environment variables**
2. Click **Add a variable** and add:

```
VITE_GOOGLE_CLIENT_ID = your-google-client-id.apps.googleusercontent.com
VITE_API_BASE = https://your-backend-url.com
```

### Step 2: Update Google Cloud Console
1. Go to: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. Add your Netlify URL to **Authorized JavaScript origins**:
   ```
   https://your-site-name.netlify.app
   ```
4. Click **Save**

### Step 3: Redeploy on Netlify
1. Go to: **Deploys** → **Trigger deploy** → **Deploy site**
2. Wait for build to complete
3. Test Google Sign-In

## If You Don't Have a Backend Yet

Your app needs a backend server to verify Google tokens. Quick options:

### Option 1: Use Demo Mode (Temporary)
Your app already has demo login. For now:
- Use Email/Phone OTP login (already working)
- Use "Demo Login" button

### Option 2: Deploy Backend (15 minutes)

**On Render.com:**
1. Sign up at [render.com](https://render.com)
2. New + → Web Service → Connect your GitHub repo
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. Environment Variables:
   - `GOOGLE_CLIENT_ID`: (your Google OAuth Client ID)
   - `PORT`: 5000
5. Create Web Service
6. Copy the URL (e.g., `https://insurex-backend.onrender.com`)
7. Add this URL as `VITE_API_BASE` in Netlify environment variables
8. Redeploy Netlify

## Check If It's Working

Open browser console on your Netlify site's login page:
- ✅ Should see: "Google Identity script loaded"
- ✅ Should see: "Google button rendered"
- ❌ If errors appear, they'll tell you what's missing

## Common Issues

| Error | Solution |
|-------|----------|
| "Missing VITE_GOOGLE_CLIENT_ID" | Add it in Netlify environment variables |
| "Invalid client" | Check Client ID matches Google Cloud Console |
| "Redirect URI mismatch" | Add Netlify URL to Google Cloud Console |
| "Backend error" | Deploy backend server and set VITE_API_BASE |
| Button not showing | Check if Client ID is set, redeploy site |
