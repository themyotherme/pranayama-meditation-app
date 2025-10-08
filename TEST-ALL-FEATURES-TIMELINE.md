# 🧪 Test All Features - Complete Timeline

## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1


## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1


## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1


## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1


## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1


## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1



## **Program: "🧪 Test All Features"**
**Duration:** 3 minutes (180 seconds)  
**Purpose:** Comprehensive test of ALL app features in one exercise

---

## 📅 **Complete Media Timeline**

### **🎥 Video Timeline (YouTube with Autoplay)**

| **Time** | **Video** | **URL** | **Status** | **Volume** |
|----------|-----------|---------|------------|------------|
| **0:00 - 3:00** | Anulom Vilom Tutorial | `https://www.youtube.com/watch?v=Im6bppEZLjc` | ✅ Autoplay ON | 70% |
|  | Starts at 0:57 in video | File starts at 57s | Playing for 180s |  |

**📺 Expected Behavior:**
- ✅ Video appears in **top section** (60% height in split-screen mode)
- ✅ **Autoplays immediately** when exercise starts
- ✅ **X button** visible in top-right corner
- ✅ Video continues for full 3 minutes

---

### **🎵 Audio Timeline (3 Layers Simultaneously)**

| **Time** | **Track** | **File** | **Volume** | **Type** |
|----------|-----------|----------|------------|----------|
| **0:00 - 3:00** | Ravi Shankar Sitar | `audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3` | 15% | Background Music |
| **0:00 - 3:00** | Meditation Music | `audio/meditation-music.mp3` | 60% | Primary Music |
| **0:30 - 3:00** | OM Chanting | `audio/om-chanting.mp3` | 50% | Spiritual Chant |

**🔊 Audio Layers:**
- **Layer 1** (0:00): Soft sitar background (barely audible, 15%)
- **Layer 2** (0:00): Meditation music (main audio, 60%)
- **Layer 3** (0:30): OM chanting joins at 30 seconds (50%)

**Expected Result:** Rich, layered soundscape with 3 simultaneous tracks

---

### **🖼️ Slideshow Timeline (Below Video)**

| **Time** | **Image** | **File** | **Duration** | **Overlap** |
|----------|-----------|----------|--------------|-------------|
| **0:00 - 0:20** | OM Chanting 1 | `images/meditation/OmChanting1.jpg` | 20s | 1s fade |
| **0:19 - 0:39** | OM Chanting 2 | `images/meditation/OmChanting2.jpg` | 20s | 1s fade |
| **0:38 - 0:58** | OM Chanting 3 | `images/meditation/OmChanting3.jpg` | 20s | 1s fade |
| **0:57 - 1:17** | OM Chanting 4 | `images/meditation/OmChanting4.jpg` | 20s | 1s fade |
| **1:16 - 3:00** | OM Chanting 5 | `images/meditation/OmChanting5.jpg` | 104s | 1s fade |

**📸 Expected Behavior:**
- ✅ Slideshow appears in **bottom section** (40% height in split-screen mode)
- ✅ Images change every ~20 seconds with 1-second crossfade
- ✅ Last image (OmChanting5) stays for remaining 1:44
- ✅ **X button** visible in top-right corner of slideshow

---

### **🗣️ Voice Cues Timeline**

| **Time** | **Voice Cue** | **Purpose** |
|----------|---------------|-------------|
| **~0:05** | "Welcome to the comprehensive feature test!" | Introduction |
| **~0:15** | "You should see a YouTube video playing above" | Guide user attention to video |
| **~0:25** | "Below the video, images are transitioning smoothly" | Guide to slideshow |
| **~0:35** | "Listen to the layered audio: sitar, meditation music, and OM chanting" | Audio awareness |
| **~0:50** | "Breathing pattern: Inhale 4, Hold 2, Exhale 6" | Breathing instruction |
| **~1:10** | "Try clicking the X buttons to close video or slideshow" | Interactive test |
| **~1:30** | "Test the pause and resume buttons" | Pause/Resume test |
| **~1:50** | "Notice how the layout adjusts when you close media" | Layout test |
| **~2:10** | "All features are working together harmoniously!" | Conclusion |

**🎙️ Voice Settings:**
- **Enabled:** YES
- **Language:** en-US (English)
- **Rate:** 0.9 (slightly slower for clarity)

---

### **🫁 Breathing Pattern Timeline**

| **Phase** | **Duration** | **Metronome** |
|-----------|--------------|---------------|
| **Inhale** | 4 seconds | ✅ Tick |
| **Hold** | 2 seconds | ✅ Tick |
| **Exhale** | 6 seconds | ✅ Tick |
| **Total Cycle** | 12 seconds | 60 BPM |

**Expected Cycles:** 15 complete cycles in 3 minutes

**💨 On-Screen Cues:**
- **"Inhale"** - displayed for 4s
- **"Hold"** - displayed for 2s
- **"Exhale"** - displayed for 6s
- Repeating throughout the exercise

---

## 🎯 **Layout Behavior**

