# Firebase Hosting Deployment Guide

## 🚀 Alternative to Netlify - Firebase Hosting

### Step 1: Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. **Click "Create a project"**
3. **Project name**: `pranayama-meditation`
4. **Enable Google Analytics**: Optional
5. **Click "Create project"**

### Step 2: Enable Hosting
1. **In Firebase console, click "Hosting"**
2. **Click "Get started"**
3. **Follow the setup wizard**

### Step 3: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 4: Login and Initialize
```bash
firebase login
cd C:\LifeLovesMe\pranyammeditation-deploy\pranayama-clean\netlify-deploy
firebase init hosting
```
- **Select your Firebase project**
- **Public directory**: `.` (current directory)
- **Single-page app**: Yes
- **Overwrite index.html**: No

### Step 5: Deploy
```bash
firebase deploy
```

### Step 6: Get Your URL
- **Firebase URL**: `https://pranayama-meditation-123456.web.app`
- **Custom domain**: Can be added in Firebase console

## 🔄 Updates
```bash
firebase deploy
```

## 📱 Benefits
- **Google's infrastructure**
- **Fast and reliable**
- **Free tier available**
- **Easy custom domains**
