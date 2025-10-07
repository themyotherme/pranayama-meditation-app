# Media Support Guide - Documents & Images

## Overview
The Generic Wellness Framework now supports **4 types of media** for each exercise:
1. **Audio files** (MP3, WAV, OGG)
2. **Video files** (MP4, WEBM) or YouTube URLs
3. **Documents** (PDF, PPT, PPTX, TXT, DOC, DOCX, XLS, XLSX)
4. **Images** (JPG, JPEG, PNG, GIF, SVG, WEBP)

## Media Registry Structure

### Adding Documents to Media Registry

```json
"meditation_guide": {
  "id": "meditation_guide",
  "name": "Meditation Guide PDF",
  "type": "document",
  "file": "docs/meditation-guide.pdf",
  "fileType": "pdf",
  "category": "reference"
},
"breathing_chart": {
  "id": "breathing_chart",
  "name": "Breathing Patterns Chart",
  "type": "document",
  "file": "docs/breathing-patterns.pptx",
  "fileType": "pptx",
  "category": "educational"
},
"exercise_notes": {
  "id": "exercise_notes",
  "name": "Exercise Notes",
  "type": "document",
  "file": "docs/exercise-notes.txt",
  "fileType": "txt",
  "category": "notes"
}
```

### Adding Images to Media Registry

```json
"chakra_diagram": {
  "id": "chakra_diagram",
  "name": "Chakra Diagram",
  "type": "image",
  "file": "images/chakra-diagram.jpg",
  "fileType": "jpg",
  "width": 1920,
  "height": 1080,
  "category": "reference"
},
"posture_guide": {
  "id": "posture_guide",
  "name": "Correct Posture",
  "type": "image",
  "file": "images/sitting-posture.png",
  "fileType": "png",
  "width": 800,
  "height": 600,
  "category": "instruction"
}
```

## Exercise Configuration

### Using Documents in Exercises

```json
"documentFiles": [
  {
    "mediaId": "meditation_guide",
    "displayTiming": "before",
    "openInNewWindow": true,
    "position": { "x": 100, "y": 100, "width": 800, "height": 600 }
  },
  {
    "mediaId": "breathing_chart",
    "displayTiming": "during",
    "openInNewWindow": true,
    "position": { "x": 900, "y": 100, "width": 600, "height": 800 }
  }
]
```

### Using Images in Exercises

```json
"imageFiles": [
  {
    "mediaId": "chakra_diagram",
    "displayTiming": "before",
    "displayMode": "overlay",
    "position": "center",
    "size": "large",
    "duration": 10
  },
  {
    "mediaId": "posture_guide",
    "displayTiming": "during",
    "displayMode": "sidebar",
    "position": "right",
    "size": "medium"
  }
]
```

## Display Timing Options

- **`before`**: Display before exercise starts (reference material)
- **`during`**: Display during exercise execution
- **`after`**: Display after exercise completes (summary/next steps)
- **`always`**: Display throughout (persistent reference)

## Display Modes

### For Documents:
- **`new-window`**: Opens in new browser window/tab
- **`iframe`**: Embedded in the page (PDF only)
- **`download`**: Triggers download prompt

### For Images:
- **`overlay`**: Full-screen overlay with close button
- **`sidebar`**: Fixed sidebar panel
- **`inline`**: Embedded in content area
- **`popup`**: Modal popup window

## Window Positioning (for new windows)

```json
"position": {
  "x": 100,          // Pixels from left
  "y": 100,          // Pixels from top
  "width": 800,      // Window width
  "height": 600      // Window height
}
```

## File Type Handling

### Supported Document Types:
- **PDF**: Opens in browser (if supported) or new window
- **PPT/PPTX**: Downloads or opens with system default
- **TXT**: Opens in new window with formatting
- **DOC/DOCX**: Downloads or opens with system default
- **XLS/XLSX**: Downloads or opens with system default

### Supported Image Types:
- **JPG/JPEG**: Direct display
- **PNG**: Direct display (supports transparency)
- **GIF**: Direct display (supports animation)
- **SVG**: Direct display (vector graphics)
- **WEBP**: Direct display (modern format)

## Complete Exercise Example

```json
"mindfulness_meditation": {
  "id": "mindfulness_meditation",
  "name": "Mindfulness Meditation",
  "description": "Guided mindfulness practice",
  "type": "meditation",
  "duration": 10,
  "audioFiles": [
    {
      "mediaId": "meditation_music",
      "exerciseStart": 0,
      "playDuration": 600,
      "volume": 50
    }
  ],
  "videoSources": [
    {
      "mediaId": "meditation_video",
      "exerciseStart": 0,
      "playDuration": 600,
      "volume": 60
    }
  ],
  "documentFiles": [
    {
      "mediaId": "meditation_guide",
      "displayTiming": "before",
      "openInNewWindow": true,
      "position": { "x": 100, "y": 100, "width": 800, "height": 600 }
    },
    {
      "mediaId": "progress_tracker",
      "displayTiming": "after",
      "openInNewWindow": false,
      "displayMode": "download"
    }
  ],
  "imageFiles": [
    {
      "mediaId": "chakra_diagram",
      "displayTiming": "before",
      "displayMode": "overlay",
      "position": "center",
      "size": "large",
      "duration": 10
    },
    {
      "mediaId": "posture_guide",
      "displayTiming": "during",
      "displayMode": "sidebar",
      "position": "right",
      "size": "medium"
    }
  ]
}
```

## Best Practices

1. **File Organization**:
   - Store documents in `/docs/` folder
   - Store images in `/images/` folder
   - Use descriptive filenames

2. **File Sizes**:
   - Keep PDFs under 10MB for quick loading
   - Optimize images (JPG quality 80-90%)
   - Use appropriate resolution

3. **User Experience**:
   - Show reference materials "before" exercise
   - Keep visual aids visible "during" exercise
   - Provide summaries/tracking "after" exercise

4. **Accessibility**:
   - Provide text alternatives for images
   - Ensure documents are readable
   - Test on different screen sizes

5. **Performance**:
   - Preload critical images
   - Lazy-load optional documents
   - Use appropriate file formats

## Migration from Old Format

If you have existing exercises, add these new sections:

```json
"documentFiles": [],  // Add if you have PDFs, docs, etc.
"imageFiles": []      // Add if you have reference images
```

Both are optional - only add if needed for your use case.
