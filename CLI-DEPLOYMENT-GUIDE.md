# Netlify CLI Deployment Guide

## 🛠️ Using Netlify CLI

### Prerequisites
- Node.js installed
- Netlify account

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```
This will open your browser for authentication.

### Step 3: Deploy from pranayama-clean directory
```bash
cd C:\LifeLovesMe\pranyammeditation-deploy\pranayama-clean
netlify deploy --prod --dir .
```

### Step 4: Link to existing site (if needed)
```bash
netlify link
```
Then select your existing `pranyammeditation` site.

### Step 5: Deploy to linked site
```bash
netlify deploy --prod
```

## 🔧 Troubleshooting CLI Issues
- **Authentication**: Run `netlify logout` then `netlify login`
- **Site linking**: Run `netlify unlink` then `netlify link`
- **Permissions**: Ensure you're the site owner

## 📱 Benefits
- **Direct deployment** to existing site
- **Bypass web interface** issues
- **Command line control**
- **Automatic deployment** on changes
