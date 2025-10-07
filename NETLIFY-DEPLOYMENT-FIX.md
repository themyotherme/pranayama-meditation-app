# 🚀 Netlify Deployment Fix - "Access Denied" Error

## ❌ **The Problem:**
You're trying to deploy the **parent directory** instead of the **app folder**.

## ✅ **The Solution:**

### **🎯 Deploy the Correct Folder:**

**❌ Wrong:** Deploy `pranyammeditation-deploy/` (parent directory)
**✅ Correct:** Deploy `pranyammeditation-deploy/generic-wellness-framework/` (app folder)

## 📁 **Correct Deployment Structure:**

```
What Netlify should see:
├── index.html          ← Main app file
├── framework.js        ← Core framework
├── manifest.json       ← PWA manifest
├── service-worker.js   ← PWA service worker
├── examples/           ← JSON configuration files
│   ├── app-config.json
│   ├── pranyammeditation-programs.json
│   └── pranyammeditation-exercises.json
├── audio/              ← Your Zen music and audio files
│   ├── India_Master_-_Zen_Music_Namast.mp3
│   └── [other audio files]
└── [other app files]
```

## 🚀 **Step-by-Step Fix:**

### **1. Select Correct Directory:**
- **In Netlify dashboard** → "Deploy manually"
- **Drag and drop** the `generic-wellness-framework` folder
- **NOT** the parent `pranyammeditation-deploy` folder

### **2. Alternative Method:**
- **Zip the `generic-wellness-framework` folder**
- **Upload the zip file** to Netlify
- **Netlify will extract** the correct files

### **3. Git Method (Recommended):**
```bash
# Navigate to the app folder
cd generic-wellness-framework

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Connect to Netlify
# Use Netlify's Git integration
```

## 🔧 **Netlify Build Settings:**

### **Build Command:** (Leave empty - static site)
### **Publish Directory:** `/` (root)
### **Node Version:** (Not needed - static site)

## 📱 **Verify Deployment:**

### **✅ Check These Files Are Present:**
- `index.html` - Main app
- `framework.js` - Core functionality  
- `manifest.json` - PWA manifest
- `service-worker.js` - Offline functionality
- `examples/` folder with JSON files
- `audio/` folder with your Zen music

### **✅ Test the App:**
1. **Open deployed URL**
2. **Check console** - Should see "Framework initialized successfully"
3. **Click a program** - Should work without errors
4. **Listen for music** - Your Zen music should play

## 🎯 **Why This Happens:**

### **❌ Wrong Directory Issues:**
- **Missing `index.html`** - Netlify can't find the main file
- **Missing JSON files** - App can't load configuration
- **Missing audio files** - Music won't play
- **Wrong file structure** - App doesn't work

### **✅ Correct Directory Benefits:**
- **All files present** - Complete app structure
- **JSON files load** - Configuration works
- **Audio files accessible** - Music plays
- **PWA features work** - Offline functionality

## 🚀 **Quick Fix Commands:**

### **Option 1: Zip Method**
```bash
# Navigate to the app folder
cd generic-wellness-framework

# Create zip file
# Right-click folder → "Send to" → "Compressed folder"
# Upload the zip to Netlify
```

### **Option 2: Git Method**
```bash
# Navigate to the app folder
cd generic-wellness-framework

# Initialize git
git init
git add .
git commit -m "Meditation app ready for deployment"

# Push to GitHub
# Connect GitHub repo to Netlify
```

## 🎉 **After Correct Deployment:**

### **✅ Your App Will Have:**
- **Working meditation programs** - All 26 programs available
- **Audio system** - Your Zen music plays automatically
- **PWA features** - Install as app, works offline
- **GPS programs** - Walking meditation, nature connection
- **Beginner-friendly** - "First Time Experience" program

### **✅ Test Checklist:**
- [ ] App loads without errors
- [ ] Programs are visible and clickable
- [ ] Music plays when starting a program
- [ ] PWA install prompt appears
- [ ] Works offline after first load

---

**🚀 Deploy the `generic-wellness-framework` folder to fix the "Access Denied" error!** ✨
