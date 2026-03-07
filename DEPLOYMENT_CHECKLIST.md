# 🚀 Deployment Checklist

Use this checklist to ensure smooth deployment of your Movie Booking app.

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] All code is committed to Git
- [ ] `.gitignore` is properly configured
- [ ] No sensitive data in code (passwords, API keys)
- [ ] Environment variables are documented

### Files Created
- [ ] `backend/render.yaml` - Render configuration
- [ ] `frontend/vercel.json` - Vercel configuration
- [ ] `backend/.env.example` - Environment template
- [ ] `frontend/.env.example` - Environment template
- [ ] `DEPLOYMENT.md` - Full deployment guide

### Code Updates
- [ ] Frontend API URL uses environment variable
- [ ] Backend CORS configured for production
- [ ] MongoDB connection uses Atlas cloud database

---

## 📦 GitHub Setup

- [ ] Create GitHub account (if needed)
- [ ] Create new repository `movie-booking-app`
- [ ] Push code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR_USERNAME/movie-booking-app.git
  git push -u origin main
  ```

---

## 🔧 Backend Deployment (Render)

### Account Setup
- [ ] Create Render account at https://render.com
- [ ] Connect GitHub account

### Service Creation
- [ ] Create new Web Service
- [ ] Select your repository
- [ ] Configure:
  - Name: `movie-booking-backend`
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`

### Environment Variables
Add these in Render dashboard:
- [ ] `MONGODB_URI` - Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Generate random string (use crypto)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `PORT` - Set to `5000`
- [ ] `FRONTEND_URL` - Your Vercel URL (update after frontend deploy)

### Deployment
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 minutes)
- [ ] **Save backend URL**: `https://______________.onrender.com`
- [ ] Test health endpoint: `https://YOUR-URL.onrender.com/api/health`

---

## 🎨 Frontend Deployment (Vercel)

### Account Setup
- [ ] Create Vercel account at https://vercel.com
- [ ] Connect GitHub account

### Project Import
- [ ] Import project from GitHub
- [ ] Configure:
  - Framework: Create React App (auto-detected)
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `build`

### Environment Variables
Add in Vercel dashboard:
- [ ] `REACT_APP_API_URL` - Your Render backend URL + `/api`
  Example: `https://movie-booking-backend.onrender.com/api`

### Deployment
- [ ] Click "Deploy"
- [ ] Wait for build (2-3 minutes)
- [ ] **Save frontend URL**: `https://______________.vercel.app`

---

## 🔄 Final Configuration

### Update Backend CORS
- [ ] Go back to Render dashboard
- [ ] Update `FRONTEND_URL` environment variable with your Vercel URL
- [ ] Save changes (triggers auto-redeploy)

### Verify MongoDB Atlas
- [ ] Login to MongoDB Atlas
- [ ] Check Network Access allows `0.0.0.0/0` (all IPs)
- [ ] Verify database user has read/write permissions

---

## ✅ Testing Checklist

### Backend Tests
- [ ] Health check works: `/api/health`
- [ ] Movies endpoint works: `/api/movies`
- [ ] Server logs show no errors

### Frontend Tests
Visit your Vercel URL and test:
- [ ] Home page loads correctly
- [ ] Can view movies page
- [ ] Can register new account
- [ ] Can login
- [ ] Can select seats
- [ ] Can proceed to payment
- [ ] Ticket is generated
- [ ] My Bookings page works

### Integration Tests
- [ ] Frontend connects to backend (no CORS errors)
- [ ] Can create bookings successfully
- [ ] Data persists in MongoDB
- [ ] Authentication works end-to-end

---

## 📝 Post-Deployment

### URLs to Save
Record your deployment URLs:
```
Frontend: https://_____________________________.vercel.app
Backend:  https://_____________________________.onrender.com
API:      https://_____________________________.onrender.com/api
MongoDB:  (Already on Atlas)
```

### Share Your App
- [ ] Test app from different device
- [ ] Share URL with friends/users
- [ ] Monitor for errors in deployment logs

### Optional Improvements
- [ ] Add custom domain (Vercel & Render support this)
- [ ] Set up monitoring/analytics
- [ ] Configure email notifications
- [ ] Update MongoDB password (was shared in chat)

---

## 🆘 Troubleshooting

### If backend isn't responding:
1. Check Render logs for errors
2. Verify all environment variables
3. Test MongoDB connection from Atlas
4. Check if service is sleeping (free tier)

### If frontend can't connect:
1. Check browser console for errors
2. Verify `REACT_APP_API_URL` is correct
3. Ensure it ends with `/api`
4. Redeploy after env var changes

### If CORS errors appear:
1. Verify `FRONTEND_URL` in Render
2. Ensure no trailing slashes
3. Match exact Vercel URL
4. Redeploy backend

---

## 🎉 Success!

Once all checkboxes are complete, your app is live!

**Your Movie Booking App is now accessible worldwide! 🌍**

---

**Next Steps:**
- Monitor usage and performance
- Collect user feedback
- Plan future features
- Consider upgrading to paid tiers for better performance

**Need Help?** Check DEPLOYMENT.md for detailed instructions!
