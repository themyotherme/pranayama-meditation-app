# 🎯 Generic Wellness Framework Guide

## ✨ **Framework Overview**

This is a **generic wellness framework** that can be used to create different wellness apps by simply changing JSON configuration files. No code changes needed!

## 🚀 **Creating New Apps**

### **Step 1: Copy the Framework**
```bash
# Copy the entire framework folder
cp -r generic-wellness-framework/ my-new-wellness-app/
cd my-new-wellness-app/
```

### **Step 2: Update App Configuration**
Edit `examples/app-config.json`:

```json
{
  "appInfo": {
    "name": "My Yoga App",
    "description": "A yoga-focused wellness app",
    "customZenMusic": "./audio/my-yoga-music.mp3"
  },
  "ambientSoundMapping": {
    "exerciseTypes": {
      "breathing": "om_chanting",
      "meditation": "mantra_music",
      "yoga": "sitar_music"
    }
  }
}
```

### **Step 3: Update Programs**
Edit `examples/pranyammeditation-programs.json`:

```json
{
  "programs": {
    "morning_yoga": {
      "id": "morning_yoga",
      "name": "Morning Yoga Flow",
      "description": "Start your day with gentle yoga",
      "duration": 20,
      "exercises": [
        {
          "exerciseId": "sun_salutation",
          "duration": 600
        }
      ]
    }
  }
}
```

### **Step 4: Update Exercises**
Edit `examples/pranyammeditation-exercises.json`:

```json
{
  "exercises": {
    "sun_salutation": {
      "id": "sun_salutation",
      "name": "Sun Salutation",
      "description": "A flowing yoga sequence",
      "type": "yoga",
      "duration": 600
    }
  }
}
```

### **Step 5: Add Your Media Files**
```
my-new-wellness-app/
├── audio/
│   ├── my-yoga-music.mp3
│   ├── nature/
│   └── spiritual/
```

## 🎵 **Audio Configuration**

### **Custom Background Music**
Set your custom music in `app-config.json`:
```json
{
  "appInfo": {
    "customZenMusic": "./audio/my-custom-music.mp3"
  }
}
```

### **Ambient Sound Mapping**
Map exercise/program types to ambient sounds:
```json
{
  "ambientSoundMapping": {
    "exerciseTypes": {
      "breathing": "om_chanting",
      "meditation": "mantra_music",
      "yoga": "sitar_music",
      "cardio": "flute_music"
    },
    "programTypes": {
      "morning": "mantra_music",
      "evening": "om_chanting",
      "workout": "flute_music"
    }
  }
}
```

### **Media File Paths**
Configure where your audio files are located:
```json
{
  "mediaFiles": {
    "om_chanting": "./audio/spiritual/om-chanting.mp3",
    "sitar_music": "./audio/spiritual/sitar-meditation.mp3",
    "yoga_music": "./audio/yoga/flow-music.mp3"
  }
}
```

## 🎚️ **Audio Settings**

### **Volume Control**
```json
{
  "audioSettings": {
    "defaultVolume": 0.3,
    "zenMusicVolumeMultiplier": 0.1,
    "bellVolume": 0.3,
    "voiceVolume": 0.8
  }
}
```

### **Bell Settings**
```json
{
  "bellSettings": {
    "exerciseStartBells": 1,
    "exerciseEndBells": 1,
    "programEndBells": 0,
    "continuousBellDuration": 5000
  }
}
```

## 🎨 **UI Configuration**

### **Interface Settings**
```json
{
  "uiSettings": {
    "showTestButtons": true,
    "enableDraggableModals": true,
    "enableAudioControls": true,
    "defaultTheme": "dark"
  }
}
```

## 📁 **File Structure**

```
your-wellness-app/
├── examples/
│   ├── app-config.json          # App configuration
│   ├── pranyammeditation-programs.json  # Programs
│   └── pranyammeditation-exercises.json # Exercises
├── audio/                       # Media files
├── framework.js                 # Core framework (don't modify)
├── index.html                   # Main HTML (minimal changes)
└── manifest.json               # PWA manifest
```

## 🔧 **Framework Features**

### **✅ What's Configurable via JSON:**
- App name, description, theme
- Programs and exercises
- Ambient sound mappings
- Media file paths
- Audio volume settings
- Bell system settings
- UI preferences

### **✅ What's Built-in (No Configuration Needed):**
- PWA/Offline support
- Session history & analytics
- Export/Import user data
- Bell system
- Audio system
- Draggable modals
- Dark/Light themes
- AI program generation

## 🎯 **App Examples**

### **Yoga App**
- Programs: Morning Flow, Evening Stretch, Power Yoga
- Exercises: Sun Salutation, Warrior Poses, Meditation
- Music: Yoga flow music, OM chanting

### **Meditation App**
- Programs: Mindfulness, Stress Relief, Sleep Prep
- Exercises: Breathing, Body Scan, Loving Kindness
- Music: Mantra music, Singing bowls

### **Fitness App**
- Programs: Cardio, Strength, Recovery
- Exercises: HIIT, Stretching, Cool-down
- Music: Energetic music, Nature sounds

### **Sleep App**
- Programs: Sleep Stories, Relaxation, Insomnia Relief
- Exercises: Progressive Relaxation, Breathing
- Music: Rain sounds, Soft drones

## 🚀 **Deployment**

### **Local Development**
```bash
python -m http.server 8000
```

### **Production Deployment**
1. Upload all files to web server
2. Ensure HTTPS for PWA features
3. Test offline functionality

## 📝 **Best Practices**

### **JSON Configuration**
- Keep JSON files valid (use JSON validator)
- Use consistent naming conventions
- Document your configuration choices

### **Media Files**
- Use MP3 format for compatibility
- Keep file sizes reasonable (< 10MB)
- Test audio quality at low volumes

### **Programs & Exercises**
- Use descriptive names and descriptions
- Set appropriate durations
- Test program flows

---

**🎉 Your generic wellness framework is ready to create unlimited wellness apps!**
