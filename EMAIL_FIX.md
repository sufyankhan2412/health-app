# Email Configuration Fix

## The Problem:
Your registration is working perfectly! The issue is **SMTP connection timeout** when sending OTP emails.

```
💥 Register error: Error: Connection timeout
code: 'ETIMEDOUT'
command: 'CONN'
```

## What I Fixed:
1. ✅ Made email sending **non-blocking** - registration succeeds even if email fails
2. ✅ Added timeout settings to SMTP connection (10 seconds)
3. ✅ OTP is logged in console for testing (when email fails)
4. ✅ Better error handling

## Now Registration Works Even If Email Fails!

The user will be created and can verify using the OTP from Render logs.

---

## Fix Email Sending (Choose One):

### Option 1: Fix Gmail SMTP (Recommended)

**Problem:** Render's servers might be blocked by Gmail or the App Password is incorrect.

**Steps:**
1. Go to: https://myaccount.google.com/apppasswords
2. Create a new App Password for "Mail"
3. Copy the 16-character password (remove spaces)
4. Update in Render environment variables:
   ```
   MAIL_PASS=your16charpassword
   ```

**Also verify:**
- MAIL_USER is correct: `sufyanmk2024801@gmail.com`
- MAIL_HOST is: `smtp.gmail.com`
- MAIL_PORT is: `587`

### Option 2: Use SendGrid (More Reliable)

SendGrid is more reliable for production and has a free tier (100 emails/day).

**Steps:**
1. Sign up: https://sendgrid.com/
2. Create an API key
3. Update Render environment variables:
   ```
   MAIL_HOST=smtp.sendgrid.net
   MAIL_PORT=587
   MAIL_USER=apikey
   MAIL_PASS=your_sendgrid_api_key
   MAIL_FROM=sufyanmk2024801@gmail.com
   ```

### Option 3: Use Mailtrap (For Testing)

Perfect for development/testing.

**Steps:**
1. Sign up: https://mailtrap.io/
2. Get SMTP credentials from inbox settings
3. Update Render environment variables with Mailtrap credentials

### Option 4: Disable Email Temporarily

For testing, you can get OTP from Render logs:

1. Register a user
2. Check Render logs for: `⚠️ Email send failed: ... - OTP: 123456`
3. Use that OTP to verify

---

## Test Email Configuration:

After updating environment variables on Render:

1. **Redeploy** (Render → Manual Deploy)
2. **Test registration**
3. **Check Render logs** for:
   - ✅ `OTP sent successfully to email@example.com` (success)
   - ⚠️ `Email send failed: ... - OTP: 123456` (failed, but OTP shown)

---

## Current Status:

✅ Registration endpoint works
✅ User is created in database
✅ OTP is generated and saved
✅ Frontend receives success response
❌ Email sending times out (but doesn't block registration anymore)

---

## Environment Variables to Update on Render:

1. Go to: https://dashboard.render.com
2. Select your service
3. Go to "Environment" tab
4. Update these:

```
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=sufyanmk2024801@gmail.com
MAIL_PASS=pcaoprwujdvcqshb
MAIL_FROM=sufyanmk2024801@gmail.com
```

**Note:** Remove spaces from MAIL_PASS if there are any!

5. Click "Save Changes"
6. Service will auto-redeploy

---

## Quick Test After Deploy:

```bash
# Test registration
curl -X POST https://health-app-vi7z.onrender.com/api/patient/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "+911234567890"
  }'
```

Should return:
```json
{
  "message": "OTP sent to your email. Please verify."
}
```

Then check Render logs for OTP!
