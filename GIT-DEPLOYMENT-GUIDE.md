# Git-based Netlify Deployment Guide

## 🚀 Alternative Deployment Method

### Step 1: Initialize Git Repository
```bash
cd C:\LifeLovesMe\pranyammeditation-deploy\pranayama-clean
git init
git add .
git commit -m "Initial commit - Pranayama Meditation App v4.2"
```

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name: `pranayama-meditation-app`
4. Make it **Public** (required for free Netlify)
5. **Don't** initialize with README
6. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/pranayama-meditation-app.git
git branch -M main
git push -u origin main
```

### Step 4: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose "GitHub" as provider
4. Select your `pranayama-meditation-app` repository
5. Set build settings:
   - **Build command**: `echo 'No build process needed'`
   - **Publish directory**: `.`
6. Click "Deploy site"

### Step 5: Configure Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain: `pranyammeditation.lifeloveme.com`
3. Follow DNS setup instructions

## 🔄 Future Updates
After making changes:
```bash
git add .
git commit -m "Update description"
git push origin main
```
Netlify will automatically redeploy!

## 📱 Testing
- Test on iPhone with Netlify URL first
- Then set up custom domain
- All features will work the same
