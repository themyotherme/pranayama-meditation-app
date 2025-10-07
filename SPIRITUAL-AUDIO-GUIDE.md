# 🎵 Spiritual Audio System Guide

## ✨ New Synthesized Spiritual Sounds

The app now includes **4 new synthesized spiritual sounds**:

### 🪕 **Sitar Music** (`sitar_music`)
- **Sound**: Traditional Indian sitar with drone strings
- **Frequencies**: C4 (261.63Hz) + G3 (196Hz) 
- **Effects**: Bandpass filter + reverb
- **Best for**: Stress relief, relaxation, mindfulness

### 🕉️ **OM Chanting** (`om_chanting`)
- **Sound**: Sacred "OM" with "O" and "M" components
- **Frequencies**: A2 (110Hz) + A3 (220Hz) with vibrato
- **Effects**: Lowpass filter + breathing pattern
- **Best for**: Breathing exercises, sleep preparation, balance

### 🎶 **Mantra Music** (`mantra_music`)
- **Sound**: Harmonious mantra tones (Sa + Pa)
- **Frequencies**: C4 (261.63Hz) + G4 (392Hz)
- **Effects**: Warm filter + subtle delay
- **Best for**: Meditation, healing, morning routines

### 🎵 **Enhanced Flute Music** (`flute_music`)
- **Sound**: Peaceful flute tones
- **Frequencies**: A4 (440Hz)
- **Effects**: Clean sine wave
- **Best for**: Energy, evening routines

## 🎯 **Automatic Sound Selection**

The app now automatically selects spiritual sounds based on exercise/program type:

- **Breathing exercises** → OM Chanting
- **Meditation** → Mantra Music  
- **Relaxation** → Sitar Music
- **Sleep preparation** → OM Chanting
- **Stress relief** → Sitar Music
- **Morning routines** → Mantra Music
- **Evening routines** → OM Chanting

## 🔊 **Testing the New Sounds**

Click **"🎵 Test Audio"** to hear all sounds in sequence:
1. Ocean Waves
2. Soft Drone  
3. **Sitar Music** (NEW!)
4. **OM Chanting** (NEW!)
5. **Mantra Music** (NEW!)
6. Flute Music

## 📁 **Adding Public Domain Audio Files**

To add real audio files (sitar, flute, OM chanting, mantras):

### 1. **Create Audio Folders**
```
generic-wellness-framework/
├── audio/
│   ├── spiritual/
│   │   ├── sitar-meditation.mp3
│   │   ├── om-chanting.mp3
│   │   ├── mantra-music.mp3
│   │   └── flute-meditation.mp3
│   ├── nature/
│   └── ambient/
```

### 2. **Update File Paths**
In `framework.js`, update the `getAmbientFile()` function:
```javascript
getAmbientFile(ambientType) {
    const mediaFiles = {
        'sitar_music': './audio/spiritual/sitar-meditation.mp3',
        'om_chanting': './audio/spiritual/om-chanting.mp3',
        'mantra_music': './audio/spiritual/mantra-music.mp3',
        'flute_music': './audio/spiritual/flute-meditation.mp3',
        // ... other files
    };
    return mediaFiles[ambientType];
}
```

### 3. **Public Domain Sources**

**Free Spiritual Audio Sources:**
- **Freesound.org** - Creative Commons audio
- **Zapsplat.com** - Free with account
- **BBC Sound Effects** - Free for personal use
- **YouTube Audio Library** - Free music
- **Internet Archive** - Public domain recordings

**Search Terms:**
- "OM chanting meditation"
- "Sitar meditation music"  
- "Mantra chanting"
- "Flute meditation"
- "Tibetan singing bowls"

### 4. **File Format Recommendations**
- **Format**: MP3 or OGG (smaller file sizes)
- **Quality**: 128-192 kbps (good quality, reasonable size)
- **Duration**: 3-10 minutes (can loop seamlessly)
- **Volume**: Normalized to prevent clipping

## 🎚️ **Volume Control**

All spiritual sounds play at **low volume** (10-15% of input volume) to:
- ✅ Not interfere with voice narration
- ✅ Create subtle background atmosphere
- ✅ Allow focus on breathing/meditation
- ✅ Be easily adjustable via volume controls

## 🔧 **Technical Details**

**Web Audio API Features Used:**
- **Oscillators**: Multiple sine/sawtooth waves
- **Filters**: Lowpass, bandpass for tone shaping
- **Effects**: Delay, reverb, vibrato (LFO)
- **Envelopes**: Gradual volume changes
- **Harmony**: Multiple frequencies for rich sound

**Performance:**
- ✅ Lightweight (no large audio files)
- ✅ Instant playback (no loading)
- ✅ Customizable (easy to modify frequencies)
- ✅ Cross-platform (works on all devices)

---

**🎵 Enjoy your enhanced spiritual meditation experience!**