### **Scenario 1: Both Video + Slideshow Active (Default)**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (60% height)                   │
│                                     │
├─────────────────────────────────────┤
│      Image Slideshow [X]            │
│      (40% height)                   │
└─────────────────────────────────────┘
```

### **Scenario 2: User Clicks X on Video**
```
┌─────────────────────────────────────┐
│      Image Slideshow [X]            │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 3: User Clicks X on Slideshow**
```
┌─────────────────────────────────────┐
│      YouTube Video [X]              │
│      (100% height - EXPANDED)       │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **Scenario 4: Both Closed**
```
┌─────────────────────────────────────┐
│                                     │
│      (Media container hidden)       │
│      Timer and breathing cues only  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **Testing Checklist**

### **Video Tests**
- [ ] YouTube video autoplays immediately at 0:00
- [ ] Video shows in top section (60% height)
- [ ] X button visible on video container
- [ ] Clicking X closes video and expands slideshow
- [ ] Video respects `fileStart: 57` (starts at 0:57 in YouTube video)

### **Audio Tests**
- [ ] Sitar plays from 0:00 at 15% volume (very soft background)
- [ ] Meditation music plays from 0:00 at 60% volume (main audio)
- [ ] OM chanting starts at 0:30 at 50% volume
- [ ] All 3 audio tracks play simultaneously without distortion
- [ ] Audio continues even when video/slideshow are closed

### **Slideshow Tests**
- [ ] Slideshow starts immediately at 0:00
- [ ] Shows in bottom section (40% height)
- [ ] X button visible on slideshow container
- [ ] Images transition every ~20 seconds with 1s crossfade
- [ ] Last image (OmChanting5) stays for remaining time
- [ ] Clicking X closes slideshow and expands video

### **Voice Tests**
- [ ] Voice cues play at expected times
- [ ] Voice is clear and at 0.9 speed
- [ ] Voice doesn't overlap/interfere with other audio

### **Breathing Tests**
- [ ] Breathing cues appear on screen ("Inhale", "Hold", "Exhale")
- [ ] Metronome ticks audible at 60 BPM
- [ ] Pattern follows 4:2:6 timing correctly
- [ ] ~15 complete cycles in 3 minutes

### **Layout Tests**
- [ ] Default: Video (60%) + Slideshow (40%) side-by-side
- [ ] Close video → Slideshow expands to 100%
- [ ] Close slideshow → Video expands to 100%
- [ ] Close both → Container disappears, only timer/cues visible
- [ ] Layout adjusts smoothly without page scrolling

### **Pause/Resume Tests**
- [ ] Pause button stops video, audio, slideshow, and timer
- [ ] Resume button restarts everything from paused position
- [ ] Media states are preserved correctly

### **Mobile Tests**
- [ ] Everything works on mobile (responsive layout)
- [ ] Touch-friendly X buttons
- [ ] Video plays on iPhone (autoplay works)
- [ ] Audio unlocks work properly

---

## 🚀 **How to Test**

### **Step 1: Find the Program**
1. Open the app at `http://localhost:8000/pranayama-clean/`
2. Look for **"🧪 Test All Features"** program
3. It should appear at the TOP of the program list (marked as recommended)

### **Step 2: Start the Test**
1. Click **"Start Program"**
2. Immediately observe:
   - YouTube video should **autoplay** in top section
   - Slideshow should start in bottom section
   - Audio should begin (3 layers)
   - Voice should say "Welcome to the comprehensive feature test!"
   - Breathing cues should appear

### **Step 3: Interactive Tests**
1. **Wait 30 seconds** - OM chanting should start
2. **Click X on video** - Video closes, slideshow expands
3. **Reload and click X on slideshow** - Slideshow closes, video expands
4. **Test pause/resume** - Everything should pause and resume correctly
5. **Close both** - Media container should disappear

### **Step 4: Check Console**
1. Open DevTools (F12)
2. Look for console messages:
   - `🎬 Media layout check: { hasVideo: true, hasSlideshow: true }`
   - `📺 Both video and slideshow active - using split layout`
   - `📺 Video closed by user` (when clicking X)
   - `🖼️ Slideshow closed by user` (when clicking X)
   - `📺 Only video active - using full layout` (after closing slideshow)

---

## 📊 **Expected Server Log Pattern**

```
GET /pranayama-clean/examples/pranyammeditation-programs.json
GET /pranayama-clean/examples/pranyammeditation-exercises.json
GET /pranayama-clean/audio/Ravi_Shankar_-_Sitar_Violin_Duet.mp3
GET /pranayama-clean/audio/meditation-music.mp3
GET /pranayama-clean/images/meditation/OmChanting1.jpg
GET /pranayama-clean/audio/om-chanting.mp3  (at ~30 seconds)
GET /pranayama-clean/images/meditation/OmChanting2.jpg  (at ~20 seconds)
GET /pranayama-clean/images/meditation/OmChanting3.jpg  (at ~40 seconds)
GET /pranayama-clean/images/meditation/OmChanting4.jpg  (at ~60 seconds)
GET /pranayama-clean/images/meditation/OmChanting5.jpg  (at ~80 seconds)
```

---

## 🎊 **Success Criteria**

✅ **ALL features working together:**
1. YouTube video autoplays
2. 3 audio tracks layer beautifully
3. Images transition smoothly
4. Voice cues are clear and timely
5. Breathing pattern displays correctly
6. X buttons close media
7. Layout adjusts dynamically
8. Pause/Resume works perfectly
9. No console errors
10. Beautiful, harmonious experience!

---

**Created:** October 8, 2025  
**Purpose:** Comprehensive testing of all app features  
**Fileversion:** 6.1

