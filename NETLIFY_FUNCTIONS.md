# Using Netlify Functions (Serverless)

If you want to avoid deploying a separate backend server, you can use Netlify Functions.

## Setup

1. **Install Dependencies**
   ```bash
   npm install google-auth-library
   ```

2. **Configure netlify.toml**
   Update the API redirect in `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

3. **Set Environment Variables in Netlify**
   - Go to Site settings → Environment variables
   - Add:
     - `GOOGLE_CLIENT_ID` (same value as VITE_GOOGLE_CLIENT_ID)
     - `VITE_GOOGLE_CLIENT_ID`
     - `VITE_API_BASE` = leave empty or set to `/`

4. **Update LoginPage.jsx**
   If VITE_API_BASE is empty, the fetch will use relative URLs:
   ```javascript
   const apiBase = import.meta.env.VITE_API_BASE || '';
   // Will call: /api/auth/google which redirects to /.netlify/functions/google-auth
   ```

5. **Deploy**
   Push to GitHub or redeploy on Netlify

## Testing Locally

To test Netlify Functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server
netlify dev
```

This will run both your Vite frontend and Netlify Functions.

## Benefits of Netlify Functions
- ✅ No separate backend to deploy
- ✅ Everything in one place
- ✅ Automatic scaling
- ✅ Free tier available

## Limitations
- ⚠️ Cold starts (first request may be slower)
- ⚠️ No persistent connections
- ⚠️ Good for simple APIs, not for complex backends

For your use case (just Google OAuth verification), Netlify Functions are perfect!
