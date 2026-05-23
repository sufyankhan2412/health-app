# Quick Deployment Steps

## What Was Fixed:
✅ CORS preflight (OPTIONS) now returns 204
✅ Added detailed logging to track requests
✅ Fixed body parser configuration
✅ Added health check endpoint
✅ Better error messages

## Deploy Now:

### 1. Commit and Push
```bash
git add .
git commit -m "fix: registration endpoint with enhanced logging and CORS"
git push
```

### 2. Redeploy Backend on Render
- Go to: https://dashboard.render.com
- Find your service: health-app-vi7z
- Click "Manual Deploy" → "Deploy latest commit"
- Wait 2-3 minutes for deployment

### 3. Test Backend Health
Open in browser: https://health-app-vi7z.onrender.com/health

Should see:
```json
{
  "status": "ok",
  "timestamp": "2026-05-23T...",
  "mongodb": "connected"
}
```

### 4. Check Render Logs
After deployment, watch the logs for:
- `MongoDB connected` ✅
- `Server running on port 5000` ✅

### 5. Test Registration from Vercel
- Go to your Vercel app
- Try to register
- Open browser DevTools (F12) → Console
- Look for the console logs we added

### 6. Check Render Logs During Registration
You should see:
```
POST /api/patient/register { origin: 'https://...vercel.app', contentType: 'application/json' }
📝 Register request received: { body: {...}, hasEmail: true, hasPassword: true }
✨ Creating new user
📧 Sending OTP email...
✅ OTP sent successfully
```

## If It Still Fails:

### Check These in Order:

1. **MongoDB Connection**
   - Render logs show "MongoDB connected"?
   - MONGO_URI is correct in Render env vars?
   - MongoDB Atlas allows connections from anywhere (0.0.0.0/0)?

2. **Email Service**
   - Check MAIL_* environment variables in Render
   - If using Gmail, use App Password (not regular password)
   - Test email sending separately

3. **CORS Issues**
   - Check browser console for CORS errors
   - Verify your Vercel URL ends with `.vercel.app`

4. **Request Not Reaching Backend**
   - Check Render logs - do you see the POST request?
   - If not, check Vercel deployment logs
   - Verify API_BASE URL in frontend matches Render URL

## Environment Variables Checklist:

### Render (Backend):
- [ ] MONGO_URI
- [ ] JWT_SECRET
- [ ] JWT_EXPIRES_IN
- [ ] MAIL_HOST
- [ ] MAIL_PORT
- [ ] MAIL_USER
- [ ] MAIL_PASS
- [ ] MAIL_FROM
- [ ] NODE_ENV=production

### Vercel (Frontend):
- [ ] No special env vars needed (API URL is hardcoded in auth.js)

## Need More Help?

Share:
1. Render logs (last 50 lines)
2. Browser console errors
3. Network tab screenshot showing the failed request
