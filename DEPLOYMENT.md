# 🎬 Movie Booking App - Deployment Guide

This guide will help you deploy your Movie Booking application to production using **Render** (Backend) and **Vercel** (Frontend).

## 📋 Prerequisites

- GitHub account (free)
- Render account (free) - https://render.com
- Vercel account (free) - https://vercel.com
- MongoDB Atlas database (already configured)

---

## 🚀 Step 1: Prepare Your Code

### 1.1 Initialize Git Repository (if not done)
```bash
cd "C:\Users\nagul\OneDrive\Desktop\movie booking"
git init
git add .
git commit -m "Initial commit - Movie Booking App"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository named `movie-booking-app`
3. Don't initialize with README (we already have code)
4. Click "Create repository"

### 1.3 Push Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/movie-booking-app.git
git branch -M main
git push -u origin main
```

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select `movie-booking-app` repository
4. Configure the service:
   - **Name:** `movie-booking-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

### 2.3 Add Environment Variables
In the Render dashboard, go to **Environment** section and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://movieappuser:8838118264c%2Fnagul@cluster0.h5kzblv.mongodb.net/movie-booking?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | Your JWT secret (generate a random string) |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://movie-booking-app.vercel.app` (update after deploying frontend) |

**Generate JWT_SECRET:** You can use this command:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment to complete (2-3 minutes)
3. **Copy your backend URL** (e.g., `https://movie-booking-backend.onrender.com`)

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import `movie-booking-app` repository
3. Configure the project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### 3.3 Add Environment Variables
In the deployment settings, add environment variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://YOUR-BACKEND-URL.onrender.com/api` |

**Replace** `YOUR-BACKEND-URL` with your actual Render backend URL from Step 2.4

Example: `https://movie-booking-backend.onrender.com/api`

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. **Copy your frontend URL** (e.g., `https://movie-booking-app.vercel.app`)

---

## 🔄 Step 4: Update Backend CORS

### 4.1 Update Render Environment
1. Go back to your Render dashboard
2. Select your backend service
3. Go to **Environment** section
4. Update `FRONTEND_URL` variable with your Vercel URL:
   ```
   https://movie-booking-app.vercel.app
   ```
5. Click **"Save Changes"**
6. Wait for automatic redeployment

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend
Visit: `https://YOUR-BACKEND-URL.onrender.com/api/health`

You should see: `{"status":"Server is running"}`

### 5.2 Test Frontend
1. Visit your Vercel URL: `https://movie-booking-app.vercel.app`
2. Test the following:
   - ✅ Register a new account
   - ✅ Login
   - ✅ Browse movies
   - ✅ Select seats and showtime
   - ✅ Complete payment
   - ✅ View generated ticket
   - ✅ Check My Bookings

---

## 🔒 Security Checklist

- [ ] MongoDB Atlas Network Access is configured (0.0.0.0/0 or specific IPs)
- [ ] Environment variables are set correctly
- [ ] JWT_SECRET is strong and unique
- [ ] CORS is configured with your frontend URL
- [ ] `.env` files are not committed to Git

---

## 🔧 Update Deployment

### When you make changes to your code:

**For Backend:**
```bash
cd backend
git add .
git commit -m "Update backend"
git push
```
Render will automatically redeploy.

**For Frontend:**
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push
```
Vercel will automatically redeploy.

---

## 📊 Important URLs

After deployment, save these URLs:

| Service | URL |
|---------|-----|
| **Frontend** | https://movie-booking-app.vercel.app |
| **Backend API** | https://movie-booking-backend.onrender.com/api |
| **MongoDB** | Already configured on Atlas |

---

## ⚠️ Common Issues

### Issue 1: Backend not responding
- Check Render logs: Dashboard → Logs
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Issue 2: CORS errors
- Update `FRONTEND_URL` in Render environment variables
- Ensure it matches your exact Vercel URL (no trailing slash)

### Issue 3: Frontend can't connect to backend
- Check `REACT_APP_API_URL` in Vercel environment variables
- Ensure it includes `/api` at the end
- Redeploy frontend after changing environment variables

### Issue 4: Render free tier goes to sleep
- First request after inactivity takes 30-60 seconds
- Consider upgrading to paid tier for always-on service

---

## 💡 Tips

1. **Custom Domain:** Both Render and Vercel support custom domains
2. **HTTPS:** Both platforms provide free SSL certificates
3. **Logs:** Check deployment logs if something goes wrong
4. **Environment Variables:** Changes require redeployment
5. **Free Tier Limits:** 
   - Render: Spins down after 15 min of inactivity
   - Vercel: 100GB bandwidth/month

---

## 🎉 You're Done!

Your Movie Booking app is now live and accessible worldwide! 🌍

Share your app URL: https://movie-booking-app.vercel.app

---

## 📞 Need Help?

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables
3. Test backend health endpoint
4. Review MongoDB Atlas connection settings

Good luck with your deployment! 🚀
