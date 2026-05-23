# Deployment Checklist - Registration Fix

## Issues Fixed:

### 1. ✅ Vercel Configuration
- Changed from trying to deploy backend on Vercel to using Vercel as frontend-only
- Added proxy rewrites to forward API calls to Render backend

### 2. ✅ Backend Server Export
- Added `module.exports = app` to make server compatible with serverless if needed
- Conditional server start to prevent double-listening

### 3. ✅ CORS Configuration
- Updated to accept all Vercel preview URLs using regex pattern
- Added credentials support
- Better error handling for CORS issues
- **OPTIONS preflight now returns 204 ✅**

### 4. ✅ API Client Fix
- Fixed duplicate headers in POST request
- Cleaned up fetch configuration

### 5. ✅ Error Handling
- Added global error handler middleware to backend
- Added detailed logging in register controller
- Added request logging middleware

### 6. ✅ Body Parser
- Increased body size limit to 10mb
- Added urlencoded parser for form data

### 7. ✅ Health Check
- Added `/health` endpoint to verify backend status
- Shows MongoDB connection status

---

## Quick Test:

1. **Test Health Endpoint:**
   Open: https://health-app-vi7z.onrender.com/health
   Should return: `{"status":"ok","timestamp":"...","mongodb":"connected"}`

2. **Test with HTML File:**
   Open `test-api.html` in your browser to test both endpoints

---

## Render Environment Variables to Verify:

Make sure these are set in your Render dashboard:

```
MONGO_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
MAIL_HOST=smtp.gmail.com (or your SMTP host)
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=your-email@gmail.com
NODE_ENV=production
PORT=5000
```

---

## Vercel Environment Variables to Verify:

Make sure these are set in your Vercel project settings:

```
VITE_API_URL=https://health-app-vi7z.onrender.com
```

(If you're using this variable in your frontend)

---

## Testing Steps:

1. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "fix: deployment configuration for registration"
   git push
   ```

2. **Redeploy on Render:**
   - Go to Render dashboard
   - Click "Manual Deploy" > "Deploy latest commit"
   - Wait for deployment to complete

3. **Test Registration:**
   - Open your Vercel URL
   - Try to register with a test email
   - Check browser console for any errors
   - Check Render logs for backend errors

4. **Common Issues to Check:**
   - CORS errors → Check Render logs and verify CORS config
   - 500 errors → Check if MongoDB is connected (Render logs)
   - Email not sending → Verify MAIL_* environment variables
   - Timeout → Check if Render service is sleeping (free tier)

---

## Debugging Commands:

### Check Render Logs:
Go to Render Dashboard → Your Service → Logs

### Check Frontend Network Tab:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try registration
4. Look for the POST request to `/api/patient/register`
5. Check the response status and body

### Test Backend Directly:
```bash
curl -X POST https://health-app-vi7z.onrender.com/api/patient/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"test123","phone":"+911234567890"}'
```

---

## If Registration Still Fails:

1. **Check MongoDB Connection:**
   - Verify MONGO_URI is correct
   - Check if IP whitelist includes 0.0.0.0/0 (for Render)

2. **Check Email Service:**
   - If using Gmail, enable "Less secure app access" or use App Password
   - Verify MAIL_* credentials

3. **Check Render Service:**
   - Free tier services sleep after 15 min of inactivity
   - First request after sleep takes 30-60 seconds

4. **Check CORS:**
   - Open browser console
   - Look for CORS-related errors
   - Verify your Vercel URL matches the pattern in CORS config
