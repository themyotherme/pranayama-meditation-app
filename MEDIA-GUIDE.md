# 🎬 Media System Guide - Generic Wellness Framework

## 🎵 Audio & Video Support

The framework supports a sophisticated multi-media orchestration system with:
- **Media Registry** - Central library of audio/video files
- **Multi-track Audio** - Up to 6 audio tracks per exercise
- **Local Video** - MP4, WebM, etc.
- **YouTube Video** - Embedded YouTube videos
- **Time-based Scheduling** - Precise timing control

---

## 📚 Media Registry

### **Purpose:**
Central library where all media files are defined once and referenced by exercises.

### **Structure:**
```json
"mediaRegistry": {
  "ocean_waves": {
    "id": "ocean_waves",
    "name": "Ocean Waves",
    "type": "audio",
    "file": "audio/nature/ocean-waves.mp3",
    "duration": 300,
    "loopable": true,
    "category": "nature"
  }
}
```

### **Fields:**
- `id` - Unique identifier
- `name` - Display name
- `type` - "audio" or "video"
- `file` - Path to file (relative to root)
- `duration` - Length in seconds
- `loopable` - Can repeat?
- `category` - For organization

---

## 🎵 Audio System

### **Multiple Audio Tracks:**
Each exercise can have up to 6 audio tracks playing at different times.

### **Example:**
```json
"audioFiles": [
  {
    "mediaId": "ocean_waves",
    "exerciseStart": 0,
    "fileStart": 0,
    "playDuration": 300,
    "volume": 70
  },
  {
    "mediaId": "singing_bowls",
    "exerciseStart": 30,
    "fileStart": 15,
    "playDuration": 240,
    "volume": 50
  }
]
```

### **Fields Explained:**
- `mediaId` - References media registry entry
- `exerciseStart` - When to start (seconds into exercise)
- `fileStart` - Where to start in audio file (seek position)
- `playDuration` - How long to play (seconds)
- `volume` - Volume 0-100

### **Example Timeline:**
```
Exercise starts:
0:00 - Ocean waves starts playing at 70% volume
0:30 - Singing bowls starts at 50% volume (from 15 sec into file)
5:00 - Ocean waves stops
4:30 - Singing bowls stops
```

---

## 📹 Video System

### **Supports Two Types:**

#### **1. Local Video Files**
```json
"videoSources": [
  {
    "file": "video/meditation-guide.mp4",
    "exerciseStart": 0,
    "fileStart": 30,
    "playDuration": 300,
    "volume": 80
  }
]
```

**Local video files you have:**
- `video/Baba & Amma Shradhanjali.mp4`

#### **2. YouTube Videos**
```json
"videoSources": [
  {
    "file": "https://www.youtube.com/watch?v=inpok4MKVLM",
    "exerciseStart": 0,
    "fileStart": 60,
    "playDuration": 99999,
    "volume": 80
  }
]
```

**YouTube URLs supported:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`

**Framework automatically:**
- Detects YouTube URLs
- Extracts video ID
- Creates embed iframe
- Starts from specified time
- Autoplays (if browser allows)

---

## 🎯 Example YouTube Videos for Meditation

### **Recommended Videos:**

**1. Guided Meditation:**
```
https://www.youtube.com/watch?v=inpok4MKVLM
"5-Minute Meditation"
```

**2. Breathing Exercise:**
```
https://www.youtube.com/watch?v=tybOi4hjZFQ
"4-7-8 Breathing Technique"
```

**3. Nature Sounds:**
```
https://www.youtube.com/watch?v=eKFTSSKCzWA
"Ocean Waves for Sleep"
```

**4. Yoga Practice:**
```
https://www.youtube.com/watch?v=v7AYKMP6rOE
"Yoga for Beginners"
```

---

## 📁 File Organization

### **Current Audio Files:**
```
audio/
├── ambient/
│   └── soft-drone.mp3
├── meditation/
│   └── singing-bowls.mp3
├── music/
│   └── flute-meditation.mp3
├── nature/
│   ├── forest-night.mp3
│   ├── gentle-rain.mp3
│   └── ocean-waves.mp3
├── meditation-music.mp3
├── breathing-guidance.mp3
├── mindfulness-invocation.mp3
├── Lag Ja Gale.mp3
└── sa-ch-ourfather-english.mp3
```

### **Current Video Files:**
```
video/
└── Baba & Amma Shradhanjali.mp4
```

---

## 🔧 How to Add Media to Exercises

### **Step 1: Add to Media Registry**
```json
"mediaRegistry": {
  "new_track": {
    "id": "new_track",
    "name": "New Meditation Track",
    "type": "audio",
    "file": "audio/new-track.mp3",
    "duration": 600,
    "loopable": true,
    "category": "meditation"
  }
}
```

### **Step 2: Reference in Exercise**
```json
"your_exercise": {
  "audioFiles": [
    {
      "mediaId": "new_track",
      "exerciseStart": 0,
      "fileStart": 0,
      "playDuration": 600,
      "volume": 60
    }
  ]
}
```

### **For YouTube:**
```json
"videoSources": [
  {
    "file": "https://www.youtube.com/watch?v=VIDEO_ID",
    "exerciseStart": 0,
    "fileStart": 30,
    "playDuration": 300,
    "volume": 80
  }
]
```

---

## 🧪 Testing Media

**Refresh the page and start a program. Watch console for:**
```
Media registry loaded: 11 media files
Started audio track: Ocean Waves at 0 seconds
YouTube video scheduled: inpok4MKVLM start at: 0 seconds
```

**You should:**
- Hear audio tracks starting at scheduled times
- See video player appear (if configured)
- See YouTube embed (if YouTube URL used)
- Hear multiple tracks layered together

---

## 💡 Pro Tips

### **Layering Audio:**
```json
"audioFiles": [
  {"mediaId": "ocean_waves", "exerciseStart": 0, "volume": 40},
  {"mediaId": "singing_bowls", "exerciseStart": 10, "volume": 30},
  {"mediaId": "flute_music", "exerciseStart": 20, "volume": 25}
]
```
Creates a rich soundscape with ocean → bowls → flute layering!

### **Video with Audio:**
You can have both video AND multiple audio tracks:
```json
"videoSources": [{"file": "video/guide.mp4"}],
"audioFiles": [
  {"mediaId": "ocean_waves", "volume": 20}
]
```
Video plays with subtle ocean background!

---

## ✅ System is Ready!

The framework now has **complete media orchestration** just like the original app, but with:
- ✅ Cleaner code
- ✅ Better organization
- ✅ YouTube support
- ✅ Easy to configure
- ✅ No caching issues

**Test it now by starting a program!** 🎬🎵
