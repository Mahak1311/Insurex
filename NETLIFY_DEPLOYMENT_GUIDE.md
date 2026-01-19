# 🚀 Netlify Deployment Guide for Google Authentication

## Problem
Google Sign-In doesn't work on Netlify because:
1. Missing environment variables
2. OAuth redirect URIs not configured for your Netlify domain
3. Backend server needs to be deployed separately

## Solution - Step by Step

### 1️⃣ Deploy Your Backend Server First

Your Express server (`server/index.js`) needs to be deployed separately. Options:

#### Option A: Deploy on Render.com (Recommended - Free)
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: insurex-backend
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add Environment Variables:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API Key
   - `PORT`: 5000
6. Click "Create Web Service"
7. Copy your backend URL (e.g., `https://insurex-backend.onrender.com`)

#### Option B: Deploy on Railway.app (Alternative)
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: `server`
   - Add environment variables (same as above)
5. Deploy and copy the backend URL

### 2️⃣ Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under **Authorized JavaScript origins**, add:
   ```
   https://your-netlify-site.netlify.app
   https://your-custom-domain.com (if you have one)
   ```
5. Under **Authorized redirect URIs**, add:
   ```
   https://your-netlify-site.netlify.app
   https://your-netlify-site.netlify.app/login
   ```
6. Click **Save**

### 3️⃣ Configure Netlify Environment Variables

1. Go to your Netlify dashboard
2. Select your site → **Site settings** → **Environment variables**
3. Add these variables:
   - **Name**: `VITE_GOOGLE_CLIENT_ID`
   - **Value**: Your Google OAuth Client ID (from Google Cloud Console)
   
   - **Name**: `VITE_API_BASE`
   - **Value**: Your backend URL (e.g., `https://insurex-backend.onrender.com`)
   
   - **Name**: `VITE_GOOGLE_MAPS_API_KEY`
   - **Value**: Your Google Maps API Key

4. Click **Save**

### 4️⃣ Update netlify.toml

Update the `netlify.toml` file with your actual backend URL:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-actual-backend-url.com/api/:splat"
  status = 200
  force = true
```

### 5️⃣ Deploy to Netlify

#### Method 1: Netlify Dashboard (Drag & Drop)
1. Run `npm run build` locally
2. Drag the `dist` folder to Netlify

#### Method 2: Git Integration (Recommended)
1. Push your code to GitHub
2. Go to Netlify → "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings should auto-detect:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### 6️⃣ Test Your Deployment

1. Visit your Netlify URL
2. Go to the Login page
3. Click "Sign in with Google"
4. It should now work!

## Troubleshooting

### Google Sign-In Button Not Appearing
- Check browser console for errors
- Verify `VITE_GOOGLE_CLIENT_ID` is set in Netlify
- Make sure the Google Identity script loads (check Network tab)

### "Invalid Client" Error
- Your Google OAuth Client ID is incorrect
- Verify the environment variable matches your Google Cloud Console

### "Redirect URI Mismatch" Error
- Add your Netlify URL to Authorized JavaScript origins in Google Cloud Console
- Wait 5-10 minutes for Google's changes to propagate

### Backend API Errors (401/500)
- Ensure your backend is running on Render/Railway
- Check backend logs for errors
- Verify `VITE_API_BASE` environment variable points to the correct backend URL
- Make sure `GOOGLE_CLIENT_ID` is set on the backend

### CORS Errors
- Ensure your backend has `app.use(cors())` enabled
- If using specific origins, add your Netlify URL to the CORS whitelist

## Alternative: Serverless Functions (No Separate Backend)

If you want to keep everything on Netlify, you can convert the backend to Netlify Functions:

1. Create `netlify/functions/google-auth.js`:
```javascript
const { OAuth2Client } = require('google-auth-library');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token } = JSON.parse(event.body);
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Authentication failed' })
    };
  }
};
```

2. Update `VITE_API_BASE` to empty string or `/.netlify/functions`
3. Redeploy

## Security Notes

⚠️ **Never commit `.env` files to Git**
- Environment variables contain sensitive keys
- Always use `.env.example` for templates
- Configure real values in Netlify dashboard

## Need Help?

- Check Netlify deploy logs for build errors
- Check browser console for frontend errors
- Check backend logs (Render/Railway) for API errors
- Verify all environment variables are set correctly
