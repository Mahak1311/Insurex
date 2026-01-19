# Email OTP Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Click "Security" in left sidebar
   - Click "2-Step Verification"
   - Follow the setup process

3. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Or: Security → 2-Step Verification → App passwords (at bottom)
   - Select app: "Mail"
   - Select device: "Other (Custom name)" → Type "Insurex"
   - Click **Generate**
   - **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)

### Step 2: Update server/.env File

Open `server/.env` and update these lines:

```env
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

**Replace with:**
- `EMAIL_USER`: Your actual Gmail address
- `EMAIL_PASS`: The 16-character app password you just generated

### Step 3: Restart Backend Server

```bash
cd server
node index.js
```

## Testing

1. Go to signup page
2. Enter name, email, and phone
3. Click "Send OTP"
4. Check your email for the OTP (should arrive within seconds)
5. In development mode, OTP also appears in console and alert
6. Enter OTP and verify

## How It Works

- **Real OTP**: Generated randomly (6 digits)
- **Email Delivery**: Sent via Gmail SMTP
- **Expiry**: OTP expires after 5 minutes
- **Security**: 
  - Max 3 attempts per OTP
  - Auto-cleanup of expired OTPs
  - Stored in memory (use Redis in production)

## Troubleshooting

### "Failed to send OTP email"
- ✅ Check EMAIL_USER and EMAIL_PASS in server/.env
- ✅ Make sure 2-Step Verification is enabled
- ✅ Use App Password, not your regular Gmail password
- ✅ Restart backend server after updating .env

### "OTP expired or not found"
- OTPs expire after 5 minutes
- Click "Resend OTP" to get a new one

### "Too many failed attempts"
- After 3 wrong OTP attempts, request a new OTP

## Production Notes

For production deployment:
- Use environment variables in Netlify/Vercel
- Consider using SendGrid, AWS SES, or Mailgun for better deliverability
- Use Redis for OTP storage instead of in-memory Map
- Add rate limiting to prevent abuse
