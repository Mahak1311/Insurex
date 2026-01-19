# 🎯 Quick Start - Google Auth on Netlify

## What You Need (2 things):

1. **Google OAuth Client ID**
   - Get from: https://console.cloud.google.com/apis/credentials
   - Looks like: `123456789-abc.apps.googleusercontent.com`

2. **Netlify Site URL**
   - Your Netlify URL: `https://your-app.netlify.app`

---

## 🚀 5-Minute Setup

### 1️⃣ Install Package (1 min)
```bash
npm install google-auth-library
```

### 2️⃣ Google Cloud Console (2 min)
1. Open: https://console.cloud.google.com/apis/credentials
2. Click your OAuth Client ID
3. Add to **Authorized JavaScript origins**:
   ```
   https://your-app.netlify.app
   ```
4. Click **Save**

### 3️⃣ Netlify Dashboard (2 min)
1. Open: https://app.netlify.com
2. Your Site → **Site settings** → **Environment variables**
3. Add variable:
   - Name: `VITE_GOOGLE_CLIENT_ID`
   - Value: (paste your Google Client ID)
4. Add another variable:
   - Name: `GOOGLE_CLIENT_ID`
   - Value: (same Google Client ID)
5. Click **Save**

### 4️⃣ Deploy
```bash
git add .
git commit -m "Fix Google auth"
git push
```

### 5️⃣ Test
- Visit your Netlify site → Login page
- Click "Sign in with Google"
- ✅ Done!

---

## 📊 How It Works

```
┌─────────────┐
│   Browser   │
│  (Netlify)  │
└──────┬──────┘
       │ 1. User clicks "Sign in with Google"
       │
       ▼
┌─────────────┐
│   Google    │
│   OAuth     │ 2. Google authenticates user
└──────┬──────┘
       │
       │ 3. Returns token
       ▼
┌─────────────────────┐
│ Netlify Function    │
│ /api/auth/google    │ 4. Verifies token
└──────┬──────────────┘
       │
       │ 5. Returns user data
       ▼
┌─────────────┐
│ Dashboard   │ 6. User logged in ✅
└─────────────┘
```

---

## ⚡ Environment Variables Needed

| Variable | Where to Set | Value |
|----------|--------------|-------|
| `VITE_GOOGLE_CLIENT_ID` | Netlify Dashboard | Your Google OAuth Client ID |
| `GOOGLE_CLIENT_ID` | Netlify Dashboard | Same as above |

**Note:** Both are needed!
- `VITE_*` = Used by frontend (Vite)
- Without `VITE_` = Used by backend (Netlify Function)

---

## 🔍 Where to Find Your Google Client ID

1. Go to: https://console.cloud.google.com
2. Select your project
3. Menu → **APIs & Services** → **Credentials**
4. Under "OAuth 2.0 Client IDs" → Click your web client
5. Copy the **Client ID**

### Don't have one yet?
Click **Create Credentials** → **OAuth client ID** → **Web application**

---

## ❌ Common Mistakes

| Mistake | Fix |
|---------|-----|
| Forgot to set environment variables | Add them in Netlify dashboard |
| Typo in variable name | Must be exactly `VITE_GOOGLE_CLIENT_ID` |
| Didn't add Netlify URL to Google | Add it to Authorized JavaScript origins |
| Didn't redeploy after changes | Trigger new deploy in Netlify |
| Used wrong Client ID | Copy from Google Cloud Console, not API Key |

---

## 🧪 Test It's Working

Open browser console (F12) on your login page:

### ✅ Success Looks Like:
```
Loading Google Identity script with clientId: 123456...
✓ Google Identity ready, initializing...
✓ Google button rendered
```

### ❌ Error Looks Like:
```
Missing VITE_GOOGLE_CLIENT_ID
```
→ Solution: Add environment variable in Netlify

```
Failed to load Google Identity script
```
→ Solution: Check internet connection, try different browser

```
Invalid client
```
→ Solution: Check Client ID is correct

---

## 📞 Need Help?

**Check these in order:**

1. ✅ Environment variables set in Netlify?
2. ✅ Netlify URL added to Google Cloud Console?
3. ✅ Redeployed after adding env variables?
4. ✅ `google-auth-library` installed?
5. ✅ Waited 5 minutes after Google Console changes?

**Still stuck?**
- Check [GOOGLE_AUTH_FIX.md](./GOOGLE_AUTH_FIX.md) for detailed troubleshooting
- Check Netlify function logs
- Check browser console for errors

---

## 📝 Files You Have

- `netlify.toml` → Configures Netlify
- `netlify/functions/google-auth.js` → Handles Google login
- `.env.example` → Template for local development

---

**That's it! 5 minutes and Google auth works on Netlify! 🎉**
