# Generic Wellness Framework

A modular, extensible framework for building wellness applications with comprehensive media support.

## Features

### 🎯 Core Functionality
- **Program Management**: Create, edit, and manage wellness programs
- **Exercise Library**: Comprehensive exercise database with customization
- **Progress Tracking**: Monitor sessions, time practiced, and achievements
- **User Profiles**: Personalized settings and statistics

### 🎵 Comprehensive Media Support
The framework supports **4 types of media** for each exercise:

1. **Audio Files** (MP3, WAV, OGG)
   - Background music
   - Nature sounds
   - Guided audio
   - Multi-track support with scheduling

2. **Video Content** (MP4, WEBM, YouTube)
   - Local video files
   - YouTube integration
   - Video scheduling and timing control

3. **Documents** (PDF, PPT, TXT, DOC, XLS)
   - Reference guides (PDFs)
   - Educational presentations (PowerPoint)
   - Notes and instructions (TXT)
   - Progress tracking (Excel)
   - Opens in separate windows or embedded

4. **Images** (JPG, PNG, GIF, SVG)
   - Diagrams and illustrations
   - Posture guides
   - Visual references
   - Multiple display modes (overlay, sidebar, inline, popup)

### 📱 Display Options

#### Document Display:
- **New Window**: Opens in separate browser window/tab
- **Embedded (PDF only)**: Shows in iframe within the page
- **Download**: Triggers file download

#### Image Display:
- **Overlay**: Full-screen with close button
- **Sidebar**: Fixed panel (left/right, small/medium/large)
- **Inline**: Embedded in content area
- **Popup**: Modal dialog

#### Timing Control:
- **Before**: Display before exercise starts (reference material)
- **During**: Display during exercise execution
- **After**: Display after exercise completes (summaries, certificates)
- **Always**: Display throughout (persistent reference)

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: Eye-friendly theme switching
- **Inline CSS**: No external stylesheet dependencies (cache-proof)
- **Accessible**: High contrast, clear typography

### 🔧 Admin Tools
- **Program Manager**: View, edit, delete, and export programs
- **Exercise Manager**: Manage exercise library
- **Program Builder**: Create new programs with drag-and-drop
- **Exercise Editor**: JSON-based exercise editing with validation

### 🤖 AI Features (Planned)
- AI Program Generator (based on goals and preferences)
- Smart Recommendations (personalized suggestions)
- Progress Analysis

## Quick Start

### 1. Setup
```bash
# Clone or download the framework
cd generic-wellness-framework

# Start a local server (Python)
python -m http.server 8001

# Or use any other local server
# PHP: php -S localhost:8001
# Node: npx http-server -p 8001
```

### 2. Access
Open your browser and navigate to:
```
http://localhost:8001/
```

### 3. Configuration

#### Media Registry (`examples/exercise-with-all-media-types.json`)
```json
{
  "mediaRegistry": {
    "meditation_guide": {
      "id": "meditation_guide",
      "name": "Meditation Guide PDF",
      "type": "document",
      "file": "docs/meditation-guide.pdf",
      "fileType": "pdf",
      "category": "reference"
    },
    "posture_diagram": {
      "id": "posture_diagram",
      "name": "Posture Guide",
      "type": "image",
      "file": "images/posture.jpg",
      "fileType": "jpg",
      "category": "instruction"
    }
  }
}
```

#### Exercise Configuration
```json
{
  "exercises": {
    "meditation": {
      "id": "meditation",
      "name": "Guided Meditation",
      "audioFiles": [...],
      "videoSources": [...],
      "documentFiles": [
        {
          "mediaId": "meditation_guide",
          "displayTiming": "before",
          "openInNewWindow": true,
          "position": { "x": 100, "y": 100, "width": 800, "height": 600 }
        }
      ],
      "imageFiles": [
        {
          "mediaId": "posture_diagram",
          "displayTiming": "during",
          "displayMode": "sidebar",
          "position": "right",
          "size": "medium"
        }
      ]
    }
  }
}
```

## File Structure

```
generic-wellness-framework/
├── index.html              # Main application (with inline CSS)
├── framework.js            # Core JavaScript logic
├── examples/               # Example configurations
│   ├── exercise-with-all-media-types.json
│   └── pranyammeditation-exercises.json
├── docs/                   # Documentation files (PDF, PPT, TXT, etc.)
│   ├── MEDIA-SUPPORT-GUIDE.md
│   └── [your PDF/PPT files]
├── images/                 # Image files (JPG, PNG, SVG, etc.)
│   └── [your image files]
├── audio/                  # Audio files (MP3, WAV, OGG)
│   └── [your audio files]
└── video/                  # Video files (MP4, WEBM)
    └── [your video files]
```

## Documentation

- **[Media Support Guide](docs/MEDIA-SUPPORT-GUIDE.md)** - Complete guide for documents and images
- **Example Configuration** - See `examples/exercise-with-all-media-types.json`

## Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Features Checklist

- [x] Program management
- [x] Exercise library
- [x] Audio support (multi-track)
- [x] Video support (local + YouTube)
- [x] Document support (PDF, PPT, TXT, DOC, XLS)
- [x] Image support (JPG, PNG, GIF, SVG)
- [x] Dark mode
- [x] Progress tracking
- [x] Voice narration
- [x] Settings management
- [x] Inline CSS (cache-proof)
- [ ] AI Program Generator
- [ ] AI Recommendations
- [ ] Advanced analytics

## Customization

### Changing Theme Colors
Edit the inline CSS in `index.html`:
```css
.header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary {
    background: #667eea;
}
```

### Adding New Media
1. Add media files to appropriate folders (`docs/`, `images/`, etc.)
2. Register in `mediaRegistry` section of your exercise JSON
3. Reference in exercise configuration with timing and display options

## License

This is a generic framework. Customize and use for your specific wellness domain.

## Support

For issues or questions:
1. Check the documentation in `docs/`
2. Review example configurations in `examples/`
3. Inspect browser console for errors

## Version

Current Version: 2.0 (with comprehensive media support)
- Inline CSS for reliability
- 4-type media support (audio, video, documents, images)
- Multiple display modes and timing options
- Window positioning for multi-document workflows
