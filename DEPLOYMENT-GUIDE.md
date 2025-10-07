# 🚀 **Deployment Guide - Generic Wellness Framework** ✨

## 📱 **Automatic Netlify Deployment:**

### **✅ Configuration Files Ready:**

**1. JSON Configuration:**
- **`app-config.json`** - Pranayama Meditation app config
- **`kamasutra-app-config.json`** - Kama Sutras app config
- **URL Configuration:** Each app has its own domain
- **Graphics Configuration:** App-specific graphics and media

**2. Netlify Configuration:**
- **`netlify.toml`** - Automatic deployment settings
- **Redirect Rules:** SPA routing for all apps
- **Security Headers:** Security and performance optimization
- **Cache Settings:** Optimized caching for static assets

## 🎯 **Deployment URLs:**

### **📱 Pranayama Meditation:**
- **URL:** https://pranyammeditation.lifeloveme.com/
- **Domain:** pranyammeditation.lifeloveme.com
- **Config:** `examples/app-config.json`
- **Graphics:** `./graphics/meditation/`

### **💕 Kama Sutras Wellness:**
- **URL:** https://kamasutra.lifeloveme.com/
- **Domain:** kamasutra.lifeloveme.com
- **Config:** `examples/kamasutra-app-config.json`
- **Graphics:** `./graphics/intimacy/`

## 🚀 **Deployment Process:**

### **📱 For Pranayama Meditation:**

**1. Deploy to Netlify:**
- **Drag & Drop:** `generic-wellness-framework` folder to Netlify
- **Site Name:** `pranyammeditation` (from JSON config)
- **Domain:** `pranyammeditation.lifeloveme.com`
- **Build:** Automatic (no build required)

**2. Configuration:**
- **App Config:** Uses `examples/app-config.json`
- **Programs:** Uses `examples/pranyammeditation-programs.json`
- **Exercises:** Uses `examples/pranyammeditation-exercises.json`
- **Graphics:** Uses `./graphics/meditation/` folder

### **💕 For Kama Sutras App:**

**1. Create Kama Sutras App:**
- **Copy Framework:** Create new folder `kamasutra-wellness-framework`
- **Update Config:** Replace `app-config.json` with `kamasutra-app-config.json`
- **Add Programs:** Use `kamasutra-programs.json`
- **Add Exercises:** Use `kamasutra-exercises.json`
- **Add Graphics:** Create `./graphics/intimacy/` folder

**2. Deploy to Netlify:**
- **Drag & Drop:** `kamasutra-wellness-framework` folder to Netlify
- **Site Name:** `kamasutra` (from JSON config)
- **Domain:** `kamasutra.lifeloveme.com`
- **Build:** Automatic (no build required)

## 📁 **File Structure for Each App:**

### **📱 Pranayama Meditation App:**
```
pranyammeditation-wellness-framework/
├── index.html
├── framework.js
├── manifest.json
├── service-worker.js
├── styles.css
├── netlify.toml
├── examples/
│   ├── app-config.json (Pranayama config)
│   ├── pranyammeditation-programs.json
│   └── pranyammeditation-exercises.json
├── audio/
│   ├── India_Master_-_Zen_Music_Namast.mp3
│   └── [other meditation audio files]
└── graphics/
    └── meditation/
        ├── logo.svg
        ├── favicon.ico
        ├── hero-image.jpg
        ├── icons/
        └── programs/
```

### **💕 Kama Sutras App:**
```
kamasutra-wellness-framework/
├── index.html
├── framework.js
├── manifest.json
├── service-worker.js
├── styles.css
├── netlify.toml
├── examples/
│   ├── kamasutra-app-config.json
│   ├── kamasutra-programs.json
│   └── kamasutra-exercises.json
├── audio/
│   └── intimacy/
│       ├── romantic-music.mp3
│       └── [other intimacy audio files]
└── graphics/
    └── intimacy/
        ├── logo.svg
        ├── favicon.ico
        ├── hero-image.jpg
        ├── icons/
        └── programs/
```

## ⚙️ **Netlify Configuration:**

### **🔧 Automatic Settings:**
- **Build Command:** `echo 'No build required'`
- **Publish Directory:** `.` (current directory)
- **Redirects:** All routes redirect to `index.html` (SPA)
- **Headers:** Security and performance headers
- **Cache:** Optimized caching for static assets

### **📱 Environment Variables:**
- **NODE_ENV:** `production`
- **APP_CONFIG:** `examples/app-config.json`
- **Custom Domain:** Set in Netlify dashboard

## 🎨 **Graphics Configuration:**

### **📱 Pranayama Meditation Graphics:**
- **Logo:** `./graphics/meditation/logo.svg`
- **Favicon:** `./graphics/meditation/favicon.ico`
- **Hero Image:** `./graphics/meditation/hero-image.jpg`
- **Backgrounds:** Default and dark mode backgrounds
- **Exercise Icons:** Breathing, meditation, relaxation, energy
- **Program Images:** Morning, evening, stress relief programs

### **💕 Kama Sutras Graphics:**
- **Logo:** `./graphics/intimacy/logo.svg`
- **Favicon:** `./graphics/intimacy/favicon.ico`
- **Hero Image:** `./graphics/intimacy/hero-image.jpg`
- **Backgrounds:** Default and dark mode backgrounds
- **Exercise Icons:** Communication, touch, breathing, wellness
- **Program Images:** Beginner intimacy, communication, touch exploration

## 🚀 **Deployment Benefits:**

### **✅ Automatic Configuration:**
- **JSON-Driven:** All settings from JSON files
- **No Manual Setup:** Netlify picks up configuration automatically
- **Consistent Deployment:** Same process for all apps
- **Easy Updates:** Change JSON files to update app

### **📱 Multi-App Support:**
- **Generic Framework:** Same codebase for all apps
- **App-Specific Config:** Each app has its own JSON
- **Independent Deployment:** Deploy apps separately
- **Shared Codebase:** Framework code shared across apps

## 🎯 **Next Steps:**

### **📱 Deploy Pranayama App:**
1. **Test Current App:** Verify all features work
2. **Deploy to Netlify:** Use current framework
3. **Verify Deployment:** Check URL and functionality
4. **Test Mobile Notice:** Ensure notice displays correctly

### **💕 Prepare Kama Sutras App:**
1. **Create App Folder:** Copy framework for Kama Sutras
2. **Update Configuration:** Use Kama Sutras JSON files
3. **Add Graphics:** Create intimacy-specific graphics
4. **Deploy to Netlify:** Deploy as separate app

---

**🚀 Ready for automatic Netlify deployment!** ✨

**Both apps can be deployed independently with their own configurations!** 📱💕✨