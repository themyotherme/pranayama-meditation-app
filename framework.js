// Global Wellness Framework
class WellnessFramework {
    constructor() {
        this.config = null;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.selectedProgram = null;
        this.exercises = null;
        this.programs = null;
        this.isInitialized = false;
        
        // Execution state
        this.isRunning = false;
        this.isPaused = false;
        this.currentProgramData = null;
        this.currentExerciseIndex = 0;
        this.exerciseTimer = null;
        this.elapsedTime = 0;
        
        // Voice narration state
        this.voiceEnabled = true;
        this.voiceVolume = 0.8;
        this.voiceSpeed = 1.0;
        this.currentUtterance = null;
        this.breathingCueTimer = null;
        this.currentBreathPhase = null;
        
        // Background music state
        this.musicEnabled = false;
        this.musicVolume = 0.3;
        this.backgroundMusic = null;
        
        // User profile and statistics
        this.userName = localStorage.getItem('userName') || '';
        this.sessionsCompleted = parseInt(localStorage.getItem('sessionsCompleted') || '0');
        this.totalTimePracticed = parseInt(localStorage.getItem('totalTimePracticed') || '0');
        
        // AI Integration
        this.ai = new AIIntegration();
        
        // Media system
        this.mediaRegistry = null;
        this.activeAudioTracks = [];
        this.activeVideoElement = null;
        this.mediaSchedulers = [];
        
        // Audio system
        this.audioSystem = {
            audioContext: null,
            volume: 0.5,
            isInitialized: false
        };
        
        // Audio management
        this.currentAudioElements = [];
        this.isAudioPaused = false;
        this.audioPauseTime = 0;
        this.audioUnlocked = false; // Track if audio has been unlocked
        
        // Slideshow management
        this.slideshowTimer = null;
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadConfig();
            this.initTheme();
            await this.loadExercises();
            await this.loadPrograms();
            this.setupEventListeners();
            
            // Add event listeners for page unload/refresh
            this.setupPageUnloadHandlers();
            
            // Initialize AI integration
            if (window.AIIntegration) {
                this.ai = new AIIntegration();
                console.log('🤖 AI Integration initialized');
            }
            
            // Register service worker for PWA/offline support
            this.registerServiceWorker();
            
            // Monitor online/offline status
            this.setupOfflineDetection();
            
            // Setup audio system to work on first user interaction
            this.setupAudioInteraction();
            
            // Initialize audio system
            this.initializeAudioSystem();
            
            // Initialize mobile audio compatibility (iOS + Android)
            this.initializeMobileAudio();
            
            this.isInitialized = true;
            console.log('Wellness Framework initialized successfully');
            
            // Add iPhone audio unlock button if needed
            this.addAudioUnlockButton();
        } catch (error) {
            console.error('Framework initialization failed:', error);
        }
    }
    
    // Setup audio system to work on first user interaction
    setupAudioInteraction() {
        const enableAudio = () => {
            if (this.audioUnlocked) return; // Already unlocked
            
            if (!this.audioSystem.audioContext) {
                this.initializeAudioSystem();
            }
            
            // Resume audio context if suspended (iPhone requirement)
            if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
                this.audioSystem.audioContext.resume().then(() => {
                    console.log('🎵 Audio context resumed for iPhone');
                });
            }
            
            // Create a silent audio to unlock the system
            const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
            silentAudio.volume = 0.01;
            silentAudio.play().then(() => {
                silentAudio.pause();
                this.audioUnlocked = true;
                console.log('📱 iPhone audio system unlocked - ONE TIME ONLY');
                
                // Show success message
                this.showNotification('🔊 Audio unlocked! You can now start exercises.', 'success');
            }).catch(err => {
                console.log('Audio unlock failed:', err.message);
            });
            
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
            document.removeEventListener('touchend', enableAudio);
        };
        
        document.addEventListener('click', enableAudio);
        document.addEventListener('touchstart', enableAudio);
        document.addEventListener('touchend', enableAudio);
    }
    
    // Show notification function
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            warning: '#ed8936',
            info: '#4299e1'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    async loadConfig() {
        try {
            const response = await fetch('examples/app-config.json');
            this.config = await response.json();
            console.log('✅ App configuration loaded');
        } catch (error) {
            console.log('Using default configuration');
            this.config = {
                appInfo: {
                    name: "Generic Wellness Framework",
                    description: "A modern, configurable wellness framework",
                    icon: "🧘"
                },
                ui: {
                    programsTitle: "Your Programs",
                    controlsTitle: "Controls",
                    durationLabel: "Desired Program Duration (minutes)",
                    durationHelp: "Scale all exercises proportionally to fit this duration",
                    startButton: "Start Selected Program",
                    clearButton: "Clear Cache",
                    settingsButton: "Settings"
                },
                features: {
                    voiceNarration: true,
                    hapticFeedback: true,
                    darkMode: true,
                    cacheManagement: true
                }
            };
        }
        
        this.updateUI();
    }
    
    updateUI() {
        // Use appInfo instead of app for configuration structure
        const appName = this.config?.appInfo?.name || this.config?.app?.name || 'Generic Wellness Framework';
        document.title = appName;
        
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = `${appName} - AI Powered`;
        }
        
        const appNameElement = document.getElementById('app-name');
        if (appNameElement) appNameElement.textContent = appName;
        
        const programsTitle = document.getElementById('programs-title');
        if (programsTitle) {
            const programsTitleText = this.config?.ui?.programsTitle || 'Wellness Programs';
            programsTitle.textContent = programsTitleText;
        }
        
        // Update programs subtitle
        const programsSubtitle = document.querySelector('#programs-title + p');
        if (programsSubtitle && this.config?.ui?.programsSubtitle) {
            programsSubtitle.innerHTML = `${this.config.ui.programsSubtitle} <button onclick="framework.openAIProgramGenerator()" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; font-weight: 600; text-decoration: none; display: inline-block; margin: 0 0.3rem; font-size: 0.875rem; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">${this.config.ui.aiProgramsButton || '🤖 Create Your AI Programs'}</button>`;
        }
        
        // Note: Controls section has been removed in mobile-first redesign
        // Duration control is now per-program in the detail modal
    }
    
    initTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Apply dark-mode class to body
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        const themeIcon = document.getElementById('theme-toggle');
        if (themeIcon) {
        themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
        }
        
        // Apply automatic contrast detection after theme is set
        setTimeout(() => {
            this.applyAutoContrast('.program-duration, .program-description, .exercise-instructions, .program-name, .exercise-name');
        }, 100);
        
        console.log('🎨 Theme set to:', this.currentTheme);
    }
    
    async loadExercises() {
        try {
            console.log('Loading exercises from JSON...');
            const response = await fetch('examples/pranyammeditation-exercises.json?v=' + Date.now() + '&cache=' + Math.random());
            
            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            // Check if response is actually JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON format');
            }
            
            const data = await response.json();
            console.log('Loaded exercises:', Object.keys(data.exercises || {}));
            console.log('Sample exercise:', data.exercises ? Object.values(data.exercises)[0] : 'No exercises');
            this.exercises = data.exercises;
            this.mediaRegistry = data.mediaRegistry;
            
            // Load AI-generated exercises from localStorage
            const aiExercises = JSON.parse(localStorage.getItem('aiGeneratedExercises') || '{}');
            Object.keys(aiExercises).forEach(exerciseId => {
                this.exercises[exerciseId] = aiExercises[exerciseId];
            });
            
            const defaultCount = Object.keys(data.exercises).length;
            const aiCount = Object.keys(aiExercises).length;
            console.log('Exercises loaded:', defaultCount, 'default +', aiCount, 'AI-generated =', Object.keys(this.exercises).length, 'total');
            console.log('Media registry loaded:', Object.keys(this.mediaRegistry || {}).length, 'media files');
        } catch (error) {
            console.error('Failed to load exercises:', error);
            
            // Try to load from localStorage as fallback
            try {
                const savedExercises = JSON.parse(localStorage.getItem('customExercises') || '{}');
                if (Object.keys(savedExercises).length > 0) {
                    console.log('Loaded exercises from localStorage fallback');
                    this.exercises = savedExercises;
                    this.mediaRegistry = {};
                    return;
                }
            } catch (localError) {
                console.error('Failed to load exercises from localStorage:', localError);
            }
            
            // Fallback to empty objects
            this.exercises = {};
            this.mediaRegistry = {};
            console.log('Using empty exercises fallback');
        }
    }
    
    async loadPrograms() {
        try {
            console.log('Loading programs from JSON...');
            const response = await fetch('examples/pranyammeditation-programs.json?v=' + Date.now() + '&cache=' + Math.random());
            
            // Check if response is ok
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            // Check if response is actually JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON format');
            }
            
            const data = await response.json();
            console.log('Loaded programs:', Object.keys(data.programs || {}));
            console.log('Sample program:', data.programs ? Object.values(data.programs)[0] : 'No programs');
            this.programs = data.programs;
            
            // Load saved AI programs from localStorage
            const savedPrograms = JSON.parse(localStorage.getItem('savedAIPrograms') || '{}');
            Object.keys(savedPrograms).forEach(programId => {
                this.programs[programId] = savedPrograms[programId];
            });
            
            // Load custom programs from localStorage
            const customPrograms = JSON.parse(localStorage.getItem('customPrograms') || '{}');
            Object.keys(customPrograms).forEach(programId => {
                this.programs[programId] = customPrograms[programId];
            });
            
            const totalPrograms = Object.keys(data.programs).length;
            const savedCount = Object.keys(savedPrograms).length;
            console.log('Programs data loaded:', totalPrograms, 'default +', savedCount, 'smart-generated programs');
            
            const programsList = document.getElementById('programs-list');
            programsList.innerHTML = '';
            
            // Filter and sort programs
            let programs = Object.values(this.programs);
            
            // Filter out hidden programs (e.g., test programs)
            programs = programs.filter(program => {
                // Show default programs that are not explicitly hidden
                return program.isDefault !== false && program.hidden !== true;
            });
            
            // Sort programs: "1st Experience" first, then alphabetically
            programs.sort((a, b) => {
                if (a.id === 'first_time_user') return -1;
                if (b.id === 'first_time_user') return 1;
                return a.name.localeCompare(b.name);
            });
            
            programs.forEach(program => {
                const programCard = this.createProgramCard(program);
                programsList.appendChild(programCard);
            });
            
            console.log('Successfully rendered', programs.length, 'total programs (sorted alphabetically with First Experience first)');
        } catch (error) {
            console.error('Failed to load programs:', error);
            
            // Try to load from localStorage as fallback
            try {
                const savedPrograms = JSON.parse(localStorage.getItem('savedAIPrograms') || '{}');
                const customPrograms = JSON.parse(localStorage.getItem('customPrograms') || '{}');
                
                // Merge saved programs
                this.programs = { ...savedPrograms, ...customPrograms };
                
                if (Object.keys(this.programs).length > 0) {
                    console.log('Loaded programs from localStorage fallback');
                    this.renderProgramsList();
                    return;
                }
            } catch (localError) {
                console.error('Failed to load from localStorage:', localError);
            }
            
            // If all else fails, show user-friendly error
            const programsList = document.getElementById('programs-list');
            programsList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <h3>📡 Connection Issue</h3>
                    <p>Unable to load meditation programs. This might be due to:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>Network connectivity issues</li>
                        <li>Server temporarily unavailable</li>
                        <li>Cache needs to be cleared</li>
                    </ul>
                    <button onclick="location.reload()" style="background: #4CAF50; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                        🔄 Try Again
                    </button>
                    <br><br>
                    <button onclick="framework.clearCache()" style="background: #FF9800; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                        🗑️ Clear Cache
                    </button>
                </div>
            `;
        }
    }
    
    renderProgramsList() {
        const programsList = document.getElementById('programs-list');
        programsList.innerHTML = '';
        
        // Filter and sort programs
        let programs = Object.values(this.programs);
        
        // Filter out hidden programs (e.g., test programs)
        programs = programs.filter(program => {
            // Show default programs that are not explicitly hidden
            if (program.hidden !== true) {
                return true;
            }
            return false;
        });
        
        // Sort programs: "First Experience" first, then alphabetically
        programs.sort((a, b) => {
            // Put "First Experience" first
            if (a.name === 'First Experience' && b.name !== 'First Experience') return -1;
            if (b.name === 'First Experience' && a.name !== 'First Experience') return 1;
            
            // Then sort alphabetically
            return a.name.localeCompare(b.name);
        });
        
        // Render program cards
        programs.forEach(program => {
            const programCard = this.createProgramCard(program);
            programsList.appendChild(programCard);
        });
        
        console.log('Successfully rendered', programs.length, 'total programs (sorted alphabetically with First Experience first)');
    }
    
    createProgramCard(program) {
        const card = document.createElement('div');
        card.className = 'program-card';
        card.dataset.programId = program.id;
        card.style.cursor = 'pointer';
        
        // Check if this is an AI-generated program
        const isAIProgram = program.id.includes('ai_program_');
        const isSmartProgram = isAIProgram && program.name && program.name.includes('Smart');
        const aiBadge = isAIProgram ? (isSmartProgram ? '<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; margin-left: 0.5rem;">🧠 Smart</span>' : '<span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; font-weight: 600; margin-left: 0.5rem;">🤖 AI</span>') : '';
        
        card.innerHTML = `
            <div class="program-header">
                <h3 class="program-name">${program.name}${aiBadge}</h3>
                <span class="program-duration">${program.duration} min</span>
            </div>
            <p class="program-description">${program.description}</p>
            <div class="program-meta">
                <span>${program.exercises.length} exercises</span>
                <span style="color: #718096; font-size: 0.75rem;">💡 Click for details • Double-click to start</span>
            </div>
        `;
        
        // Handle single vs double click properly
        let clickTimer = null;
        
        card.addEventListener('click', (e) => {
            if (clickTimer) {
                // This is a double click - clear the single click timer
                clearTimeout(clickTimer);
                clickTimer = null;
                
                // Double click - start program immediately with progress bars
                this.selectProgram(program.id);
                this.startSelectedProgram();
            } else {
                // This might be a single click - wait to see if double click follows
                clickTimer = setTimeout(() => {
                    clickTimer = null;
                    // Confirmed single click - show details only
                    this.showProgramDetail(program.id);
                }, 250);
            }
        });
        
        return card;
    }
    
    selectProgram(programId) {
        document.querySelectorAll('.program-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        const selectedCard = document.querySelector(`[data-program-id="${programId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            this.selectedProgram = programId;
            console.log('Program selected:', programId);
        }
    }
    
    // Simulate session completion (for testing analytics)
    simulateSession(programId, duration = 15) {
        console.log('🧪 Simulating session:', programId, duration + ' minutes');
        this.recordSession(programId, duration, true);
        
        // Show success message
        this.showNotification(`Session completed! ${duration} minutes of ${this.getProgramName(programId)}`, 'success');
    }
    
    // Test bell system
    testBellSystem() {
        console.log('🔔 Testing bell system...');
        
        // Initialize audio system if needed
        if (!this.audioSystem.audioContext) {
            this.initializeAudioSystem();
        }
        
        // Resume audio context if suspended
        if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🔔 Audio context resumed for bells');
                this.playTestBells();
            });
        } else {
            this.playTestBells();
        }
    }
    
    playTestBells() {
        // Test single bell
        this.showBellNotification('🔔 Testing Single Bell');
        this.playBell(1, 'single');
        
        // Test multiple bells after 2 seconds
        setTimeout(() => {
            this.showBellNotification('🔔 Testing 3 Bells');
            this.playBell(3, 'single');
        }, 2000);
        
        // Test continuous bell after 5 seconds
        setTimeout(() => {
            this.showBellNotification('🔔 Testing Continuous Bell');
            this.playBell(0, 'continuous');
        }, 5000);
        
        this.showNotification('🔔 Bell system test started! Listen for the bells...', 'info');
    }
    
    testAudioSystem() {
        console.log('🎵 Testing audio system...');
        
        // Initialize audio system if needed
        if (!this.audioSystem.audioContext) {
            this.initializeAudioSystem();
        }
        
        // Resume audio context if suspended
        if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🎵 Audio context resumed');
                this.playSimpleBeep();
                setTimeout(() => this.playTestAudio(), 2000);
            });
        } else {
            this.playSimpleBeep();
            setTimeout(() => this.playTestAudio(), 2000);
        }
    }
    
    playSimpleBeep() {
        try {
            const audioContext = this.audioSystem.audioContext;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);
            
            console.log('🔊 Simple beep played');
            this.showBellNotification('🔊 Audio test beep');
        } catch (error) {
            console.error('🔊 Beep error:', error);
        }
    }
    
    playTestAudio() {
        // Test different ambient sounds in sequence - including new spiritual sounds
        const ambients = [
            'ocean_waves', 
            'soft_drone', 
            'sitar_music', 
            'om_chanting', 
            'mantra_music', 
            'flute_music'
        ];
        let currentIndex = 0;
        
        const playNextAmbient = () => {
            if (currentIndex < ambients.length) {
                const ambient = ambients[currentIndex];
                console.log(`🎵 Testing ambient: ${ambient}`);
                
                // Use higher volume for testing and play for longer
                this.playBackgroundAmbient(ambient, 0.8);
                
                const displayName = ambient.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                this.showBellNotification(`🎵 Testing: ${displayName}`);
                
                currentIndex++;
                setTimeout(() => {
                    this.stopBackgroundAmbient();
                    setTimeout(playNextAmbient, 2000);
                }, 4000); // Play for 4 seconds each
            } else {
                console.log('🎵 Audio system test complete');
                this.showBellNotification('🎵 Audio system test complete!');
            }
        };
        
        playNextAmbient();
    }
    
    // Quick Start - Launch beginner-friendly program immediately
    quickStart() {
        // Test audio first
        this.testAudioBeforeStart();
        
        // Prioritize beginner-friendly programs for first-time users
        const quickStartPrograms = ['first_time_user', 'quick_session', 'morning_meditation', 'stress_anxiety_relief'];
        let selectedProgram = null;
        
        for (const programId of quickStartPrograms) {
            if (this.programs[programId]) {
                selectedProgram = programId;
                break;
            }
        }
        
        if (!selectedProgram) {
            // Fallback to first available program
            selectedProgram = Object.keys(this.programs)[0];
        }
        
        if (selectedProgram) {
            this.selectedProgram = selectedProgram;
            this.startProgram();
            const programName = this.programs[selectedProgram]?.name || 'meditation';
            this.showNotification(`🚀 Quick Start launched! Enjoy your ${programName} session.`, 'success');
        } else {
            this.showNotification('❌ No programs available for quick start.', 'error');
        }
    }
    
    testAudioBeforeStart() {
        // Test if audio context is working
        if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🎵 Audio context resumed for Quick Start');
            });
        }
        
        // Test Zen music file
        const zenFile = './audio/India_Master_-_Zen_Music_Namast.mp3';
        const testAudio = new Audio(zenFile);
        testAudio.volume = 0.1; // Very low volume for testing
        
        testAudio.play().then(() => {
            console.log('🎵 Zen music test successful');
            testAudio.pause(); // Stop test
        }).catch(error => {
            console.log('🎵 Zen music test failed:', error);
        });
    }
    
    // Show AI Programs section
    showAIPrograms() {
        console.log('🤖 Showing AI Programs panel...');
        // Create AI Programs panel
        const aiProgramsHTML = `
            <div id="ai-programs-panel" class="ai-programs-panel" style="display: block;">
                <div class="ai-programs-header">
                    <h2>🤖 Your AI Programs</h2>
                    <button class="close-btn" onclick="window.framework.hideAIPrograms()">✕</button>
                </div>
                
                <div class="ai-programs-content">
                    <div class="ai-programs-actions">
                        <button class="btn btn-primary" onclick="console.log('Create New AI Program clicked!'); window.framework.openAIProgramGenerator();">
                            🚀 Create New AI Program
                        </button>
                        <button class="btn btn-secondary" onclick="window.framework.exportAIPrograms()">
                            📤 Export AI Programs
                        </button>
                        <button class="btn btn-secondary" onclick="window.framework.importAIPrograms()">
                            📥 Import AI Programs
                        </button>
                    </div>
                    
                    <div class="ai-programs-list" id="ai-programs-list">
                        <div class="empty-state">
                            <div class="empty-icon">🤖</div>
                            <h3>No AI Programs Yet</h3>
                            <p>Create your first AI-powered meditation program!</p>
                            <button class="btn btn-primary" onclick="console.log('Button clicked!'); if (window.framework && window.framework.openAIProgramGenerator) { window.framework.openAIProgramGenerator(); } else { console.error('Framework or function not found!'); alert('AI Program Builder is not available. Please refresh the page.'); }">
                                🚀 Create Your First AI Program
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing panel if any
        const existingPanel = document.getElementById('ai-programs-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        // Add new panel
        document.body.insertAdjacentHTML('beforeend', aiProgramsHTML);
        
        // Add CSS for AI Programs panel
        this.addAIProgramsCSS();
        
        // Load existing AI programs
        this.loadAIPrograms();
    }
    
    hideAIPrograms() {
        const panel = document.getElementById('ai-programs-panel');
        if (panel) {
            panel.remove();
        }
    }
    
    addAIProgramsCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .ai-programs-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 2000;
                overflow-y: auto;
            }
            
            .ai-programs-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 2001;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            }
            
            .ai-programs-header h2 {
                color: #ffffff !important;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                font-weight: 600;
                margin: 0;
            }
            
            .ai-programs-header .close-btn {
                color: #ffffff !important;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
                font-weight: 600;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                padding: 0.5rem;
                transition: background 0.2s ease;
            }
            
            .ai-programs-header .close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .ai-programs-content {
                background: white;
                margin: 0;
                padding: 1rem;
                min-height: calc(100vh - 80px);
            }
            
            .ai-programs-actions {
                display: flex;
                gap: 0.75rem;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            
            .ai-programs-actions .btn {
                flex: 1;
                min-width: 140px;
            }
            
            .ai-programs-list {
                min-height: 400px;
            }
            
            .empty-state {
                text-align: center;
                padding: 3rem 1rem;
                background: #f8f9fa;
                border-radius: 12px;
                border: 2px dashed #dee2e6;
            }
            
            .empty-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            
            .empty-state h3 {
                color: #1a202c !important;
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
                font-weight: 600;
                text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
            }
            
            .empty-state p {
                color: #4a5568 !important;
                margin-bottom: 2rem;
                font-size: 1.1rem;
                font-weight: 500;
                text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .close-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            .btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                text-decoration: none;
                display: inline-block;
                text-align: center;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            
            .btn-secondary {
                background: #6c757d;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #5a6268;
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .ai-programs-actions {
                    flex-direction: column;
                }
                
                .empty-state {
                    padding: 2rem 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    loadAIPrograms() {
        const aiPrograms = this.getAIPrograms();
        const container = document.getElementById('ai-programs-list');
        
        if (aiPrograms.length === 0) {
            // Show empty state (already in HTML)
            return;
        }
        
        // Clear empty state and show programs
        container.innerHTML = '';
        
        aiPrograms.forEach(program => {
            const programCard = document.createElement('div');
            programCard.className = 'ai-program-card';
            programCard.innerHTML = `
                <div class="ai-program-header">
                    <h3>${program.name}</h3>
                    <div class="ai-program-actions">
                        <button class="btn btn-sm btn-primary" onclick="framework.selectProgram('${program.id}')">Select</button>
                        <button class="btn btn-sm btn-secondary" onclick="framework.editAIProgram('${program.id}')">Edit</button>
                    </div>
                </div>
                <p class="ai-program-description">${program.description}</p>
                <div class="ai-program-meta">
                    <span>${program.exercises ? program.exercises.length : 0} exercises</span>
                    <span>•</span>
                    <span>${program.duration || 'Custom'} duration</span>
                </div>
            `;
            container.appendChild(programCard);
        });
    }
    
    // Export only AI programs
    exportAIPrograms() {
        const aiPrograms = this.getAIPrograms();
        
        if (aiPrograms.length === 0) {
            this.showNotification('No AI programs to export. Create some first!', 'info');
            return;
        }
        
        const exportData = {
            version: '2.1',
            exportDate: new Date().toISOString(),
            type: 'AI Programs Only',
            aiPrograms: aiPrograms,
            metadata: {
                totalPrograms: aiPrograms.length,
                exportReason: 'AI Programs backup'
            }
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `ai-programs-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('📤 AI Programs exported successfully');
        this.showNotification(`Exported ${aiPrograms.length} AI programs!`, 'success');
    }
    
    // Import only AI programs
    importAIPrograms() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    this.processAIProgramsImport(importData);
                } catch (error) {
                    console.error('❌ Error parsing import file:', error);
                    this.showNotification('Invalid file format. Please select a valid AI programs backup.', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
    
    processAIProgramsImport(importData) {
        try {
            // Validate data structure
            if (!importData.aiPrograms || !Array.isArray(importData.aiPrograms)) {
                throw new Error('Invalid AI programs file format');
            }
            
            const existingPrograms = this.getAIPrograms();
            const newPrograms = importData.aiPrograms.filter(program => 
                !existingPrograms.some(existing => existing.id === program.id)
            );
            
            if (newPrograms.length === 0) {
                this.showNotification('No new AI programs to import. All programs already exist.', 'info');
                return;
            }
            
            // Import new AI programs
            const allPrograms = [...existingPrograms, ...newPrograms];
            localStorage.setItem('ai_programs', JSON.stringify(allPrograms));
            
            console.log('📥 AI Programs import completed:', newPrograms.length, 'programs imported');
            this.showNotification(`Imported ${newPrograms.length} AI programs!`, 'success');
            
            // Refresh the AI programs list
            this.loadAIPrograms();
            
        } catch (error) {
            console.error('❌ Error processing AI programs import:', error);
            this.showNotification('Error importing AI programs. Please check the file format.', 'error');
        }
    }
    
    showProgramDetail(programId) {
        const program = this.programs[programId];
        if (!program) {
            console.error('Program not found:', programId);
            return;
        }
        
        // Store current program for later use
        this.selectedProgram = programId;
        
        // Update modal content
        document.getElementById('program-detail-title').textContent = program.name;
        document.getElementById('program-detail-description').textContent = program.description;
        
        // Calculate total duration
        const totalDuration = program.exercises.reduce((sum, exerciseRef) => {
            const exerciseId = typeof exerciseRef === 'string' ? exerciseRef : exerciseRef.exerciseId;
            const exercise = this.exercises[exerciseId];
            return sum + (exercise ? exercise.duration : 5); // Default 5 minutes if not found
        }, 0);
        const durationText = `${totalDuration} min`;
        
        document.getElementById('program-detail-total-duration').textContent = durationText;
        document.getElementById('program-detail-exercise-count').textContent = program.exercises.length;
        document.getElementById('program-detail-duration').value = totalDuration || program.duration || 12;
        
        // List exercises
        const exercisesContainer = document.getElementById('program-detail-exercises');
        exercisesContainer.innerHTML = '';
        
        program.exercises.forEach((exerciseRef, index) => {
            // Handle both string IDs and object references
            const exerciseId = typeof exerciseRef === 'string' ? exerciseRef : exerciseRef.exerciseId;
            const exercise = this.exercises[exerciseId];
            const exerciseName = exercise ? exercise.name : exerciseId;
            const exerciseDuration = exercise ? exercise.duration : 5; // Default 5 minutes if not found
            const exerciseDurationText = `${exerciseDuration}m`;
            
            const exerciseItem = document.createElement('div');
            exerciseItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f7fafc; border-radius: 6px; border: 1px solid #e2e8f0;';
            exerciseItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">${index + 1}</span>
                    <span style="color: #2d3748; font-weight: 500;">${exerciseName}</span>
                </div>
                <span style="color: #718096; font-size: 0.875rem;">${exerciseDurationText}</span>
            `;
            exercisesContainer.appendChild(exerciseItem);
        });
        
        // Update modal footer - add delete button for AI programs
        const modalFooter = document.querySelector('#program-detail-modal .modal-footer');
        const isAIProgram = programId.includes('ai_program_');
        
        if (isAIProgram) {
            modalFooter.innerHTML = `
                <button class="btn btn-danger" onclick="framework.deleteAIProgram('${programId}')" style="margin-right: auto;">🗑️ Delete</button>
                <button class="btn btn-primary" onclick="framework.startProgramFromDetail()" style="flex: 1;">▶️ Start Program</button>
                <button class="btn btn-secondary" onclick="framework.closeProgramDetail()">Cancel</button>
            `;
        } else {
            modalFooter.innerHTML = `
                <button class="btn btn-primary" onclick="framework.startProgramFromDetail()" style="flex: 1;">▶️ Start Program</button>
                <button class="btn btn-warning" onclick="framework.simulateSession(framework.selectedProgram, 15)" style="margin-right: 10px;">🧪 Test Session</button>
                <button class="btn btn-info" onclick="framework.testBellSystem()" style="margin-right: 10px;">🔔 Test Bells</button>
                <button class="btn btn-success" onclick="framework.testAudioSystem()" style="margin-right: 10px;">🎵 Test Audio</button>
                <button class="btn btn-secondary" onclick="framework.closeProgramDetail()">Cancel</button>
            `;
        }
        
        // Show modal
        const modal = document.getElementById('program-detail-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
        
        // Ensure buttons are visible
        setTimeout(() => {
            const footer = modal.querySelector('.modal-footer');
            if (footer) {
                footer.style.display = 'flex !important';
                footer.style.visibility = 'visible !important';
                footer.style.opacity = '1 !important';
                footer.style.flexWrap = 'wrap';
                footer.style.gap = '0.5rem';
                
                // Force all buttons to be visible
                const buttons = footer.querySelectorAll('.btn');
                buttons.forEach(btn => {
                    btn.style.display = 'inline-block !important';
                    btn.style.visibility = 'visible !important';
                    btn.style.opacity = '1 !important';
                });
            }
        }, 100);
    }
    
    makePanelDraggable(panelId) {
        const panel = document.getElementById(panelId);
        if (!panel) return;
        
        const header = panel.querySelector('.analytics-header, .panel-header');
        if (!header) return;
        
        header.style.cursor = 'move';
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = panel.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            panel.style.position = 'fixed';
            panel.style.left = initialX + 'px';
            panel.style.top = initialY + 'px';
            panel.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            panel.style.left = (initialX + dx) + 'px';
            panel.style.top = (initialY + dy) + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                panel.style.cursor = 'auto';
            }
        });
    }
    
    makeModalDraggable(modal) {
        const content = modal.querySelector('.modal-content');
        if (!content) return;
        
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        const header = content.querySelector('.modal-header');
        if (!header) return;
        
        header.style.cursor = 'move';
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            content.classList.add('dragging');
            startX = e.clientX;
            startY = e.clientY;
            const rect = content.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            content.style.left = (initialX + deltaX) + 'px';
            content.style.top = (initialY + deltaY) + 'px';
            content.style.position = 'fixed';
            content.style.margin = '0';
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                content.classList.remove('dragging');
            }
        });
    }
    
    closeProgramDetail() {
        document.getElementById('program-detail-modal').style.display = 'none';
    }
    
    
    setupEventListeners() {
        // Header buttons
        const hamburgerBtn = document.getElementById('hamburger-btn');
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', () => {
                console.log('🍔 Hamburger clicked');
                this.toggleMenu();
            });
            console.log('✅ Hamburger button listener added');
        } else {
            console.warn('❌ Hamburger button not found');
        }
        
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                console.log('🏠 Home clicked');
                this.goHome();
            });
            console.log('✅ Home button listener added');
        } else {
            console.warn('❌ Home button not found');
        }
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                console.log('🌙 Theme toggle clicked');
                this.toggleTheme();
            });
            console.log('✅ Theme toggle listener added');
        } else {
            console.warn('❌ Theme toggle not found');
        }
    }
    
    openExerciseEditor() {
        document.getElementById('exercise-json-editor').value = JSON.stringify({
            "id": "new_exercise",
            "name": "New Exercise",
            "description": "Description here",
            "type": "breathing",
            "duration": 5,
            "pattern": {
                "inhale": 4,
                "hold": 0,
                "exhale": 4
            },
            "instructions": "Instructions here",
            "voiceEnabled": true
        }, null, 2);
        
        const modal = document.getElementById('exercise-editor-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.initTheme();
    }
    
    startProgram(customDuration) {
        if (!this.selectedProgram) {
            alert('Please select a program first');
            return;
        }
        
        if (this.isRunning) {
            console.log('Program already running');
            return;
        }
        
        console.log('Starting program:', this.selectedProgram);
        
        // Get program data
        this.currentProgramData = this.programs[this.selectedProgram];
        if (!this.currentProgramData) {
            alert('Program data not found');
            return;
        }
        
        // Scale duration if custom duration provided
        if (customDuration && customDuration > 0) {
            const originalTotalDuration = this.currentProgramData.exercises.reduce((sum, ex) => sum + ex.duration, 0);
            const customTotalSeconds = customDuration * 60;
            const scaleFactor = customTotalSeconds / originalTotalDuration;
            
            console.log(`Scaling program from ${Math.floor(originalTotalDuration/60)} minutes to ${customDuration} minutes (factor: ${scaleFactor.toFixed(2)})`);
            
            // Create a scaled copy of the program
            this.currentProgramData = {
                ...this.currentProgramData,
                exercises: this.currentProgramData.exercises.map(ex => ({
                    ...ex,
                    duration: Math.round(ex.duration * scaleFactor)
                }))
            };
        }
        
        // Show execution view
        this.showExecutionView();
        
        // Start background music if enabled
        if (this.musicEnabled) {
            this.startBackgroundMusic();
        }
        
        // Start first exercise
        this.currentExerciseIndex = 0;
        this.isRunning = true;
        this.startExercise();
    }
    
    startSelectedProgram() {
        // Alias for double-click functionality
        this.startProgram();
    }
    
    showExecutionView() {
        // Hide programs section
        document.querySelector('.programs-section').style.display = 'none';
        
        // Create execution view
        const mainContainer = document.querySelector('.main-container');
        const executionView = document.createElement('div');
        executionView.id = 'execution-view';
        executionView.className = 'execution-view';
        executionView.style.display = 'block';
        executionView.style.padding = '2rem';
        executionView.style.background = '#ffffff';
        executionView.style.borderRadius = '12px';
        executionView.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        
        executionView.innerHTML = `
            <div class="execution-header" style="margin-bottom: 2rem; text-align: center;">
                <h2 id="program-name" style="font-size: 1.875rem; font-weight: 600; color: #1a202c; margin-bottom: 0.5rem;">${this.currentProgramData.name}</h2>
                <p id="program-description" style="color: #4a5568; font-size: 1rem;">${this.currentProgramData.description}</p>
            </div>
            
            <div class="exercise-display" style="margin: 3rem 0; text-align: center;">
                <h1 id="exercise-name" style="font-size: 2.5rem; font-weight: 700; color: #667eea; margin-bottom: 1rem;">Loading...</h1>
                
                <!-- Video Player -->
                <div id="video-container" style="max-width: 800px; margin: 1rem auto; display: none;">
                    <video id="exercise-video" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" controls></video>
                </div>
                
                <!-- YouTube Player -->
                <div id="youtube-container" style="max-width: 800px; margin: 1rem auto; display: none;">
                    <iframe id="youtube-player" style="width: 100%; height: 450px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                
                <!-- Slideshow Container -->
                <div id="slideshow-container" style="max-width: 600px; margin: 1rem auto; display: none; position: relative; background: #f8f9fa;">
                    <div id="slideshow-image-wrapper" style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                        <img id="slideshow-image" src="" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
                    </div>
                </div>
                
                <div id="breathing-cue" style="font-size: 3rem; font-weight: 700; color: #764ba2; margin: 1rem 0; min-height: 60px; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; transform: scale(1);"></div>
                <div id="exercise-timer" class="timer" style="font-size: 4rem; font-weight: 700; color: #1a202c; margin: 2rem 0; font-family: 'Courier New', monospace;">0:00</div>
                <p id="exercise-instructions" style="color: #4a5568; font-size: 1.125rem; max-width: 600px; margin: 1rem auto; line-height: 1.6;"></p>
            </div>
            
            <div class="progress-container" style="margin: 2rem auto; max-width: 800px;">
                <div style="margin-bottom: 0.5rem; color: #718096; font-size: 0.875rem; display: flex; justify-content: space-between;">
                    <span>Overall Program Progress</span>
                    <span id="program-time-display">0:00 / 0:00</span>
                </div>
                <div id="segmented-progress" class="segmented-progress" style="width: 100%; height: 50px; background: #e2e8f0; border-radius: 8px; overflow: hidden; border: 2px solid #cbd5e0; display: flex; cursor: pointer;">
                    <!-- Exercise segments will be inserted here -->
                </div>
                
                <div style="margin-top: 1.5rem; margin-bottom: 0.5rem; color: #718096; font-size: 0.875rem; display: flex; justify-content: space-between;">
                    <span>Current Exercise Progress</span>
                    <span id="exercise-time-display">0:00 / 0:00</span>
                </div>
                <div class="exercise-progress-bar" style="width: 100%; height: 12px; background: #e2e8f0; border-radius: 6px; overflow: hidden; border: 2px solid #cbd5e0;">
                    <div id="exercise-progress-fill" style="height: 100%; background: linear-gradient(135deg, #667eea, #764ba2); width: 0%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            
            <div class="exercise-info" style="color: #718096; font-size: 1rem; margin: 1rem 0; text-align: center;">
                <span id="exercise-counter" style="font-weight: 600; color: #1a202c;">Exercise 1 of ${this.currentProgramData.exercises.length}</span>
            </div>
            
            <div class="execution-controls" style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button class="btn btn-warning" id="pause-btn" onclick="framework.pauseProgram()" style="padding: 0.75rem 1.5rem;">⏸️ Pause</button>
                <button class="btn btn-danger" id="stop-btn" onclick="framework.stopProgram()" style="padding: 0.75rem 1.5rem;">⏹️ Stop</button>
            </div>
            
            ${!this.audioUnlocked ? `
            <div style="text-align: center; margin-top: 1rem; padding: 1rem; background: #f0f8ff; border-radius: 8px; border: 2px dashed #4CAF50;">
                <p style="margin: 0 0 1rem 0; color: #666;">📱 iPhone Audio Unlock Required</p>
                <button onclick="framework.unlockAudio()" style="background: #4CAF50; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; font-size: 1rem;">
                    🔊 Tap to Unlock Audio (One Time Only)
                </button>
            </div>
            ` : ''}
        `;
        
        mainContainer.appendChild(executionView);
        console.log('Execution view created');
        
        // Create segmented progress bar
        this.createSegmentedProgress();
        
        // Add click handler for seeking
        document.getElementById('segmented-progress').addEventListener('click', (e) => {
            this.seekToPosition(e);
        });
    }
    
    createSegmentedProgress() {
        const segmentedProgress = document.getElementById('segmented-progress');
        const totalDuration = this.currentProgramData.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        
        this.currentProgramData.exercises.forEach((exerciseRef, index) => {
            const exercise = this.exercises[exerciseRef.exerciseId];
            const percentage = (exerciseRef.duration / totalDuration) * 100;
            const durationMins = Math.floor(exerciseRef.duration / 60);
            const durationSecs = exerciseRef.duration % 60;
            const durationText = durationSecs > 0 ? `${durationMins}:${durationSecs.toString().padStart(2, '0')}` : `${durationMins}m`;
            
            const segment = document.createElement('div');
            segment.className = 'progress-segment';
            segment.dataset.exerciseIndex = index;
            segment.style.width = percentage + '%';
            segment.style.height = '100%';
            segment.style.background = '#cbd5e0';
            segment.style.borderRight = '1px solid #e2e8f0';
            segment.style.position = 'relative';
            segment.style.transition = 'background 0.3s ease';
            segment.style.cursor = 'pointer';
            
            // Enhanced tooltip with name and duration
            const exerciseName = exercise ? exercise.name : 'Exercise ' + (index + 1);
            segment.title = `${exerciseName}\nDuration: ${durationText}\nClick to jump to this exercise`;
            
            // Add hover effect
            segment.addEventListener('mouseenter', () => {
                if (index !== this.currentExerciseIndex) {
                    segment.style.background = '#a0aec0';
                }
            });
            segment.addEventListener('mouseleave', () => {
                if (index !== this.currentExerciseIndex) {
                    segment.style.background = '#cbd5e0';
                }
            });
            
            // Add inner fill for completed portion
            const fill = document.createElement('div');
            fill.className = 'segment-fill';
            fill.dataset.segmentIndex = index;
            fill.style.width = '0%';
            fill.style.height = '100%';
            fill.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            fill.style.transition = 'width 0.3s ease';
            fill.style.pointerEvents = 'none';
            
            segment.appendChild(fill);
            
            // Add exercise name label if segment is wide enough
            if (percentage > 8) {
                const label = document.createElement('div');
                label.className = 'segment-label';
                // Smart truncation based on available width
                const maxChars = Math.floor(percentage / 1.2); // Roughly 1 char per 1.2% width
                label.textContent = exercise ? this.truncateText(exercise.name, maxChars) : `Ex ${index + 1}`;
                label.style.cssText = `
                    position: absolute;
                    top: 35%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #2d3748;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 95%;
                    pointer-events: none;
                    text-shadow: 0 1px 2px rgba(255,255,255,0.8);
                    z-index: 1;
                `;
                segment.appendChild(label);
                
                // Add duration label below exercise name
                const durationLabel = document.createElement('div');
                durationLabel.className = 'segment-duration-label';
                durationLabel.textContent = durationText;
                durationLabel.style.cssText = `
                    position: absolute;
                    top: 72%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 0.65rem;
                    font-weight: 500;
                    color: #718096;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 1;
                `;
                segment.appendChild(durationLabel);
            } else if (percentage > 4) {
                // For smaller segments, show exercise number and duration
                const label = document.createElement('div');
                label.className = 'segment-label';
                label.textContent = `${index + 1}`;
                label.style.cssText = `
                    position: absolute;
                    top: 35%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 0.7rem;
                    font-weight: bold;
                    color: #2d3748;
                    pointer-events: none;
                    z-index: 1;
                `;
                segment.appendChild(label);
                
                // Add duration below
                const durationLabel = document.createElement('div');
                durationLabel.className = 'segment-duration-label';
                durationLabel.textContent = durationText;
                durationLabel.style.cssText = `
                    position: absolute;
                    top: 72%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 0.6rem;
                    color: #718096;
                    pointer-events: none;
                    z-index: 1;
                `;
                segment.appendChild(durationLabel);
            } else if (percentage > 2) {
                // Very small segments - just show number
                const label = document.createElement('div');
                label.className = 'segment-label';
                label.textContent = `${index + 1}`;
                label.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 0.6rem;
                    font-weight: bold;
                    color: #4a5568;
                    pointer-events: none;
                    z-index: 1;
                `;
                segment.appendChild(label);
            }
            
            segmentedProgress.appendChild(segment);
        });
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 1) + '…';
    }
    
    seekToPosition(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        
        // Calculate which exercise this corresponds to
        const totalDuration = this.currentProgramData.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const targetTime = percentage * totalDuration;
        
        let accumulatedTime = 0;
        for (let i = 0; i < this.currentProgramData.exercises.length; i++) {
            const exerciseDuration = this.currentProgramData.exercises[i].duration;
            if (accumulatedTime + exerciseDuration >= targetTime) {
                // Jump to this exercise
                const timeIntoExercise = targetTime - accumulatedTime;
                this.jumpToExercise(i, Math.floor(timeIntoExercise));
                break;
            }
            accumulatedTime += exerciseDuration;
        }
    }
    
    jumpToExercise(exerciseIndex, startTime = 0) {
        if (exerciseIndex < 0 || exerciseIndex >= this.currentProgramData.exercises.length) {
            return;
        }
        
        // Stop current exercise and breathing cues
        if (this.exerciseTimer) {
            clearInterval(this.exerciseTimer);
        }
        this.stopBreathingCues();
        
        // Clear all segment fills (reset progress bar)
        for (let i = 0; i < this.currentProgramData.exercises.length; i++) {
            const fill = document.querySelector(`.segment-fill[data-segment-index="${i}"]`);
            if (fill) {
                fill.style.width = '0%';
            }
        }
        
        // Update index and elapsed time
        this.currentExerciseIndex = exerciseIndex;
        this.elapsedTime = startTime;
        
        // Start the new exercise
        this.startExercise();
    }
    
    startExercise() {
        if (this.currentExerciseIndex >= this.currentProgramData.exercises.length) {
            this.completeProgram();
            return;
        }
        
        const exerciseRef = this.currentProgramData.exercises[this.currentExerciseIndex];
        const exercise = this.exercises[exerciseRef.exerciseId];
        
        if (!exercise) {
            console.error('Exercise not found:', exerciseRef.exerciseId);
            this.currentExerciseIndex++;
            this.startExercise();
            return;
        }
        
        console.log('Starting exercise:', exercise.name, 'Duration:', exerciseRef.duration, 'seconds');
        
        // Update UI
        document.getElementById('exercise-name').textContent = exercise.name;
        document.getElementById('exercise-instructions').textContent = exercise.description || '';
        document.getElementById('exercise-counter').textContent = 
            `Exercise ${this.currentExerciseIndex + 1} of ${this.currentProgramData.exercises.length}`;
        
        // Apply automatic contrast to exercise elements
        setTimeout(() => {
            this.applyAutoContrast('#exercise-name, #exercise-instructions, #exercise-counter');
        }, 50);
        
        // Start timer
        this.elapsedTime = 0;
        const duration = exerciseRef.duration;
        
        // Show "before" documents and images
        this.startExerciseDocuments(exercise, 'before');
        this.startExerciseImages(exercise, 'before');
        
        // Start exercise audio and video
        this.startExerciseMedia(exercise);
        
        // Show "during" documents and images
        this.startExerciseDocuments(exercise, 'during');
        this.startExerciseImages(exercise, 'during');
        
        // Speak exercise instructions at start (if voice enabled for this exercise)
        if (exercise.voiceEnabled !== false) {
            this.speakExerciseInstructions(exercise);
        }
        
        // Start breathing cues if this is a breathing exercise
        if (exercise.pattern && exercise.pattern.inhale) {
            setTimeout(() => {
                this.startBreathingCues(exercise.pattern);
            }, 5000); // Wait 5 seconds after instructions
        }
        
        // Auto-start slideshow if exercise has images
        if (exercise.imageSlideshow && exercise.imageSlideshow.length > 0) {
            // Stop any existing slideshow first
            if (typeof this.stopSlideshow === 'function') {
                this.stopSlideshow();
            }
            setTimeout(() => {
                this.startSlideshow(exercise.id);
            }, 2000); // Start slideshow 2 seconds after exercise begins
        } else {
            // If no slideshow for this exercise, make sure to stop any existing one
            if (typeof this.stopSlideshow === 'function') {
                this.stopSlideshow();
            }
        }
        
        this.exerciseTimer = setInterval(() => {
            this.elapsedTime++;
            this.updateTimer(duration - this.elapsedTime);
            this.updateProgress();
            
            if (this.elapsedTime >= duration) {
                this.finishExercise();
            }
        }, 1000);
    }
    
    updateTimer(remainingSeconds) {
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        const timerDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('exercise-timer').textContent = timerDisplay;
    }
    
    updateProgress() {
        const totalDuration = this.currentProgramData.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const currentExerciseDuration = this.currentProgramData.exercises[this.currentExerciseIndex].duration;
        
        // Update current exercise progress bar
        const exerciseProgress = (this.elapsedTime / currentExerciseDuration) * 100;
        const exerciseProgressFill = document.getElementById('exercise-progress-fill');
        if (exerciseProgressFill) {
            exerciseProgressFill.style.width = exerciseProgress.toFixed(1) + '%';
        }
        
        // Update segmented progress bar
        // Reset all segments to default background first
        document.querySelectorAll('.progress-segment').forEach((seg, idx) => {
            if (idx < this.currentExerciseIndex) {
                // Completed segments - slightly darker
                seg.style.background = '#a0aec0';
            } else if (idx === this.currentExerciseIndex) {
                // Current segment - highlighted
                seg.style.background = '#90cdf4';
            } else {
                // Future segments - default
                seg.style.background = '#cbd5e0';
            }
        });
        
        // Fill completed segments
        for (let i = 0; i < this.currentExerciseIndex; i++) {
            const fill = document.querySelector(`.segment-fill[data-segment-index="${i}"]`);
            if (fill) fill.style.width = '100%';
        }
        
        // Fill current segment partially
        const currentFill = document.querySelector(`.segment-fill[data-segment-index="${this.currentExerciseIndex}"]`);
        if (currentFill) {
            currentFill.style.width = exerciseProgress.toFixed(1) + '%';
        }
        
        // Update time displays
        let totalElapsed = 0;
        for (let i = 0; i < this.currentExerciseIndex; i++) {
            totalElapsed += this.currentProgramData.exercises[i].duration;
        }
        totalElapsed += this.elapsedTime;
        
        const programTimeDisplay = document.getElementById('program-time-display');
        if (programTimeDisplay) {
            programTimeDisplay.textContent = this.formatTime(totalElapsed) + ' / ' + this.formatTime(totalDuration);
        }
        
        const exerciseTimeDisplay = document.getElementById('exercise-time-display');
        if (exerciseTimeDisplay) {
            exerciseTimeDisplay.textContent = this.formatTime(this.elapsedTime) + ' / ' + this.formatTime(currentExerciseDuration);
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins + ':' + secs.toString().padStart(2, '0');
    }
    
    finishExercise() {
        clearInterval(this.exerciseTimer);
        this.stopBreathingCues();
        this.stopAllExerciseMedia();
        
        // Stop slideshow when exercise finishes
        if (typeof this.stopSlideshow === 'function') {
            this.stopSlideshow();
        }
        
        // Show "after" documents and images for the completed exercise
        const exerciseRef = this.currentProgramData.exercises[this.currentExerciseIndex];
        const exercise = this.exercises[exerciseRef.exerciseId];
        if (exercise) {
            this.startExerciseDocuments(exercise, 'after');
            this.startExerciseImages(exercise, 'after');
        }
        
        this.currentExerciseIndex++;
        
        if (this.currentExerciseIndex < this.currentProgramData.exercises.length) {
            setTimeout(() => this.startExercise(), 1000);
        } else {
            this.completeProgram();
        }
    }
    
    pauseProgram() {
        if (this.exerciseTimer && !this.isPaused) {
            clearInterval(this.exerciseTimer);
            this.exerciseTimer = null;
            this.isPaused = true;
            this.stopBreathingCues();
            
            // Pause all audio elements
            this.pauseAllAudioElements();
            
            // Pause video elements
            this.pauseAllVideoElements();
            
            // Pause slideshow
            this.pauseSlideshow();
            
            // Store pause time for resume
            this.pauseStartTime = Date.now();
            
            document.getElementById('pause-btn').textContent = '▶️ Resume';
            document.getElementById('pause-btn').onclick = () => this.resumeProgram();
            
            console.log('⏸️ Program paused');
        }
    }
    
    resumeProgram() {
        if (this.isPaused) {
            const exerciseRef = this.currentProgramData.exercises[this.currentExerciseIndex];
            const exercise = this.exercises[exerciseRef.exerciseId];
            const duration = exerciseRef.duration;
            
            // Resume all audio elements
            this.resumeAllAudioElements();
            
            // Resume video elements
            this.resumeAllVideoElements();
            
            // Resume slideshow
            this.resumeSlideshow();
            
            // Restart breathing cues if this is a breathing exercise
            if (exercise.pattern && exercise.pattern.inhale) {
                this.startBreathingCues(exercise.pattern);
            }
            
            this.isPaused = false;
            this.exerciseTimer = setInterval(() => {
                this.elapsedTime++;
                this.updateTimer(duration - this.elapsedTime);
                this.updateProgress();
                
                if (this.elapsedTime >= duration) {
                    this.finishExercise();
                }
            }, 1000);
            
            document.getElementById('pause-btn').textContent = '⏸️ Pause';
            document.getElementById('pause-btn').onclick = () => this.pauseProgram();
            
            console.log('▶️ Program resumed');
        }
    }
    
    stopProgram() {
        if (confirm('Are you sure you want to stop this program?')) {
            clearInterval(this.exerciseTimer);
            this.stopBreathingCues();
            this.stopBackgroundMusic();
            this.stopAllExerciseMedia();
            this.isRunning = false;
            this.isPaused = false;
            this.hideExecutionView();
        }
    }
    
    // Pause all audio elements
    pauseAllAudioElements() {
        // Pause background music
        if (this.backgroundMusic && !this.backgroundMusic.paused) {
            this.backgroundMusic.pause();
            this.backgroundMusic.dataset.wasPlaying = 'true';
            this.backgroundMusic.dataset.pauseTime = this.backgroundMusic.currentTime;
        }
        
        // Pause all active audio tracks
        this.activeAudioTracks.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
                audio.dataset.wasPlaying = 'true';
                audio.dataset.pauseTime = audio.currentTime;
            }
        });
        
        // Pause current audio elements
        this.currentAudioElements.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
                audio.dataset.wasPlaying = 'true';
                audio.dataset.pauseTime = audio.currentTime;
            }
        });
        
        // Pause speech synthesis
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
        
        console.log('🔇 All audio elements paused');
    }
    
    // Resume all audio elements
    resumeAllAudioElements() {
        // Resume background music
        if (this.backgroundMusic && this.backgroundMusic.dataset.wasPlaying === 'true') {
            this.backgroundMusic.currentTime = parseFloat(this.backgroundMusic.dataset.pauseTime || 0);
            this.backgroundMusic.play().catch(err => console.log('Could not resume background music:', err.message));
            delete this.backgroundMusic.dataset.wasPlaying;
            delete this.backgroundMusic.dataset.pauseTime;
        }
        
        // Resume all active audio tracks
        this.activeAudioTracks.forEach(audio => {
            if (audio.dataset.wasPlaying === 'true') {
                audio.currentTime = parseFloat(audio.dataset.pauseTime || 0);
                audio.play().catch(err => console.log('Could not resume audio track:', err.message));
                delete audio.dataset.wasPlaying;
                delete audio.dataset.pauseTime;
            }
        });
        
        // Resume current audio elements
        this.currentAudioElements.forEach(audio => {
            if (audio.dataset.wasPlaying === 'true') {
                audio.currentTime = parseFloat(audio.dataset.pauseTime || 0);
                audio.play().catch(err => console.log('Could not resume audio element:', err.message));
                delete audio.dataset.wasPlaying;
                delete audio.dataset.pauseTime;
            }
        });
        
        // Resume speech synthesis
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
        
        console.log('🔊 All audio elements resumed');
    }
    
    // Pause all video elements
    pauseAllVideoElements() {
        const videoElement = document.getElementById('exercise-video');
        if (videoElement && !videoElement.paused) {
            videoElement.pause();
            videoElement.dataset.wasPlaying = 'true';
            videoElement.dataset.pauseTime = videoElement.currentTime;
        }
        
        // Pause any other video elements
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            if (!video.paused) {
                video.pause();
                video.dataset.wasPlaying = 'true';
                video.dataset.pauseTime = video.currentTime;
            }
        });
        
        console.log('🎬 All video elements paused');
    }
    
    // Resume all video elements
    resumeAllVideoElements() {
        const videoElement = document.getElementById('exercise-video');
        if (videoElement && videoElement.dataset.wasPlaying === 'true') {
            videoElement.currentTime = parseFloat(videoElement.dataset.pauseTime || 0);
            videoElement.play().catch(err => console.log('Could not resume video:', err.message));
            delete videoElement.dataset.wasPlaying;
            delete videoElement.dataset.pauseTime;
        }
        
        // Resume any other video elements
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            if (video.dataset.wasPlaying === 'true') {
                video.currentTime = parseFloat(video.dataset.pauseTime || 0);
                video.play().catch(err => console.log('Could not resume video:', err.message));
                delete video.dataset.wasPlaying;
                delete video.dataset.pauseTime;
            }
        });
        
        console.log('🎬 All video elements resumed');
    }
    
    // Pause slideshow
    pauseSlideshow() {
        // Store current slideshow state
        const slideshowContainer = document.getElementById('slideshow-container');
        if (slideshowContainer) {
            const currentImage = slideshowContainer.querySelector('img');
            if (currentImage) {
                slideshowContainer.dataset.pausedImage = currentImage.src;
                slideshowContainer.dataset.wasSlideshowActive = 'true';
            }
        }
        
        // Clear any slideshow timers
        if (this.slideshowTimer) {
            clearInterval(this.slideshowTimer);
            this.slideshowTimer = null;
        }
        
        console.log('🖼️ Slideshow paused');
    }
    
    // Resume slideshow
    resumeSlideshow() {
        const slideshowContainer = document.getElementById('slideshow-container');
        if (slideshowContainer && slideshowContainer.dataset.wasSlideshowActive === 'true') {
            // Restart slideshow with current exercise
            const exerciseRef = this.currentProgramData.exercises[this.currentExerciseIndex];
            const exercise = this.exercises[exerciseRef.exerciseId];
            
            if (exercise.images && exercise.images.length > 0) {
                this.startSlideshow(exercise.images);
            }
            
            delete slideshowContainer.dataset.wasSlideshowActive;
        }
        
        console.log('🖼️ Slideshow resumed');
    }
    
    completeProgram() {
        clearInterval(this.exerciseTimer);
        this.stopBreathingCues();
        this.isRunning = false;
        
        // Update statistics
        const programDuration = this.currentProgramData.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        this.sessionsCompleted++;
        this.totalTimePracticed += programDuration;
        
        localStorage.setItem('sessionsCompleted', this.sessionsCompleted);
        localStorage.setItem('totalTimePracticed', this.totalTimePracticed);
        
        // Save to session history
        const history = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
        history.push({
            programId: this.currentProgramData.id,
            programName: this.currentProgramData.name,
            duration: Math.round(programDuration / 60),
            date: new Date().toISOString()
        });
        localStorage.setItem('sessionHistory', JSON.stringify(history));
        
        console.log('Statistics updated:', {
            sessionsCompleted: this.sessionsCompleted,
            totalTimePracticed: this.totalTimePracticed + ' seconds'
        });
        
        // Congratulations message with stats
        const minutes = Math.round(programDuration / 60);
        const totalMinutes = Math.round(this.totalTimePracticed / 60);
        let message = 'Congratulations' + (this.userName ? ' ' + this.userName : '') + '!\n\n';
        message += 'You completed: ' + this.currentProgramData.name + '\n';
        message += 'Duration: ' + minutes + ' minutes\n\n';
        message += 'Total sessions: ' + this.sessionsCompleted + '\n';
        message += 'Total practice time: ' + totalMinutes + ' minutes';
        
        alert(message);
        this.stopBackgroundMusic();
        this.stopAllExerciseMedia();
        this.hideExecutionView();
    }
    
    hideExecutionView() {
        const executionView = document.getElementById('execution-view');
        if (executionView) {
            executionView.remove();
        }
        
        document.querySelector('.programs-section').style.display = 'block';
    }
    
    speakExerciseInstructions(exercise) {
        if (!this.voiceEnabled || !('speechSynthesis' in window)) {
            return;
        }
        
        // PA System: Pause all background media during instructions
        this.pauseAllMediaDuringInstructions();
        
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Use exercise-specific voice settings if available
        const voiceRate = exercise.voiceRate || this.voiceSpeed;
        const voiceLanguage = exercise.voiceLanguage || 'en-US';
        
        // Speak exercise name
        const nameUtterance = new SpeechSynthesisUtterance(exercise.name);
        nameUtterance.rate = voiceRate * 0.9;
        nameUtterance.volume = this.voiceVolume;
        nameUtterance.lang = voiceLanguage;
        
        // Speak instructions after name
        if (exercise.instructions) {
            const instructionsUtterance = new SpeechSynthesisUtterance(exercise.instructions);
            instructionsUtterance.rate = voiceRate * 0.85;
            instructionsUtterance.volume = this.voiceVolume * 0.9;
            instructionsUtterance.lang = voiceLanguage;
            
            nameUtterance.onend = () => {
                setTimeout(() => {
                    window.speechSynthesis.speak(instructionsUtterance);
                }, 500);
            };
            
            // PA System: Resume media after instructions complete
            instructionsUtterance.onend = () => {
                setTimeout(() => {
                    this.resumeAllMediaAfterInstructions();
                }, 1000);
            };
        } else {
            // Resume if no instructions
            nameUtterance.onend = () => {
                setTimeout(() => {
                    this.resumeAllMediaAfterInstructions();
                }, 1000);
            };
        }
        
        window.speechSynthesis.speak(nameUtterance);
        console.log('🛩️ PA System: Speaking instructions, media paused');
    }
    
    pauseAllMediaDuringInstructions() {
        // Reduce volume of background music
        if (this.backgroundMusic && !this.backgroundMusic.paused) {
            this.backgroundMusic.dataset = this.backgroundMusic.dataset || {};
            this.backgroundMusic.dataset.originalVolume = this.backgroundMusic.volume;
            this.backgroundMusic.volume = this.backgroundMusic.volume * 0.2; // 20% during voice
            console.log('🛩️ PA System: Background music volume reduced');
        }
        
        // Pause/reduce active audio tracks
        this.activeAudioTracks.forEach(audio => {
            if (!audio.paused) {
                audio.dataset = audio.dataset || {};
                audio.dataset.originalVolume = audio.volume;
                audio.volume = audio.volume * 0.2; // 20% during voice
            }
        });
        
        // Pause video if playing
        const videoElement = document.getElementById('exercise-video');
        if (videoElement && !videoElement.paused) {
            videoElement.dataset.wasPlaying = 'true';
            videoElement.pause();
            console.log('🛩️ PA System: Video paused for instructions');
        }
        
        // Pause YouTube if present
        const youtubePlayer = document.getElementById('youtube-player');
        if (youtubePlayer && youtubePlayer.src) {
            // YouTube can't be controlled easily, but we've reduced other audio
            console.log('🛩️ PA System: YouTube playing (cannot pause iframe)');
        }
    }
    
    resumeAllMediaAfterInstructions() {
        // Restore background music volume
        if (this.backgroundMusic && this.backgroundMusic.dataset && this.backgroundMusic.dataset.originalVolume) {
            this.backgroundMusic.volume = parseFloat(this.backgroundMusic.dataset.originalVolume);
            delete this.backgroundMusic.dataset.originalVolume;
            console.log('🛩️ PA System: Background music volume restored');
        }
        
        // Restore audio track volumes
        this.activeAudioTracks.forEach(audio => {
            if (audio.dataset && audio.dataset.originalVolume) {
                audio.volume = parseFloat(audio.dataset.originalVolume);
                delete audio.dataset.originalVolume;
            }
        });
        
        // Resume video if it was playing
        const videoElement = document.getElementById('exercise-video');
        if (videoElement && videoElement.dataset.wasPlaying === 'true') {
            videoElement.play().catch(err => console.log('Could not resume video:', err.message));
            delete videoElement.dataset.wasPlaying;
            console.log('🛩️ PA System: Video resumed');
        }
        
        console.log('🛩️ PA System: All media resumed after instructions');
    }
    
    startBreathingCues(pattern) {
        if (!this.voiceEnabled || !pattern || !('speechSynthesis' in window)) {
            return;
        }
        
        // Clear any existing breathing cue timer
        if (this.breathingCueTimer) {
            clearInterval(this.breathingCueTimer);
        }
        
        const cycleTime = (pattern.inhale + pattern.hold + pattern.exhale) * 1000;
        let phaseStartTime = Date.now();
        let currentPhase = 'inhale';
        
        // Function to speak and display the current breathing phase
        const speakPhase = (phase) => {
            if (!this.isRunning) return;
            
            // Voice narration
            const utterance = new SpeechSynthesisUtterance(phase);
            utterance.rate = this.voiceSpeed;
            utterance.volume = this.voiceVolume * 0.8;
            utterance.pitch = phase === 'inhale' ? 1.2 : (phase === 'hold' ? 1.0 : 0.8);
            
            window.speechSynthesis.cancel(); // Cancel previous to avoid overlap
            window.speechSynthesis.speak(utterance);
            
            // Visual cue - flash on screen
            const breathingCueElement = document.getElementById('breathing-cue');
            if (breathingCueElement) {
                breathingCueElement.textContent = phase.toUpperCase();
                breathingCueElement.style.opacity = '1';
                breathingCueElement.style.transform = 'scale(1.1)';
                
                // Set color based on phase
                if (phase === 'Inhale') {
                    breathingCueElement.style.color = '#22c55e'; // Green - taking in energy
                } else if (phase === 'Hold') {
                    breathingCueElement.style.color = '#f59e0b'; // Amber - retention
                } else if (phase === 'Exhale') {
                    breathingCueElement.style.color = '#3b82f6'; // Blue - release
                }
                
                // Fade out after a moment
                setTimeout(() => {
                    if (breathingCueElement) {
                        breathingCueElement.style.opacity = '0.4';
                        breathingCueElement.style.transform = 'scale(1)';
                    }
                }, 800);
            }
            
            this.currentBreathPhase = phase;
            console.log('Breathing cue:', phase);
        };
        
        // Start with inhale
        speakPhase('Inhale');
        
        // Set up the breathing cycle timer
        this.breathingCueTimer = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(this.breathingCueTimer);
                return;
            }
            
            const elapsed = (Date.now() - phaseStartTime) / 1000;
            
            // Determine current phase
            if (elapsed < pattern.inhale) {
                if (currentPhase !== 'inhale') {
                    currentPhase = 'inhale';
                    speakPhase('Inhale');
                }
            } else if (elapsed < pattern.inhale + pattern.hold) {
                if (currentPhase !== 'hold' && pattern.hold > 0) {
                    currentPhase = 'hold';
                    speakPhase('Hold');
                }
            } else if (elapsed < pattern.inhale + pattern.hold + pattern.exhale) {
                if (currentPhase !== 'exhale') {
                    currentPhase = 'exhale';
                    speakPhase('Exhale');
                }
            } else {
                // Cycle complete, restart
                phaseStartTime = Date.now();
                currentPhase = 'inhale';
                speakPhase('Inhale');
            }
        }, 100); // Check every 100ms for smooth transitions
    }
    
    stopBreathingCues() {
        if (this.breathingCueTimer) {
            clearInterval(this.breathingCueTimer);
            this.breathingCueTimer = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        
        // Clear visual cue
        const breathingCueElement = document.getElementById('breathing-cue');
        if (breathingCueElement) {
            breathingCueElement.textContent = '';
            breathingCueElement.style.opacity = '0';
        }
    }
    
    startBackgroundMusic() {
        // Create audio element for background music
        if (!this.backgroundMusic) {
            this.backgroundMusic = new Audio();
            this.backgroundMusic.loop = true;
            
            // Use a gentle meditation track
            // You can add actual audio files to assets/ folder
            this.backgroundMusic.src = 'assets/meditation-background.mp3';
        }
        
        this.backgroundMusic.volume = this.musicVolume;
        this.backgroundMusic.play().catch(err => {
            console.log('Background music autoplay prevented:', err.message);
            // Silently handle autoplay restrictions
        });
    }
    
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
    }
    
    startExerciseMedia(exercise) {
        // Stop any existing media
        this.stopAllExerciseMedia();
        
        // Start audio tracks
        if (exercise.audioFiles && exercise.audioFiles.length > 0) {
            exercise.audioFiles.forEach((audioConfig, index) => {
                if (audioConfig.mediaId && this.mediaRegistry[audioConfig.mediaId]) {
                    this.scheduleAudioTrack(audioConfig, index);
                }
            });
        }
        
        // Start video if available
        if (exercise.videoSources && exercise.videoSources.length > 0) {
            const videoConfig = exercise.videoSources[0]; // Use first video
            if (videoConfig.file) {
                this.startVideo(videoConfig);
            }
        }
    }
    
    scheduleAudioTrack(audioConfig, trackIndex) {
        const media = this.mediaRegistry[audioConfig.mediaId];
        if (!media || !media.file) return;
        
        // Schedule audio to start at specified time
        const scheduler = setTimeout(() => {
            const audio = new Audio(media.file);
            audio.volume = (audioConfig.volume / 100) * (this.musicEnabled ? this.musicVolume : 0.5);
            audio.currentTime = audioConfig.fileStart || 0;
            
            // Get exercise duration
            const exerciseDuration = this.currentProgramData.exercises[this.currentExerciseIndex].duration;
            
            // Set up looping - always loop if exercise is longer than 2 minutes
            // This ensures audio continues for the entire exercise duration
            audio.loop = true;
            console.log(`🔄 Audio will loop: ${media.name} for exercise duration (${exerciseDuration}s)`);
            
            // Play the audio
            audio.play().catch(err => console.log('Audio autoplay prevented:', err.message));
            
            // Stop audio when exercise ends (not after playDuration)
            const stopTime = (audioConfig.exerciseStart + exerciseDuration) * 1000;
            setTimeout(() => {
                if (audio && !audio.paused) {
                    audio.pause();
                    console.log(`🛑 Stopped audio: ${media.name} after exercise duration`);
                }
            }, stopTime);
            
            this.activeAudioTracks.push(audio);
            console.log('Started audio track:', media.name, 'at', audioConfig.exerciseStart, 'seconds');
        }, audioConfig.exerciseStart * 1000);
        
        this.mediaSchedulers.push(scheduler);
    }
    
    startVideo(videoConfig) {
        if (!videoConfig.file) return;
        
        // Check if it's a YouTube URL
        const isYouTube = videoConfig.file.includes('youtube.com') || videoConfig.file.includes('youtu.be');
        
        if (isYouTube) {
            this.startYouTubeVideo(videoConfig);
        } else {
            this.startLocalVideo(videoConfig);
        }
    }
    
    startLocalVideo(videoConfig) {
        const videoContainer = document.getElementById('video-container');
        const videoElement = document.getElementById('exercise-video');
        const youtubeContainer = document.getElementById('youtube-container');
        
        if (youtubeContainer) youtubeContainer.style.display = 'none';
        
        if (videoContainer && videoElement) {
            videoElement.src = videoConfig.file;
            videoElement.currentTime = videoConfig.fileStart || 0;
            videoElement.volume = (videoConfig.volume / 100) || 0.8;
            
            // Set up looping for the entire exercise duration
            const exerciseDuration = this.currentProgramData.exercises[this.currentExerciseIndex].duration;
            
            // Always loop video to ensure it continues for the entire exercise
            videoElement.loop = true;
            console.log(`🔄 Video will loop: ${videoConfig.file} for exercise duration (${exerciseDuration}s)`);
            
            videoContainer.style.display = 'block';
            
            // Schedule video to start
            setTimeout(() => {
                videoElement.play().catch(err => console.log('Video autoplay prevented:', err.message));
            }, videoConfig.exerciseStart * 1000);
            
            // Stop video when exercise ends
            const stopTime = (videoConfig.exerciseStart + exerciseDuration) * 1000;
            setTimeout(() => {
                if (videoElement && !videoElement.paused) {
                    videoElement.pause();
                    console.log(`🛑 Stopped video: ${videoConfig.file} after exercise duration`);
                }
            }, stopTime);
            
            this.activeVideoElement = videoElement;
            console.log('Local video scheduled to start at:', videoConfig.exerciseStart, 'seconds');
        }
    }
    
    startYouTubeVideo(videoConfig) {
        const youtubeContainer = document.getElementById('youtube-container');
        const youtubePlayer = document.getElementById('youtube-player');
        const videoContainer = document.getElementById('video-container');
        
        if (videoContainer) videoContainer.style.display = 'none';
        
        if (youtubeContainer && youtubePlayer) {
            // Extract YouTube video ID
            let videoId = '';
            if (videoConfig.file.includes('youtube.com/watch?v=')) {
                videoId = videoConfig.file.split('v=')[1].split('&')[0];
            } else if (videoConfig.file.includes('youtu.be/')) {
                videoId = videoConfig.file.split('youtu.be/')[1].split('?')[0];
            }
            
            // Build YouTube embed URL with start time
            const startTime = videoConfig.fileStart || 0;
            const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0`;
            
            youtubeContainer.style.display = 'block';
            
            // Schedule to set the iframe src
            setTimeout(() => {
                youtubePlayer.src = embedUrl;
            }, videoConfig.exerciseStart * 1000);
            
            console.log('YouTube video scheduled:', videoId, 'start at:', videoConfig.exerciseStart, 'seconds');
        }
    }
    
    stopAllExerciseMedia() {
        // Stop all active audio tracks
        this.activeAudioTracks.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        this.activeAudioTracks = [];
        
        // Clear all schedulers
        this.mediaSchedulers.forEach(scheduler => clearTimeout(scheduler));
        this.mediaSchedulers = [];
        
        // Stop and hide local video
        const videoElement = document.getElementById('exercise-video');
        const videoContainer = document.getElementById('video-container');
        if (videoElement) {
            videoElement.pause();
            videoElement.src = '';
        }
        if (videoContainer) {
            videoContainer.style.display = 'none';
        }
        
        // Stop and hide YouTube video
        const youtubePlayer = document.getElementById('youtube-player');
        const youtubeContainer = document.getElementById('youtube-container');
        if (youtubePlayer) {
            youtubePlayer.src = '';
        }
        if (youtubeContainer) {
            youtubeContainer.style.display = 'none';
        }
        
        this.activeVideoElement = null;
        
        // Close any document windows
        this.closeDocumentWindows();
        
        // Hide any active images
        this.hideExerciseImages();
    }
    
    // Document handling
    startExerciseDocuments(exercise, timing) {
        if (!exercise.documentFiles || exercise.documentFiles.length === 0) return;
        
        // Filter documents by display timing
        const relevantDocs = exercise.documentFiles.filter(doc => doc.displayTiming === timing);
        
        relevantDocs.forEach(docConfig => {
            const media = this.mediaRegistry[docConfig.mediaId];
            if (!media || !media.file) return;
            
            this.displayDocument(media, docConfig);
        });
    }
    
    displayDocument(media, config) {
        const fileType = (media.fileType || media.file.split('.').pop()).toLowerCase();
        
        if (config.openInNewWindow || config.openInNewWindow === undefined) {
            // Open in new window
            this.openDocumentWindow(media, config);
        } else if (config.displayMode === 'iframe' && fileType === 'pdf') {
            // Embed PDF in iframe
            this.embedDocument(media, config);
        } else if (config.displayMode === 'download') {
            // Trigger download
            this.downloadDocument(media);
        } else {
            // Default: open in new window
            this.openDocumentWindow(media, config);
        }
    }
    
    openDocumentWindow(media, config) {
        const pos = config.position || { x: 100, y: 100, width: 800, height: 600 };
        const features = `left=${pos.x},top=${pos.y},width=${pos.width},height=${pos.height},resizable=yes,scrollbars=yes`;
        
        const windowRef = window.open(media.file, `doc_${media.id}`, features);
        
        if (!this.documentWindows) {
            this.documentWindows = [];
        }
        this.documentWindows.push(windowRef);
        
        console.log(`📄 Opened document: ${media.name} (${media.fileType})`);
    }
    
    embedDocument(media, config) {
        // Create iframe container
        const container = document.createElement('div');
        container.id = `doc-embed-${media.id}`;
        container.style.cssText = 'position: fixed; top: 50px; right: 20px; width: 400px; height: 600px; background: white; border: 2px solid #667eea; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1500; overflow: hidden;';
        
        // Add header
        const header = document.createElement('div');
        header.style.cssText = 'padding: 10px; background: #667eea; color: white; display: flex; justify-content: space-between; align-items: center;';
        header.innerHTML = `
            <span style="font-weight: 600;">${media.name}</span>
            <button onclick="document.getElementById('doc-embed-${media.id}').remove()" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
        `;
        
        // Add iframe
        const iframe = document.createElement('iframe');
        iframe.src = media.file;
        iframe.style.cssText = 'width: 100%; height: calc(100% - 50px); border: none;';
        
        container.appendChild(header);
        container.appendChild(iframe);
        document.body.appendChild(container);
        
        console.log(`📄 Embedded document: ${media.name}`);
    }
    
    downloadDocument(media) {
        const link = document.createElement('a');
        link.href = media.file;
        link.download = media.name + '.' + media.fileType;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log(`💾 Downloaded document: ${media.name}`);
    }
    
    closeDocumentWindows() {
        if (this.documentWindows) {
            this.documentWindows.forEach(win => {
                if (win && !win.closed) {
                    win.close();
                }
            });
            this.documentWindows = [];
        }
        
        // Remove embedded documents
        document.querySelectorAll('[id^="doc-embed-"]').forEach(el => el.remove());
    }
    
    // Image handling
    startExerciseImages(exercise, timing) {
        if (!exercise.imageFiles || exercise.imageFiles.length === 0) return;
        
        // Filter images by display timing
        const relevantImages = exercise.imageFiles.filter(img => img.displayTiming === timing);
        
        relevantImages.forEach(imgConfig => {
            const media = this.mediaRegistry[imgConfig.mediaId];
            if (!media || !media.file) return;
            
            this.displayImage(media, imgConfig);
        });
    }
    
    displayImage(media, config) {
        const displayMode = config.displayMode || 'overlay';
        
        switch (displayMode) {
            case 'overlay':
                this.showImageOverlay(media, config);
                break;
            case 'sidebar':
                this.showImageSidebar(media, config);
                break;
            case 'inline':
                this.showImageInline(media, config);
                break;
            case 'popup':
                this.showImagePopup(media, config);
                break;
            default:
                this.showImageOverlay(media, config);
        }
    }
    
    showImageOverlay(media, config) {
        const overlay = document.createElement('div');
        overlay.id = `img-overlay-${media.id}`;
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); z-index: 2000; display: flex; flex-direction: column; align-items: center; justify-content: center;';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; background: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3);';
        closeBtn.onclick = () => overlay.remove();
        
        // Add image
        const img = document.createElement('img');
        img.src = media.file;
        img.alt = media.name;
        img.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain;';
        
        // Add caption
        const caption = document.createElement('div');
        caption.textContent = media.name;
        caption.style.cssText = 'color: white; font-size: 1.25rem; margin-top: 20px; text-align: center;';
        
        overlay.appendChild(closeBtn);
        overlay.appendChild(img);
        overlay.appendChild(caption);
        document.body.appendChild(overlay);
        
        // Auto-close after duration if specified
        if (config.duration) {
            setTimeout(() => overlay.remove(), config.duration * 1000);
        }
        
        console.log(`🖼️ Displayed image overlay: ${media.name}`);
    }
    
    showImageSidebar(media, config) {
        const position = config.position || 'right';
        const size = config.size || 'medium';
        
        const widths = { small: '200px', medium: '300px', large: '400px' };
        const width = widths[size] || '300px';
        
        const sidebar = document.createElement('div');
        sidebar.id = `img-sidebar-${media.id}`;
        sidebar.style.cssText = `position: fixed; top: 70px; ${position}: 10px; width: ${width}; background: white; border: 2px solid #667eea; border-radius: 8px; padding: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1500;`;
        
        // Add header
        const header = document.createElement('div');
        header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;';
        header.innerHTML = `
            <span style="font-weight: 600; color: #1a202c;">${media.name}</span>
            <button onclick="document.getElementById('img-sidebar-${media.id}').remove()" style="background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #4a5568;">&times;</button>
        `;
        
        // Add image
        const img = document.createElement('img');
        img.src = media.file;
        img.alt = media.name;
        img.style.cssText = 'width: 100%; height: auto; border-radius: 4px;';
        
        sidebar.appendChild(header);
        sidebar.appendChild(img);
        document.body.appendChild(sidebar);
        
        console.log(`🖼️ Displayed image sidebar: ${media.name}`);
    }
    
    showImageInline(media, config) {
        const executionView = document.getElementById('execution-view');
        if (!executionView) return;
        
        const container = document.createElement('div');
        container.id = `img-inline-${media.id}`;
        container.style.cssText = 'margin: 20px 0; text-align: center;';
        
        const img = document.createElement('img');
        img.src = media.file;
        img.alt = media.name;
        img.style.cssText = 'max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);';
        
        const caption = document.createElement('div');
        caption.textContent = media.name;
        caption.style.cssText = 'margin-top: 10px; color: #4a5568; font-size: 0.875rem;';
        
        container.appendChild(img);
        container.appendChild(caption);
        executionView.appendChild(container);
        
        console.log(`🖼️ Displayed inline image: ${media.name}`);
    }
    
    showImagePopup(media, config) {
        const popup = document.createElement('div');
        popup.id = `img-popup-${media.id}`;
        popup.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); z-index: 2000; max-width: 600px;';
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: #e53e3e; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 1.25rem; cursor: pointer;';
        closeBtn.onclick = () => popup.remove();
        
        // Add title
        const title = document.createElement('h3');
        title.textContent = media.name;
        title.style.cssText = 'margin: 0 0 15px 0; color: #1a202c;';
        
        // Add image
        const img = document.createElement('img');
        img.src = media.file;
        img.alt = media.name;
        img.style.cssText = 'width: 100%; height: auto; border-radius: 8px;';
        
        popup.appendChild(closeBtn);
        popup.appendChild(title);
        popup.appendChild(img);
        document.body.appendChild(popup);
        
        // Auto-close after duration if specified
        if (config.duration) {
            setTimeout(() => popup.remove(), config.duration * 1000);
        }
        
        console.log(`🖼️ Displayed image popup: ${media.name}`);
    }
    
    hideExerciseImages() {
        // Remove all image displays
        document.querySelectorAll('[id^="img-overlay-"], [id^="img-sidebar-"], [id^="img-inline-"], [id^="img-popup-"]').forEach(el => el.remove());
    }
    
    clearCache() {
        if (confirm('Clear all cached data? This will reload the page.')) {
            localStorage.clear();
            sessionStorage.clear();
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => caches.delete(name));
                });
            }
            location.reload();
        }
    }
    
    openSettings() {
        // Load current settings from localStorage
        this.voiceEnabled = localStorage.getItem('voiceEnabled') !== 'false';
        this.voiceVolume = parseFloat(localStorage.getItem('voiceVolume') || '0.8');
        this.voiceSpeed = parseFloat(localStorage.getItem('voiceSpeed') || '1.0');
        this.musicEnabled = localStorage.getItem('musicEnabled') === 'true';
        this.musicVolume = parseFloat(localStorage.getItem('musicVolume') || '0.3');
        this.userName = localStorage.getItem('userName') || '';
        
        // Update modal values
        document.getElementById('voice-enabled').checked = this.voiceEnabled;
        document.getElementById('voice-volume').value = this.voiceVolume * 100;
        document.getElementById('voice-volume-display').textContent = Math.round(this.voiceVolume * 100) + '%';
        document.getElementById('voice-speed').value = this.voiceSpeed * 100;
        document.getElementById('voice-speed-display').textContent = this.voiceSpeed.toFixed(1) + 'x';
        document.getElementById('music-enabled').checked = this.musicEnabled;
        document.getElementById('music-volume').value = this.musicVolume * 100;
        document.getElementById('music-volume-display').textContent = Math.round(this.musicVolume * 100) + '%';
        document.getElementById('user-name').value = this.userName;
        document.getElementById('sessions-completed').textContent = this.sessionsCompleted;
        document.getElementById('total-time-practiced').textContent = Math.round(this.totalTimePracticed / 60) + ' minutes';
        
        // Load AI settings
        const apiKey = localStorage.getItem('openaiAPIKey') || '';
        const aiEnabled = localStorage.getItem('aiEnabled') === 'true';
        const aiModel = localStorage.getItem('aiModel') || 'gpt-3.5-turbo';
        
        document.getElementById('openai-api-key').value = apiKey;
        document.getElementById('ai-enabled').checked = aiEnabled;
        document.getElementById('ai-model').value = aiModel;
        
        // Auto-enable AI if API key is present but AI is not enabled
        if (apiKey && !aiEnabled) {
            document.getElementById('ai-enabled').checked = true;
            this.showNotification('🔑 API key detected! AI features have been automatically enabled.', 'info');
        }
        
        // Setup real-time slider updates
        document.getElementById('voice-volume').oninput = (e) => {
            document.getElementById('voice-volume-display').textContent = e.target.value + '%';
        };
        document.getElementById('voice-speed').oninput = (e) => {
            const speed = (e.target.value / 100).toFixed(1);
            document.getElementById('voice-speed-display').textContent = speed + 'x';
        };
        document.getElementById('music-volume').oninput = (e) => {
            document.getElementById('music-volume-display').textContent = e.target.value + '%';
        };
        
        // Auto-enable AI when API key is entered
        document.getElementById('openai-api-key').oninput = (e) => {
            if (e.target.value.trim() && !document.getElementById('ai-enabled').checked) {
                document.getElementById('ai-enabled').checked = true;
                this.showNotification('🔑 API key entered! AI features have been automatically enabled.', 'info');
            }
        };
        
        // Show modal
        const modal = document.getElementById('settings-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeSettings() {
        document.getElementById('settings-modal').style.display = 'none';
    }
    
    saveSettings() {
        // Get values from modal
        this.voiceEnabled = document.getElementById('voice-enabled').checked;
        this.voiceVolume = parseInt(document.getElementById('voice-volume').value) / 100;
        this.voiceSpeed = parseInt(document.getElementById('voice-speed').value) / 100;
        this.musicEnabled = document.getElementById('music-enabled').checked;
        this.musicVolume = parseInt(document.getElementById('music-volume').value) / 100;
        this.userName = document.getElementById('user-name').value;
        
        // Save AI settings
        const apiKey = document.getElementById('openai-api-key').value;
        const aiEnabled = document.getElementById('ai-enabled').checked;
        const aiModel = document.getElementById('ai-model').value;
        
        localStorage.setItem('openaiAPIKey', apiKey);
        localStorage.setItem('aiEnabled', aiEnabled);
        localStorage.setItem('aiModel', aiModel);
        
        // Update AI integration instance
        if (this.ai) {
            this.ai.setAPIKey(apiKey);
            this.ai.setEnabled(aiEnabled);
            this.ai.setModel(aiModel);
            console.log('🔧 AI Integration updated:', {
                enabled: this.ai.enabled,
                apiKeyLength: this.ai.apiKey?.length || 0,
                model: this.ai.model,
                isConfigured: this.ai.isConfigured()
            });
        }
        
        // Save to localStorage
        localStorage.setItem('voiceEnabled', this.voiceEnabled);
        localStorage.setItem('voiceVolume', this.voiceVolume);
        localStorage.setItem('voiceSpeed', this.voiceSpeed);
        localStorage.setItem('musicEnabled', this.musicEnabled);
        localStorage.setItem('musicVolume', this.musicVolume);
        localStorage.setItem('userName', this.userName);
        
        console.log('Settings saved:', {
            voiceEnabled: this.voiceEnabled,
            voiceVolume: this.voiceVolume,
            voiceSpeed: this.voiceSpeed,
            musicEnabled: this.musicEnabled,
            musicVolume: this.musicVolume,
            userName: this.userName
        });
        
        // Apply music settings
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.musicVolume;
        }
        
        this.closeSettings();
        alert('Settings saved successfully!');
    }
    
    async testAIConnection() {
        if (!this.ai) {
            alert('❌ AI Integration not available');
            return;
        }
        
        const apiKey = document.getElementById('openai-api-key').value;
        if (!apiKey) {
            alert('⚠️ Please enter your OpenAI API key first!');
            return;
        }
        
        // Temporarily set the key for testing
        this.ai.setAPIKey(apiKey);
        
        const btn = event.target;
        btn.disabled = true;
        btn.textContent = '🔄 Testing...';
        
        try {
            const result = await this.ai.testConnection();
            
            if (result.success) {
                alert(`✅ AI Connection Successful!\n\nModel: ${result.model}\n\nYou can now use AI features.`);
            } else {
                alert(`❌ Connection Failed\n\nError: ${result.message}\n\nPlease check your API key.`);
            }
        } catch (error) {
            alert(`❌ Connection Failed\n\nError: ${error.message}`);
        } finally {
            btn.disabled = false;
            btn.textContent = '🔌 Test AI Connection';
        }
    }
    
    // ============================================
    // ADMIN TOOLS - Generic Management System
    // ============================================
    
    openProgramManager() {
        const content = document.getElementById('program-manager-content');
        content.innerHTML = '<h3 style="color: #1a202c; margin-bottom: 1rem;" class="program-manager-title">All Programs</h3>';
        
        const programsArray = Object.values(this.programs);
        programsArray.forEach((program, index) => {
            const programItem = document.createElement('div');
            programItem.style.cssText = 'background: #f8f9fa; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;';
            programItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <h4 style="color: #1a202c; margin-bottom: 0.5rem; font-weight: 600; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${program.name}</h4>
                        <p style="color: #1a202c; font-size: 0.875rem; margin-bottom: 0.5rem; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${program.description}</p>
                        <p style="color: #4a5568; font-size: 0.875rem; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${program.exercises.length} exercises • ${program.duration} min</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="framework.editProgram('${program.id}')">✏️ Edit</button>
                        <button class="btn btn-danger" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="framework.deleteProgram('${program.id}')">🗑️ Delete</button>
                    </div>
                </div>
            `;
            content.appendChild(programItem);
        });
        
        const modal = document.getElementById('program-manager-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
        
        this.addProgramManagerCSS();
    }
    
    addProgramManagerCSS() {
        if (document.getElementById('program-manager-css')) return;
        
        const style = document.createElement('style');
        style.id = 'program-manager-css';
        style.textContent = `
            .program-manager-title {
                color: #1a202c !important;
            }
            
            .dark-mode .program-manager-title {
                color: #f7fafc !important;
            }
            
            .dark-mode .program-manager-content {
                background: #2d3748 !important;
            }
            
            .dark-mode .program-manager-content h3 {
                color: #f7fafc !important;
            }
            
            .dark-mode .program-manager-content h4 {
                color: #f7fafc !important;
            }
            
            .dark-mode .program-manager-content p {
                color: #cbd5e0 !important;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    closeProgramManager() {
        document.getElementById('program-manager-modal').style.display = 'none';
    }
    
    editProgram(programId) {
        this.currentEditingProgramId = programId;
        const program = this.programs[programId];
        
        // Fill in program details
        document.getElementById('edit-program-name').value = program.name;
        document.getElementById('edit-program-desc').value = program.description;
        
        // Show exercises with checkboxes
        const editor = document.getElementById('program-exercises-editor');
        editor.innerHTML = '';
        
        // Sort exercises alphabetically by name
        const allExercises = Object.values(this.exercises).sort((a, b) => a.name.localeCompare(b.name));
        allExercises.forEach((exercise, index) => {
            const isSelected = program.exercises.some(ex => ex.exerciseId === exercise.id);
            const selectedDuration = program.exercises.find(ex => ex.exerciseId === exercise.id)?.duration || exercise.duration * 60;
            // Only show order for selected exercises, leave completely blank for unselected ones
            const selectedOrder = isSelected ? (program.exercises.find(ex => ex.exerciseId === exercise.id)?.order || '') : '';
            
            const item = document.createElement('div');
            item.style.cssText = 'background: #ffffff; padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 6px; border: 1px solid #e2e8f0;';
            item.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" class="exercise-checkbox-edit" data-exercise-id="${exercise.id}" ${isSelected ? 'checked' : ''} style="width: 18px; height: 18px;">
                    <div style="flex: 1;">
                        <strong style="color: #1a202c; font-weight: 600; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${exercise.name}</strong>
                        <span style="color: #4a5568; font-size: 0.875rem; margin-left: 0.5rem; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${exercise.duration} min</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <label style="font-size: 0.75rem; color: #1a202c; white-space: nowrap; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">Order:</label>
                        <input type="text" class="exercise-order-edit" data-exercise-id="${exercise.id}" value="${selectedOrder}" style="width: 50px; padding: 0.25rem; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.875rem; color: #1a202c; font-weight: 500; ${isSelected ? '' : 'background: #f7fafc;'}" placeholder="${isSelected ? '1' : ''}" title="Enter order (1, 2, 3 or 1A, 1B, etc.)" ${isSelected ? '' : 'readonly'}>
                        <label style="font-size: 0.75rem; color: #1a202c; white-space: nowrap; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">Duration:</label>
                        <input type="number" class="exercise-duration-edit" data-exercise-id="${exercise.id}" value="${Math.round(selectedDuration / 60)}" min="1" max="60" style="width: 50px; padding: 0.25rem; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.875rem; color: #1a202c; font-weight: 500;" placeholder="min">
                    </div>
                </div>
            `;
            editor.appendChild(item);
        });
        
        // Add event listeners for checkbox changes to handle order field clearing
        document.querySelectorAll('.exercise-checkbox-edit').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const exerciseId = this.dataset.exerciseId;
                const orderInput = document.querySelector(`.exercise-order-edit[data-exercise-id="${exerciseId}"]`);
                
                if (this.checked) {
                    // If checked, enable the field and show placeholder
                    orderInput.removeAttribute('readonly');
                    orderInput.style.background = '#ffffff';
                    orderInput.placeholder = '1';
                } else {
                    // If unchecked, clear and disable the order field
                    orderInput.value = '';
                    orderInput.placeholder = '';
                    orderInput.setAttribute('readonly', 'readonly');
                    orderInput.style.background = '#f7fafc';
                }
            });
        });
        
        // Close Program Manager and open Program Editor
        this.closeProgramManager();
        const modal = document.getElementById('program-editor-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeProgramEditor() {
        document.getElementById('program-editor-modal').style.display = 'none';
    }
    
    saveEditedProgram() {
        const programId = this.currentEditingProgramId;
        const name = document.getElementById('edit-program-name').value;
        const description = document.getElementById('edit-program-desc').value;
        
        const selectedExercises = [];
        document.querySelectorAll('.exercise-checkbox-edit:checked').forEach(cb => {
            const exerciseId = cb.dataset.exerciseId;
            const durationInput = document.querySelector(`.exercise-duration-edit[data-exercise-id="${exerciseId}"]`);
            const orderInput = document.querySelector(`.exercise-order-edit[data-exercise-id="${exerciseId}"]`);
            const duration = parseInt(durationInput.value) * 60;
            const order = orderInput.value.trim() || '1';
            selectedExercises.push({
                exerciseId: exerciseId,
                duration: duration,
                order: order
            });
        });
        
        // Sort exercises by order (handles both numeric and alphanumeric ordering)
        selectedExercises.sort((a, b) => {
            // Convert to comparable format for sorting
            const aOrder = this.parseOrder(a.order);
            const bOrder = this.parseOrder(b.order);
            return aOrder - bOrder;
        });
        
        if (!name || selectedExercises.length === 0) {
            alert('Please enter a name and select at least one exercise!');
            return;
        }
        
        const totalDuration = selectedExercises.reduce((sum, ex) => sum + ex.duration, 0) / 60;
        
        this.programs[programId] = {
            ...this.programs[programId],
            name: name,
            description: description,
            duration: Math.round(totalDuration),
            exercises: selectedExercises
        };
        
        alert('✅ Program updated: ' + name + '\n\nChanges saved to memory. Export to save permanently.');
        this.closeProgramEditor();
        this.loadPrograms();
    }
    
    // Helper function to parse order values for sorting
    parseOrder(orderStr) {
        if (!orderStr) return 0;
        
        // Handle numeric orders (1, 2, 3, etc.)
        if (/^\d+$/.test(orderStr)) {
            return parseInt(orderStr);
        }
        
        // Handle alphanumeric orders (1A, 1B, 2A, etc.)
        const match = orderStr.match(/^(\d+)([A-Za-z]*)$/);
        if (match) {
            const number = parseInt(match[1]);
            const letter = match[2] || '';
            // Convert letter to number (A=0, B=1, C=2, etc.)
            const letterValue = letter ? letter.charCodeAt(0) - 65 : 0;
            return number * 1000 + letterValue; // Multiply by 1000 to leave room for letters
        }
        
        // Fallback for other formats
        return 999999;
    }
    
    deleteProgram(programId) {
        if (confirm('Delete program: ' + this.programs[programId].name + '?\n\nThis will only remove it from memory. Reload page to restore.')) {
            delete this.programs[programId];
            this.loadPrograms();
            this.openProgramManager();
            alert('Program deleted from memory. Reload page to restore from JSON.');
        }
    }
    
    exportPrograms() {
        const dataStr = JSON.stringify({ programs: this.programs }, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'programs-export.json';
        a.click();
        alert('Programs exported to downloads folder!');
    }
    
    openExerciseManager() {
        const modal = document.getElementById('exercise-manager-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
        
        const content = document.getElementById('exercise-manager-content');
        
        // Count AI vs default exercises
        const aiExercises = Object.values(this.exercises).filter(ex => ex.aiGenerated);
        const defaultExercises = Object.values(this.exercises).filter(ex => !ex.aiGenerated);
        
        content.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #1a202c; margin-bottom: 0.5rem;">All Exercises</h3>
                <p style="color: #718096; font-size: 0.875rem;">${defaultExercises.length} default exercises + ${aiExercises.length} AI-generated</p>
            </div>
        `;
        
        const exercisesArray = Object.values(this.exercises);
        exercisesArray.forEach((exercise) => {
            const isAI = exercise.aiGenerated === true;
            const aiBadge = isAI ? '<span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.2rem 0.4rem; border-radius: 3px; font-size: 0.65rem; margin-left: 0.5rem;">🤖 AI</span>' : '';
            
            const exerciseItem = document.createElement('div');
            exerciseItem.style.cssText = `background: ${isAI ? '#faf5ff' : '#f8f9fa'}; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid ${isAI ? '#e9d5ff' : '#e2e8f0'};`;
            exerciseItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <h4 style="color: #1a202c; margin-bottom: 0.5rem;">${exercise.name}${aiBadge}</h4>
                        <p style="color: #4a5568; font-size: 0.875rem; margin-bottom: 0.5rem;">${exercise.description}</p>
                        <p style="color: #718096; font-size: 0.875rem;">Type: ${exercise.type} • Duration: ${exercise.duration} min</p>
                        ${exercise.pattern ? `<p style="color: #667eea; font-size: 0.875rem;">Pattern: ${exercise.pattern.inhale}-${exercise.pattern.hold}-${exercise.pattern.exhale}</p>` : ''}
                        ${exercise.benefits ? `<p style="color: #22c55e; font-size: 0.875rem;">✨ ${exercise.benefits}</p>` : ''}
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="framework.editExercise('${exercise.id}')">✏️ Edit</button>
                        ${isAI ? `<button class="btn btn-danger" style="padding: 0.5rem 1rem; font-size: 0.875rem;" onclick="framework.deleteAIExercise('${exercise.id}')">🗑️ Delete</button>` : ''}
                    </div>
                </div>
            `;
            content.appendChild(exerciseItem);
        });
    }
    
    closeExerciseManager() {
        document.getElementById('exercise-manager-modal').style.display = 'none';
    }
    
    deleteAIExercise(exerciseId) {
        const exercise = this.exercises[exerciseId];
        if (!confirm(`Delete AI Exercise: "${exercise.name}"?\n\nThis will permanently remove this AI-generated exercise.`)) {
            return;
        }
        
        // Remove from memory
        delete this.exercises[exerciseId];
        
        // Remove from localStorage
        const aiExercises = JSON.parse(localStorage.getItem('aiGeneratedExercises') || '{}');
        delete aiExercises[exerciseId];
        localStorage.setItem('aiGeneratedExercises', JSON.stringify(aiExercises));
        
        console.log('🗑️ AI exercise deleted:', exerciseId);
        
        // Refresh Exercise Manager
        this.openExerciseManager();
    }
    
    editExercise(exerciseId) {
        const exercise = this.exercises[exerciseId];
        document.getElementById('exercise-json-editor').value = JSON.stringify(exercise, null, 2);
        this.closeExerciseManager();
        document.getElementById('exercise-editor-modal').style.display = 'flex';
    }
    
    exportExercises() {
        const dataStr = JSON.stringify({ exercises: this.exercises, mediaRegistry: this.mediaRegistry }, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exercises-export.json';
        a.click();
        alert('Exercises exported to downloads folder!');
    }
    
    openProgramBuilder() {
        const selector = document.getElementById('exercise-selector');
        selector.innerHTML = '';
        
        const exercisesArray = Object.values(this.exercises);
        exercisesArray.forEach((exercise) => {
            const item = document.createElement('div');
            item.style.cssText = 'background: #ffffff; padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 6px; border: 1px solid #e2e8f0; cursor: pointer;';
            item.innerHTML = `
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                    <input type="checkbox" class="exercise-checkbox" data-exercise-id="${exercise.id}" style="width: 18px; height: 18px;">
                    <div>
                        <strong style="color: #1a202c;">${exercise.name}</strong>
                        <span style="color: #718096; font-size: 0.875rem; margin-left: 0.5rem;">${exercise.duration} min</span>
                    </div>
                </label>
            `;
            selector.appendChild(item);
        });
        
        const modal = document.getElementById('program-builder-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeProgramBuilder() {
        document.getElementById('program-builder-modal').style.display = 'none';
    }
    
    saveNewProgram() {
        const name = document.getElementById('new-program-name').value;
        const description = document.getElementById('new-program-desc').value;
        const selectedExercises = Array.from(document.querySelectorAll('.exercise-checkbox:checked')).map(cb => ({
            exerciseId: cb.dataset.exerciseId,
            duration: this.exercises[cb.dataset.exerciseId].duration * 60
        }));
        
        if (!name || selectedExercises.length === 0) {
            alert('Please enter a name and select at least one exercise!');
            return;
        }
        
        const programId = name.toLowerCase().replace(/\s+/g, '_');
        const totalDuration = selectedExercises.reduce((sum, ex) => sum + ex.duration, 0) / 60;
        
        const newProgram = {
            id: programId,
            name: name,
            description: description,
            duration: Math.round(totalDuration),
            isDefault: false,
            exercises: selectedExercises
        };
        
        this.programs[programId] = newProgram;
        
        // Save to localStorage for persistence
        localStorage.setItem('customPrograms', JSON.stringify(this.programs));
        
        alert('Program created: ' + name + '\n\n✅ Program saved permanently! It will be available every time you use the app.');
        
        this.closeProgramBuilder();
        this.loadPrograms();
    }
    
    closeExerciseEditor() {
        document.getElementById('exercise-editor-modal').style.display = 'none';
    }
    
    validateExerciseJSON() {
        try {
            const jsonText = document.getElementById('exercise-json-editor').value;
            const parsed = JSON.parse(jsonText);
            alert('✅ JSON is valid!\n\nExercise: ' + (parsed.name || 'Unknown'));
        } catch (error) {
            alert('❌ JSON is invalid!\n\nError: ' + error.message);
        }
    }
    
    saveExerciseJSON() {
        try {
            const jsonText = document.getElementById('exercise-json-editor').value;
            const exercise = JSON.parse(jsonText);
            
            if (!exercise.id) {
                alert('Error: Exercise must have an "id" field!');
                return;
            }
            
            this.exercises[exercise.id] = exercise;
            alert('✅ Exercise saved: ' + exercise.name + '\n\nThis is saved in memory only. To persist, export and save to JSON file.');
            this.closeExerciseEditor();
        } catch (error) {
            alert('❌ Could not save!\n\nError: ' + error.message);
        }
    }
    
    // ============================================
    // NAVIGATION & INFORMATION PAGES
    // ============================================
    
    toggleMenu() {
        const menu = document.getElementById('hamburger-menu');
        if (menu.classList.contains('show')) {
            menu.classList.remove('show');
        } else {
            menu.style.display = 'block';
            // Small delay to trigger animation
            setTimeout(() => menu.classList.add('show'), 10);
        }
    }
    
    closeMenu() {
        const menu = document.getElementById('hamburger-menu');
        menu.classList.remove('show');
        setTimeout(() => {
            if (!menu.classList.contains('show')) {
                menu.style.display = 'none';
            }
        }, 300); // Wait for animation to complete
    }
    
    goHome() {
        this.closeMenu();
        
        // Navigate to LifeLovesMe wellness hub
        console.log('🏠 Navigating to LifeLovesMe Wellness Hub');
        window.location.href = 'https://lifeloveme.com/wellness.html';
    }
    
    showHelp() {
        this.closeMenu();
        const content = document.getElementById('help-content');
        content.innerHTML = `
            <h3 style="color: #1a202c; margin-bottom: 1rem;">How to Use ${this.config?.appInfo?.name || this.config?.app?.name || 'Pranayama Meditation'}</h3>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: #667eea; margin-bottom: 0.5rem;">🎯 Getting Started</h4>
                <ol style="color: #4a5568; line-height: 1.8; margin-left: 1.5rem;">
                    <li>Browse the program list on the left</li>
                    <li>Click a program card to select it</li>
                    <li>Click "Start Selected Program" to begin</li>
                    <li>Follow the voice and visual breathing cues</li>
                    <li>Use Pause/Resume/Stop buttons as needed</li>
                </ol>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: #667eea; margin-bottom: 0.5rem;">🎤 Voice Narration</h4>
                <p style="color: #4a5568; line-height: 1.6;">The app will speak exercise names, instructions, and breathing cues. Adjust voice volume and speed in Settings.</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: #667eea; margin-bottom: 0.5rem;">👁️ Visual Breathing Cues</h4>
                <p style="color: #4a5568; line-height: 1.6;">Watch for color-coded flashing text:</p>
                <ul style="color: #4a5568; margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li><span style="color: #22c55e; font-weight: 600;">GREEN</span> = Inhale</li>
                    <li><span style="color: #f59e0b; font-weight: 600;">AMBER</span> = Hold</li>
                    <li><span style="color: #3b82f6; font-weight: 600;">BLUE</span> = Exhale</li>
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: #667eea; margin-bottom: 0.5rem;">📊 Progress Bars</h4>
                <p style="color: #4a5568; line-height: 1.6;"><strong>Segmented bar (top):</strong> Shows all exercises. Click any segment to jump to that exercise.</p>
                <p style="color: #4a5568; line-height: 1.6; margin-top: 0.5rem;"><strong>Exercise bar (bottom):</strong> Shows current exercise progress only.</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h4 style="color: #667eea; margin-bottom: 0.5rem;">🛠️ Admin Tools</h4>
                <p style="color: #4a5568; line-height: 1.6;">Use Program Manager and Exercise Manager to view and manage content. Use Program Builder to create custom programs.</p>
            </div>
        `;
        const modal = document.getElementById('help-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeHelp() {
        document.getElementById('help-modal').style.display = 'none';
    }
    
    showProgress() {
        this.closeMenu();
        const content = document.getElementById('progress-content');
        
        const totalMinutes = Math.round(this.totalTimePracticed / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;
        
        content.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: #1a202c; margin-bottom: 2rem;">Your Wellness Journey</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: #ffffff; padding: 2rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">${this.sessionsCompleted}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">Sessions Completed</div>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #22c55e, #10b981); color: #ffffff; padding: 2rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">${totalHours > 0 ? totalHours + 'h ' + remainingMinutes + 'm' : totalMinutes + 'm'}</div>
                        <div style="font-size: 1rem; opacity: 0.9;">Total Practice Time</div>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; text-align: left;">
                    <h4 style="color: #1a202c; margin-bottom: 1rem;">Your Stats</h4>
                    <p style="color: #4a5568; margin-bottom: 0.5rem;"><strong>Name:</strong> ${this.userName || 'Not set'}</p>
                    <p style="color: #4a5568; margin-bottom: 0.5rem;"><strong>Average session:</strong> ${this.sessionsCompleted > 0 ? Math.round(totalMinutes / this.sessionsCompleted) : 0} minutes</p>
                    <p style="color: #4a5568; margin-bottom: 0.5rem;"><strong>Account created:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
        `;
        const modal = document.getElementById('progress-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeProgress() {
        document.getElementById('progress-modal').style.display = 'none';
    }
    
    exportProgress() {
        const report = {
            userName: this.userName,
            sessionsCompleted: this.sessionsCompleted,
            totalTimePracticed: this.totalTimePracticed,
            averageSession: this.sessionsCompleted > 0 ? Math.round((this.totalTimePracticed / 60) / this.sessionsCompleted) : 0,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(report, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'progress-report.json';
        a.click();
        alert('Progress report exported!');
    }
    
    showHistory() {
        this.closeMenu();
        const content = document.getElementById('history-content');
        
        const history = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
        
        if (history.length === 0) {
            content.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #718096;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📜</div>
                    <p>No session history yet. Complete a program to start tracking!</p>
                </div>
            `;
        } else {
            content.innerHTML = '<h3 style="color: #1a202c; margin-bottom: 1rem;">Recent Sessions</h3>';
            history.reverse().forEach((session, index) => {
                const item = document.createElement('div');
                item.style.cssText = 'background: #f8f9fa; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid #667eea;';
                item.innerHTML = `
                    <h4 style="color: #1a202c; margin-bottom: 0.5rem;">${session.programName}</h4>
                    <p style="color: #4a5568; font-size: 0.875rem;">Duration: ${session.duration} minutes • ${new Date(session.date).toLocaleString()}</p>
                `;
                content.appendChild(item);
            });
        }
        
        const modal = document.getElementById('history-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeHistory() {
        document.getElementById('history-modal').style.display = 'none';
    }
    
    clearHistory() {
        if (confirm('Clear all session history? This cannot be undone.')) {
            localStorage.setItem('sessionHistory', '[]');
            alert('Session history cleared!');
            this.closeHistory();
        }
    }
    
    showAbout() {
        this.closeMenu();
        const content = document.getElementById('about-content');
        content.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${this.config?.appInfo?.icon || this.config?.app?.icon || '🧘'}</div>
                <h3 style="color: #1a202c; margin-bottom: 0.5rem;">${this.config?.appInfo?.name || this.config?.app?.name || 'Pranayama Meditation'}</h3>
                <p style="color: #718096; margin-bottom: 2rem;">Version ${this.config?.appInfo?.version || this.config?.app?.version || '1.0.0'}</p>
                
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; text-align: left; margin-bottom: 1.5rem;">
                    <p style="color: #4a5568; line-height: 1.6;">${this.config?.appInfo?.description || this.config?.app?.description || 'A comprehensive meditation and wellness framework'}</p>
                </div>
                
                <div style="text-align: left;">
                    <h4 style="color: #1a202c; margin-bottom: 0.5rem;">Features</h4>
                    <ul style="color: #4a5568; line-height: 1.8;">
                        <li>✅ Voice-guided meditation sessions</li>
                        <li>✅ Visual breathing cues</li>
                        <li>✅ Progress tracking & statistics</li>
                        <li>✅ Interactive program seeking</li>
                        <li>✅ Multi-track audio & video support</li>
                        <li>✅ Dark mode support</li>
                        <li>✅ Customizable settings</li>
                    </ul>
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0; color: #718096; font-size: 0.875rem;">
                    <p>Built with ❤️ using Generic Wellness Framework</p>
                    <p>September 2025</p>
                </div>
            </div>
        `;
        const modal = document.getElementById('about-modal');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
    }
    
    closeAbout() {
        document.getElementById('about-modal').style.display = 'none';
    }
    
    // ============================================
    // SMART PROGRAM BUILDER & RECOMMENDATIONS
    // ============================================
    
    openAIProgramGenerator() {
        console.log('🚀 Opening AI Program Generator...');
        this.closeMenu();
        
        // Refresh AI integration from localStorage
        if (this.ai) {
            const apiKey = localStorage.getItem('openaiAPIKey') || '';
            const aiEnabled = localStorage.getItem('aiEnabled') === 'true';
            const aiModel = localStorage.getItem('aiModel') || 'gpt-3.5-turbo';
            
            this.ai.setAPIKey(apiKey);
            this.ai.setEnabled(aiEnabled);
            this.ai.setModel(aiModel);
            
            console.log('🔄 AI Integration refreshed:', {
                enabled: this.ai.enabled,
                apiKeyLength: this.ai.apiKey?.length || 0,
                model: this.ai.model,
                isConfigured: this.ai.isConfigured()
            });
        }
        
        // Show the modal first
        const modal = document.getElementById('ai-program-modal');
        if (!modal) {
            console.error('AI Program modal not found!');
            alert('AI Program Builder is not available. Please refresh the page.');
            return;
        }
        
        console.log('✅ AI Program modal found, showing...');
        modal.style.display = 'flex';
        
        // Make modal draggable
        this.makeModalDraggable(modal);
        
        // Show saved programs section by default
        this.showSavedAIPrograms();
    }
    
    showSavedAIPrograms() {
        // Hide create section, show saved section
        const createSection = document.getElementById('create-ai-program-section');
        const savedSection = document.getElementById('saved-ai-programs-section');
        
        if (!createSection || !savedSection) {
            console.error('AI Program sections not found!');
            return;
        }
        
        createSection.style.display = 'none';
        savedSection.style.display = 'block';
        
        // Load saved AI programs
        const savedPrograms = JSON.parse(localStorage.getItem('savedAIPrograms') || '{}');
        const savedList = document.getElementById('saved-ai-programs-list');
        
        if (Object.keys(savedPrograms).length === 0) {
            savedList.innerHTML = `
                <div style="text-align: center; padding: 2rem; background: #f7fafc; border-radius: 8px; border: 2px dashed #cbd5e0;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                    <p style="color: #1a202c; margin-bottom: 0.5rem; font-weight: 600; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">No AI Programs Yet</p>
                    <p style="color: #4a5568; font-size: 0.875rem; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">Click "🚀 Create New AI Program" above to generate your first personalized program!</p>
                </div>
            `;
        } else {
            savedList.innerHTML = Object.values(savedPrograms).map(program => `
                <div style="background: #f8f9fa; padding: 1rem; margin-bottom: 0.75rem; border-radius: 8px; border: 1px solid #e2e8f0; transition: all 0.2s;" 
                     onmouseenter="this.style.borderColor='#8b5cf6'; this.style.background='#faf5ff';" 
                     onmouseleave="this.style.borderColor='#e2e8f0'; this.style.background='#f8f9fa';">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h4 style="color: #1a202c; margin-bottom: 0.5rem; font-weight: 600; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">
                                ${program.name}
                                <span style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 0.2rem 0.4rem; border-radius: 3px; font-size: 0.65rem; margin-left: 0.5rem; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);">🤖 AI</span>
                            </h4>
                            <p style="color: #4a5568; font-size: 0.875rem; margin-bottom: 0.5rem; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${program.description}</p>
                            <p style="color: #4a5568; font-size: 0.8rem; font-weight: 500; text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);">${program.exercises.length} exercises • ${program.duration} min</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-primary" onclick="framework.startAIProgramDirectly('${program.id}')" style="padding: 0.5rem 1rem; font-size: 0.875rem;">▶️ Start</button>
                            <button class="btn btn-danger" onclick="framework.deleteAIProgram('${program.id}')" style="padding: 0.4rem 0.75rem; font-size: 0.75rem;">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    showCreateNewAIProgram() {
        // Hide saved section, show create section
        const savedSection = document.getElementById('saved-ai-programs-section');
        const createSection = document.getElementById('create-ai-program-section');
        
        if (!savedSection || !createSection) {
            console.error('AI Program sections not found!');
            return;
        }
        
        savedSection.style.display = 'none';
        createSection.style.display = 'block';
        
        // Reset form
        document.getElementById('ai-user-input').value = '';
        document.getElementById('ai-duration').value = 15;
        document.getElementById('ai-level').value = 'beginner';
        document.getElementById('ai-result').style.display = 'none';
        document.getElementById('ai-status').style.display = 'none';
    }
    
    closeAIProgramGenerator() {
        document.getElementById('ai-program-modal').style.display = 'none';
    }
    
    async generateAIProgram() {
        const userInput = document.getElementById('ai-user-input').value.trim();
        const duration = parseInt(document.getElementById('ai-duration').value);
        const level = document.getElementById('ai-level').value;
        
        // Validate input
        if (!userInput) {
            alert('⚠️ Please describe what you want to achieve!');
            return;
        }
        
        // Check if AI is configured - force refresh from localStorage
        if (this.ai) {
            const apiKey = localStorage.getItem('openaiAPIKey') || '';
            let aiEnabled = localStorage.getItem('aiEnabled') === 'true';
            const aiModel = localStorage.getItem('aiModel') || 'gpt-3.5-turbo';
            
            // Auto-enable AI if API key exists but AI is not enabled
            if (apiKey && !aiEnabled) {
                aiEnabled = true;
                localStorage.setItem('aiEnabled', 'true');
                this.showNotification('🔑 API key detected! AI features have been automatically enabled.', 'success');
            }
            
            this.ai.setAPIKey(apiKey);
            this.ai.setEnabled(aiEnabled);
            this.ai.setModel(aiModel);
            
            console.log('🔧 AI Integration refreshed:', {
                apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'none',
                enabled: aiEnabled,
                model: aiModel,
                isConfigured: this.ai.isConfigured()
            });
        }
        const useRealAI = this.ai && this.ai.isConfigured();
        
        // Debug AI configuration
        console.log('🔍 AI Debug Info:');
        console.log('- AI object exists:', !!this.ai);
        console.log('- AI enabled:', this.ai?.enabled);
        console.log('- AI API key length:', this.ai?.apiKey?.length || 0);
        console.log('- AI isConfigured():', this.ai?.isConfigured());
        console.log('- useRealAI:', useRealAI);
        
        let selectedExercises;
        let aiReasoning = null;
        let aiProgramName = null;
        let aiDescription = null;
        let aiResult = null;
        
        const btn = event.target;
        const statusDiv = document.getElementById('ai-status');
        
        if (useRealAI) {
            // Use real AI
            btn.disabled = true;
            btn.textContent = '🤖 AI is thinking...';
            
            // Show status
            statusDiv.style.display = 'block';
            statusDiv.querySelector('p').textContent = '🤖 AI is analyzing your request and creating a personalized program...';
            
            try {
                console.log('🤖 Calling OpenAI API...');
                console.log('User request:', userInput);
                
                aiResult = await this.ai.generateProgram(userInput, this.exercises, duration, level);
                
                // Handle new exercises created by AI
                if (aiResult.newExercises && aiResult.newExercises.length > 0) {
                    console.log('🆕 AI created', aiResult.newExercises.length, 'new exercises');
                    
                    // Add new exercises to the exercise library
                    const aiExercises = JSON.parse(localStorage.getItem('aiGeneratedExercises') || '{}');
                    
                    aiResult.newExercises.forEach(newEx => {
                        // Convert duration from minutes to seconds if needed
                        if (newEx.duration < 60) {
                            newEx.duration = newEx.duration * 60;
                        }
                        
                        // Add to in-memory exercises
                        this.exercises[newEx.id] = newEx;
                        
                        // Save to localStorage
                        aiExercises[newEx.id] = newEx;
                        
                        console.log('   ✅ Created:', newEx.name, '(' + newEx.id + ')');
                    });
                    
                    localStorage.setItem('aiGeneratedExercises', JSON.stringify(aiExercises));
                    
                    // Show notification with download option
                    this.showNotification(
                        `🎉 AI created ${aiResult.newExercises.length} new custom exercise(s)! They're saved in your browser.`, 
                        'success'
                    );
                    
                    // Offer to download new exercises as JSON
                    this.offerDownloadNewExercises(aiResult.newExercises);
                }
                
                // Validate that all exercises now exist (including newly created ones)
                const validExercises = aiResult.exercises.filter(ex => {
                    const exists = this.exercises[ex.exerciseId] !== undefined;
                    if (!exists) {
                        console.warn(`⚠️ AI suggested invalid exercise: ${ex.exerciseId} - skipping`);
                    }
                    return exists;
                });
                
                if (validExercises.length === 0) {
                    throw new Error('No valid exercises in AI response. Please try again.');
                }
                
                selectedExercises = validExercises;
                aiReasoning = aiResult.reasoning;
                aiProgramName = aiResult.programName;
                aiDescription = aiResult.description;
                
                console.log('✅ AI generated program:', aiProgramName);
                console.log('AI reasoning:', aiReasoning);
                console.log('Using exercises:', selectedExercises.length, '(', aiResult.newExercises?.length || 0, 'newly created )');
                
                // Update status
                statusDiv.querySelector('p').textContent = '✅ AI successfully created your personalized program!';
                
            } catch (error) {
                console.error('❌ AI generation failed:', error);
                
                statusDiv.style.display = 'block';
                statusDiv.style.background = '#fee2e2';
                statusDiv.style.borderColor = '#ef4444';
                statusDiv.querySelector('p').style.color = '#991b1b';
                statusDiv.querySelector('p').textContent = `❌ AI Error: ${error.message}. Using fallback...`;
                
                // Fall back to rule-based
                selectedExercises = this.selectExercisesForGoal('custom', duration, level, userInput);
            } finally {
                btn.disabled = false;
                btn.textContent = '✨ Generate Program';
            }
        } else {
            // Use rule-based selection
            console.log('ℹ️ AI not configured, using rule-based selection');
            
            statusDiv.style.display = 'block';
            statusDiv.style.background = '#fef3c7';
            statusDiv.style.borderColor = '#f59e0b';
            statusDiv.querySelector('p').style.color = '#92400e';
            statusDiv.querySelector('p').textContent = 'ℹ️ Using Smart Logic (not AI). Go to Settings → AI Integration to add your OpenAI API key and enable AI features for true AI generation!';
            
            // Show notification to user
            this.showNotification('⚠️ AI not configured! Using rule-based selection. Go to Settings to enable AI features.', 'warning');
            
            selectedExercises = this.selectExercisesForGoal('custom', duration, level, userInput);
        }
        
        if (selectedExercises.length === 0) {
            alert('Could not generate program. Please try different parameters.');
            return;
        }
        
        // Create unique program ID based on timestamp
        const programName = aiProgramName || (useRealAI ? 'Custom Program - AI Generated' : 'Custom Program - Smart Generated');
        const programId = 'ai_program_' + Date.now();
        
        const aiProgram = {
            id: programId,
            name: programName,
            description: aiDescription || `AI-generated program based on your request. Duration: ${duration} minutes.`,
            duration: duration,
            isDefault: false,
            exercises: selectedExercises
        };
        
        // Add to programs
        this.programs[programId] = aiProgram;
        
        // Show result
        const resultDiv = document.getElementById('ai-result');
        resultDiv.style.display = 'block';
        
        const aiPoweredBadge = useRealAI ? '<span style="background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-left: 0.5rem;">🤖 AI Powered</span>' : '<span style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-left: 0.5rem;">🧠 Smart Logic</span>';
        
        resultDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #22c55e, #10b981); color: #ffffff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem;">
                <h4 style="margin-bottom: 0.5rem;">✨ Program Generated Successfully!${aiPoweredBadge}</h4>
                <p style="opacity: 0.9; font-size: 0.875rem;">Your personalized program is ready</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h4 style="color: #1a202c; margin-bottom: 1rem;">${programName}</h4>
                <p style="color: #4a5568; margin-bottom: 1rem;">${aiProgram.description}</p>
                <p style="color: #718096; font-size: 0.875rem; margin-bottom: 1rem;"><strong>${selectedExercises.length} exercises</strong> • Total: ${duration} minutes</p>
                
                ${aiReasoning ? `
                <div style="background: #ede9fe; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #8b5cf6;">
                    <h5 style="color: #5b21b6; margin-bottom: 0.5rem; font-size: 0.875rem;">🤖 AI Reasoning:</h5>
                    <p style="color: #6b21a8; font-size: 0.875rem; margin: 0;">${aiReasoning}</p>
                </div>
                ` : ''}
                
                ${(aiResult && aiResult.newExercises && aiResult.newExercises.length > 0) ? `
                <div style="background: #ecfdf5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid #10b981;">
                    <h5 style="color: #065f46; margin-bottom: 0.5rem; font-size: 0.875rem;">🆕 AI Created ${aiResult.newExercises.length} New Exercise${aiResult.newExercises.length > 1 ? 's' : ''}:</h5>
                    <ul style="color: #047857; font-size: 0.875rem; margin: 0.5rem 0 0 1.5rem; line-height: 1.6;">
                        ${aiResult.newExercises.map(ex => `<li><strong>${ex.name}</strong> - ${ex.description}</li>`).join('')}
                    </ul>
                    <p style="color: #059669; font-size: 0.75rem; margin-top: 0.5rem;">These new exercises have been saved to your Exercise Library!</p>
                </div>
                ` : ''}
                
                <h5 style="color: #1a202c; margin-bottom: 0.5rem;">Exercise Sequence:</h5>
                <ol style="color: #4a5568; margin-left: 1.5rem; line-height: 1.8;">
                    ${selectedExercises.map(ex => {
                        const exercise = this.exercises[ex.exerciseId];
                        const reasonText = ex.reason ? `<div style="color: #718096; font-size: 0.8rem; margin-top: 0.25rem;">→ ${ex.reason}</div>` : '';
                        return `<li>${exercise.name} (${Math.round(ex.duration/60)} min)${reasonText}</li>`;
                    }).join('')}
                </ol>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: #d4edda; border-radius: 8px; border: 1px solid #28a745;">
                    <p style="color: #155724; font-size: 0.875rem; margin: 0;">
                        <strong>✅ Program Saved!</strong> Your ${useRealAI ? 'AI-generated' : 'smart rule-based'} program has been automatically saved and is now available with a ${useRealAI ? '🤖 AI' : '🧠 Smart'} badge. You can access it anytime from "AI Program Builder" or the main program list.
                    </p>
                </div>
            </div>
        `;
        
        // Auto-save to localStorage so it persists
        const tempSaved = JSON.parse(localStorage.getItem('savedAIPrograms') || '{}');
        tempSaved[programId] = aiProgram;
        localStorage.setItem('savedAIPrograms', JSON.stringify(tempSaved));
        console.log('✅ Smart program auto-saved:', programId);
        
        // Update footer buttons
        const footer = document.getElementById('ai-program-footer');
        footer.innerHTML = `
            <button class="btn btn-primary" onclick="framework.useAIProgram('${programId}')" style="flex: 1;">▶️ Start This Program</button>
            <button class="btn btn-success" onclick="framework.showSavedAIPrograms()">📋 View All AI Programs</button>
            <button class="btn btn-secondary" onclick="framework.closeAIProgramGenerator()">Close</button>
        `;
        
        // Reload programs list to show new AI program
        this.loadPrograms();
    }
    
    selectExercisesForGoal(goal, targetDuration, level, preferences) {
        const exercisesArray = Object.values(this.exercises);
        let selected = [];
        
        // Parse custom preferences
        const prefsLower = (preferences || '').toLowerCase();
        const wantsMeditation = prefsLower.includes('meditation');
        const wantsBreathing = prefsLower.includes('breathing') || prefsLower.includes('pranayama');
        const wantsYoga = prefsLower.includes('yoga');
        const avoidWords = prefsLower.match(/avoid\s+(\w+)/g) || [];
        
        // Better AI logic: Select exercises based on goal and preferences
        const goalMap = {
            stress: ['anulom_vilom', 'bhramari', 'progressive_relaxation', 'mindfulness_meditation'],
            energy: ['kapalabhati', 'bhastrika', 'ujjayi'],
            sleep: ['anulom_vilom', 'sheetali', 'body_scan', 'progressive_relaxation'],
            healing: ['anulom_vilom', 'bhramari', 'cooling_meditation'],
            spiritual: ['mindfulness_meditation', 'chanting', 'silence'],
            custom: []
        };
        
        let preferredIds = goalMap[goal] || [];
        
        // Handle custom preferences intelligently
        if (goal === 'custom' || preferences) {
            preferredIds = [];
            
            // Add based on user input
            if (wantsMeditation) {
                preferredIds.push('mindfulness_meditation', 'body_scan');
            }
            if (wantsBreathing) {
                preferredIds.push('anulom_vilom', 'bhramari');
            }
            if (wantsYoga) {
                preferredIds.push('ujjayi', 'body_scan');
            }
            
            // If nothing specific requested, use goal-based
            if (preferredIds.length === 0 && goalMap[goal]) {
                preferredIds = goalMap[goal];
            }
            
            // If still empty, use safe defaults
            if (preferredIds.length === 0) {
                preferredIds = ['anulom_vilom', 'mindfulness_meditation', 'progressive_relaxation'];
            }
        }
        
        // Calculate reasonable exercise count (3-5 exercises for most sessions)
        const targetExerciseCount = Math.min(preferredIds.length, Math.max(3, Math.floor(targetDuration / 3)));
        const exercisesToUse = preferredIds.slice(0, targetExerciseCount);
        
        // Distribute time evenly among selected exercises
        const timePerExercise = Math.floor((targetDuration * 60) / exercisesToUse.length);
        
        exercisesToUse.forEach(id => {
            const exercise = this.exercises[id];
            if (!exercise) return;
            
            // Filter by level if beginner
            if (level === 'beginner' && exercise.safetyLevel === 'advanced') return;
            
            // Each exercise gets equal time (minimum 2 minutes, maximum 10 minutes)
            let exerciseDuration = Math.max(120, Math.min(600, timePerExercise));
            
            selected.push({
                exerciseId: id,
                duration: exerciseDuration
            });
        });
        
        // If we didn't get enough exercises, we might have time left - distribute it
        const totalUsed = selected.reduce((sum, ex) => sum + ex.duration, 0);
        const remaining = (targetDuration * 60) - totalUsed;
        
        if (remaining > 0 && selected.length > 0) {
            // Add remaining time to last exercise
            selected[selected.length - 1].duration += remaining;
        }
        
        return selected;
    }
    
    getGoalName(goal) {
        const names = {
            stress: 'Stress Relief',
            energy: 'Energy Boost',
            sleep: 'Sleep Preparation',
            healing: 'Healing Session',
            spiritual: 'Spiritual Practice',
            custom: 'Custom Session'
        };
        return names[goal] || 'Wellness Session';
    }
    
    getGoalDescription(goal) {
        const descriptions = {
            stress: 'reducing stress and promoting relaxation',
            energy: 'boosting energy and mental focus',
            sleep: 'improving sleep quality and relaxation',
            healing: 'promoting physical healing and wellness',
            spiritual: 'spiritual growth and inner peace'
        };
        return descriptions[goal] || 'general wellness';
    }
    
    useAIProgram(programId) {
        this.closeAIProgramGenerator();
        this.selectedProgram = programId;
        this.startProgram();
    }
    
    startAIProgramDirectly(programId) {
        // Close AI Builder modal
        this.closeAIProgramGenerator();
        
        // Start program immediately without showing detail modal
        this.selectedProgram = programId;
        this.startProgram();
    }
    
    deleteAIProgram(programId) {
        if (!confirm(`Delete "${this.programs[programId].name}"?\n\nThis will permanently remove this AI-generated program.`)) {
            return;
        }
        
        // Close any open modals
        this.closeProgramDetail();
        
        // Remove from memory
        delete this.programs[programId];
        
        // Remove from localStorage
        const savedPrograms = JSON.parse(localStorage.getItem('savedAIPrograms') || '{}');
        delete savedPrograms[programId];
        localStorage.setItem('savedAIPrograms', JSON.stringify(savedPrograms));
        
        console.log('🗑️ AI program deleted:', programId);
        
        // Reload program list
        this.loadPrograms();
        
        // If AI modal is open, refresh the saved programs list
        if (document.getElementById('ai-program-modal').style.display === 'flex') {
            this.showSavedAIPrograms();
        }
    }
    
    openAIRecommendations() {
        this.closeMenu();
        const content = document.getElementById('ai-recommendations-content');
        
        // Analyze user history and provide recommendations
        const recommendations = this.analyzeAndRecommend();
        
        content.innerHTML = `
            <h3 style="color: #1a202c; margin-bottom: 1.5rem;">Personalized Recommendations for ${this.userName || 'You'}</h3>
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: #ffffff; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">💡 Smart Insight</h4>
                <p style="opacity: 0.95;">${recommendations.insight}</p>
            </div>
            
            <h4 style="color: #1a202c; margin-bottom: 1rem;">Recommended Programs:</h4>
            ${recommendations.programs.map(prog => {
                const program = this.programs[prog.programId];
                const programExists = program !== undefined;
                
                return `
                <div style="background: #f8f9fa; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border-left: 4px solid #3b82f6; cursor: ${programExists ? 'pointer' : 'default'};" 
                     onclick="${programExists ? `framework.startRecommendedProgram('${prog.programId}')` : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h5 style="color: #1a202c; margin-bottom: 0.5rem;">${prog.name}</h5>
                            <p style="color: #4a5568; font-size: 0.875rem; margin-bottom: 0.5rem;">${prog.description}</p>
                            <p style="color: #3b82f6; font-size: 0.875rem; font-weight: 600;">✨ ${prog.reason}</p>
                        </div>
                        ${programExists ? '<button class="btn btn-primary" style="margin-left: 1rem; padding: 0.5rem 1rem;" onclick="event.stopPropagation(); framework.startRecommendedProgram(\'' + prog.programId + '\')">▶️ Start</button>' : '<span style="color: #718096; font-size: 0.75rem; margin-left: 1rem;">(Not available)</span>'}
                    </div>
                </div>
            `}).join('')}
            
            <div style="margin-top: 1.5rem; background: #fffbeb; border: 1px solid #fcd34d; padding: 1rem; border-radius: 8px;">
                <p style="color: #92400e; font-size: 0.875rem;"><strong>💡 Tip:</strong> ${recommendations.tip}</p>
            </div>
        `;
        
        document.getElementById('ai-recommendations-modal').style.display = 'flex';
    }
    
    closeAIRecommendations() {
        document.getElementById('ai-recommendations-modal').style.display = 'none';
    }
    
    analyzeAndRecommend() {
        const avgSession = this.sessionsCompleted > 0 ? Math.round((this.totalTimePracticed / 60) / this.sessionsCompleted) : 0;
        
        let insight = '';
        let tip = '';
        const recommendedPrograms = [];
        
        if (this.sessionsCompleted === 0) {
            insight = "Welcome! Start your wellness journey with beginner-friendly programs.";
            tip = "Begin with shorter sessions (5-10 minutes) and gradually increase duration.";
            recommendedPrograms.push(
                { programId: 'quick_session', name: 'Quick 5-Minute Session', description: 'Short wellness session for busy schedules', reason: 'Perfect for beginners - just 5 minutes!' },
                { programId: 'morning_meditation', name: 'Morning Meditation', description: 'Gentle start to your day', reason: 'Easy to follow, great for building routine' },
                { programId: 'quick_energy', name: 'Quick Energy Recharge', description: 'Energizing breaths to wake up', reason: 'Short but effective' }
            );
        } else if (this.sessionsCompleted < 5) {
            insight = `Great start! You've completed ${this.sessionsCompleted} sessions. Keep building consistency.`;
            tip = "Try to practice at the same time each day to build a habit.";
            recommendedPrograms.push(
                { programId: 'stress_anxiety_relief', name: 'Stress & Anxiety Relief', description: 'Calming sequence to quiet the mind', reason: 'Popular for building routine' },
                { programId: 'focus_concentration', name: 'Focus & Concentration', description: 'Improve mental clarity', reason: 'Next step in your journey' },
                { programId: 'bp_balance', name: 'Blood Pressure Balance', description: 'Gentle cooling and balancing', reason: 'Calms the nervous system' }
            );
        } else if (this.sessionsCompleted < 15) {
            insight = `Excellent progress! ${this.sessionsCompleted} sessions completed. You're building a strong practice.`;
            tip = "Consider trying longer programs (15-20 minutes) to deepen your practice.";
            recommendedPrograms.push(
                { programId: 'energy_boost', name: 'Energy Boost', description: 'Energize your body and mind', reason: 'Match your growing experience' },
                { programId: 'emotional_balance', name: 'Emotional Balance', description: 'Stabilizes mood by harmonizing breath', reason: 'Deepen your practice' },
                { programId: 'respiratory_health', name: 'Respiratory Health', description: 'Strengthens lungs and clears airways', reason: 'Build resilience' }
            );
        } else {
            insight = `🌟 Amazing dedication! ${this.sessionsCompleted} sessions completed with ${Math.round(this.totalTimePracticed / 60)} minutes of total practice. You're a committed practitioner!`;
            tip = "You've built a strong foundation. Try advanced programs or create custom sessions with Smart Program Builder!";
            recommendedPrograms.push(
                { programId: 'test_program', name: 'Complete Wellness Program', description: 'Comprehensive program with all exercises', reason: 'Ready for advanced practice' },
                { programId: 'pure_meditation', name: 'Pure Meditation', description: 'Deep meditation without breathing exercises', reason: 'Advanced meditation practice' },
                { programId: 'sleep_preparation', name: 'Deep Sleep Preparation', description: 'Extended wind-down routine', reason: 'Maximize relaxation benefits' }
            );
        }
        
        return { insight, tip, programs: recommendedPrograms };
    }
    
    startRecommendedProgram(programId) {
        this.closeAIRecommendations();
        this.selectedProgram = programId;
        this.showProgramDetail(programId);
    }
    
    // ============================================
    // AUDIO SYSTEM ENHANCEMENT
    // ============================================
    
    // Audio system for meditation programs
    audioSystem = {
        backgroundMusic: null,
        currentAmbient: null,
        volume: 0.3, // 30% volume for background
        isPlaying: false,
        audioContext: null
    };
    
    initializeAudioSystem() {
        // Initialize Web Audio API
        this.audioSystem.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('🎵 Audio system initialized');
        
        // Resume audio context if suspended (required for user interaction)
        if (this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🎵 Audio context resumed');
            });
        }
    }
    
    // Get ambient sound for exercise/program type
    getAmbientSound(exerciseType, programType) {
        // Use configuration from app-config.json
        const ambientMapping = this.config?.ambientSoundMapping;
        if (!ambientMapping) {
            return 'soft_drone'; // Fallback
        }
        
        // Try exercise type first, then program type, then default
        return ambientMapping.exerciseTypes?.[exerciseType] || 
               ambientMapping.programTypes?.[programType] || 
               ambientMapping.defaultAmbient || 'soft_drone';
    }
    
    // Play background ambient sound
    playBackgroundAmbient(ambientType, volume = 0.3) {
        // Stop current ambient if playing
        this.stopBackgroundAmbient();
        
        // Check if we have the user's custom Zen music file from configuration
        const customZenFile = this.config?.appInfo?.customZenMusic || './audio/India_Master_-_Zen_Music_Namast.mp3';
        
        // Try to load the custom Zen music file first
        this.audioSystem.backgroundMusic = new Audio(customZenFile);
        this.audioSystem.backgroundMusic.loop = true;
        const zenVolumeMultiplier = this.config?.audioSettings?.zenMusicVolumeMultiplier || 0.1;
        this.audioSystem.backgroundMusic.volume = volume * zenVolumeMultiplier;
        
        this.audioSystem.backgroundMusic.play()
            .then(() => {
                this.audioSystem.isPlaying = true;
                console.log(`🎵 Playing custom Zen music: ${customZenFile} at ${(volume * zenVolumeMultiplier) * 100}% volume`);
            })
            .catch(error => {
                console.log(`🎵 Custom Zen music not available, trying ambient file: ${ambientType}`);
                
                // Fallback to ambient file
                const ambientFile = this.getAmbientFile(ambientType);
                if (!ambientFile) {
                    console.log('🎵 No ambient file found, using generated ambient');
                    this.playGeneratedAmbient(ambientType, volume);
                    return;
                }
                
                // Play ambient file
                this.audioSystem.backgroundMusic = new Audio(ambientFile);
                this.audioSystem.backgroundMusic.loop = true;
                this.audioSystem.backgroundMusic.volume = volume;
                this.audioSystem.backgroundMusic.play()
                    .then(() => {
                        this.audioSystem.isPlaying = true;
                        console.log(`🎵 Playing ambient: ${ambientType} at ${volume * 100}% volume`);
                    })
                    .catch(error => {
                        console.log('🎵 Audio file not available, using generated ambient');
                        this.playGeneratedAmbient(ambientType, volume);
                    });
            });
    }
    
    // Get ambient file path
    getAmbientFile(ambientType) {
        // Use configuration from app-config.json
        const mediaFiles = this.config?.mediaFiles;
        if (!mediaFiles) {
            return null; // No media files configured
        }
        
        return mediaFiles[ambientType];
    }
    
    // Generate ambient sound using Web Audio API
    playGeneratedAmbient(ambientType, volume = 0.3) {
        const context = this.audioSystem.audioContext;
        const ambientSounds = {
            'ocean_waves': () => this.createOceanWaves(context, volume),
            'soft_drone': () => this.createSoftDrone(context, volume),
            'forest_night': () => this.createForestNight(context, volume),
            'meditation_music': () => this.createMeditationMusic(context, volume),
            'rain_sounds': () => this.createRainSounds(context, volume),
            'singing_bowls': () => this.createSingingBowls(context, volume),
            'flute_music': () => this.createFluteMusic(context, volume),
            'sitar_music': () => this.createSitarMusic(context, volume),
            'om_chanting': () => this.createOmChanting(context, volume),
            'mantra_music': () => this.createMantraMusic(context, volume)
        };
        
        const createAmbient = ambientSounds[ambientType] || ambientSounds['soft_drone'];
        this.audioSystem.currentAmbient = createAmbient();
        this.audioSystem.isPlaying = true;
        
        console.log(`🎵 Generated ambient: ${ambientType} at ${volume * 100}% volume`);
    }
    
    // Create ocean waves ambient
    createOceanWaves(context, volume) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const filter = context.createBiquadFilter();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(60, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(40, context.currentTime + 2);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, context.currentTime);
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.6, context.currentTime + 1);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        return { oscillator, gainNode, filter };
    }
    
    // Create soft drone ambient
    createSoftDrone(context, volume) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(110, context.currentTime); // A2 note
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.7, context.currentTime + 2);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        return { oscillator, gainNode };
    }
    
    // Create forest night ambient
    createForestNight(context, volume) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const filter = context.createBiquadFilter();
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(220, context.currentTime);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, context.currentTime);
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.35, context.currentTime + 1);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        return { oscillator, gainNode, filter };
    }
    
    // Create meditation music ambient
    createMeditationMusic(context, volume) {
        const oscillator1 = context.createOscillator();
        const oscillator2 = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(220, context.currentTime); // A3
        
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(330, context.currentTime); // E4
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.25, context.currentTime + 2);
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator1.start();
        oscillator2.start();
        return { oscillator1, oscillator2, gainNode };
    }
    
    // Create rain sounds ambient
    createRainSounds(context, volume) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        const filter = context.createBiquadFilter();
        
        oscillator.type = 'white';
        
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1000, context.currentTime);
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.3, context.currentTime + 1);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        return { oscillator, gainNode, filter };
    }
    
    // Create singing bowls ambient
    createSingingBowls(context, volume) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(256, context.currentTime); // C4
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.2, context.currentTime + 3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 8);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        return { oscillator, gainNode };
    }
    
    // Create flute music ambient
    createFluteMusic(context, volume) {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, context.currentTime); // A4
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.3, context.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.start();
        return { oscillator, gainNode };
    }
    
    // Create sitar music ambient
    createSitarMusic(context, volume) {
        const oscillator1 = context.createOscillator();
        const oscillator2 = context.createOscillator();
        const gainNode = context.createGain();
        const filter = context.createBiquadFilter();
        const delay = context.createDelay();
        const feedback = context.createGain();
        
        // Main sitar string (Sa - C4)
        oscillator1.type = 'sawtooth';
        oscillator1.frequency.setValueAtTime(261.63, context.currentTime); // C4
        
        // Drone string (Pa - G3)
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(196.00, context.currentTime); // G3
        
        // Sitar-like filter
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, context.currentTime);
        filter.Q.setValueAtTime(5, context.currentTime);
        
        // Reverb effect
        delay.delayTime.setValueAtTime(0.3, context.currentTime);
        feedback.gain.setValueAtTime(0.2, context.currentTime);
        
        // Volume envelope
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.15, context.currentTime + 2);
        
        // Connect audio graph
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay);
        gainNode.connect(context.destination);
        
        oscillator1.start();
        oscillator2.start();
        
        return { oscillator1, oscillator2, gainNode, filter, delay, feedback };
    }
    
    // Create OM chanting ambient
    createOmChanting(context, volume) {
        const oscillator1 = context.createOscillator(); // "O" sound
        const oscillator2 = context.createOscillator(); // "M" sound
        const gainNode = context.createGain();
        const filter = context.createBiquadFilter();
        
        // "O" sound - lower frequency
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(110, context.currentTime); // A2
        
        // "M" sound - higher frequency with vibrato
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(220, context.currentTime); // A3
        
        // Add subtle vibrato to "M"
        const lfo = context.createOscillator();
        const lfoGain = context.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(4, context.currentTime); // 4Hz vibrato
        lfoGain.gain.setValueAtTime(5, context.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator2.frequency);
        
        // Filter for chanting effect
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, context.currentTime);
        
        // Volume envelope - breathing pattern
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.12, context.currentTime + 3);
        
        // Connect audio graph
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator1.start();
        oscillator2.start();
        lfo.start();
        
        return { oscillator1, oscillator2, gainNode, filter, lfo, lfoGain };
    }
    
    // Create mantra music ambient
    createMantraMusic(context, volume) {
        const oscillator1 = context.createOscillator(); // Base tone
        const oscillator2 = context.createOscillator(); // Harmony
        const gainNode = context.createGain();
        const filter = context.createBiquadFilter();
        const delay = context.createDelay();
        
        // Base mantra tone (Sa - C4)
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(261.63, context.currentTime);
        
        // Harmony tone (Pa - G4)
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(392.00, context.currentTime);
        
        // Warm filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, context.currentTime);
        
        // Subtle delay for depth
        delay.delayTime.setValueAtTime(0.2, context.currentTime);
        
        // Gentle volume envelope
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * 0.1, context.currentTime + 4);
        
        // Connect audio graph
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(delay);
        delay.connect(context.destination);
        gainNode.connect(context.destination);
        
        oscillator1.start();
        oscillator2.start();
        
        return { oscillator1, oscillator2, gainNode, filter, delay };
    }
    
    // Stop background ambient
    stopBackgroundAmbient() {
        if (this.audioSystem.backgroundMusic) {
            this.audioSystem.backgroundMusic.pause();
            this.audioSystem.backgroundMusic = null;
        }
        
        if (this.audioSystem.currentAmbient) {
            // Stop generated ambient
            Object.values(this.audioSystem.currentAmbient).forEach(node => {
                if (node.stop) node.stop();
            });
            this.audioSystem.currentAmbient = null;
        }
        
        this.audioSystem.isPlaying = false;
        console.log('🎵 Background ambient stopped');
    }
    
    // Set ambient volume
    setAmbientVolume(volume) {
        this.audioSystem.volume = Math.max(0, Math.min(1, volume));
        
        if (this.audioSystem.backgroundMusic) {
            this.audioSystem.backgroundMusic.volume = this.audioSystem.volume;
        }
        
        // Update UI if audio controls are visible
        const volumeDisplay = document.getElementById('volume-display');
        if (volumeDisplay) {
            volumeDisplay.textContent = `${Math.round(this.audioSystem.volume * 100)}%`;
        }
        
        console.log(`🎵 Ambient volume set to ${Math.round(this.audioSystem.volume * 100)}%`);
    }
    
    // Fade ambient in/out
    fadeAmbient(fadeIn = true, duration = 2000) {
        if (!this.audioSystem.backgroundMusic && !this.audioSystem.currentAmbient) return;
        
        const targetVolume = fadeIn ? this.audioSystem.volume : 0;
        const startVolume = fadeIn ? 0 : this.audioSystem.volume;
        
        if (this.audioSystem.backgroundMusic) {
            this.audioSystem.backgroundMusic.volume = startVolume;
            this.audioSystem.backgroundMusic.volume = targetVolume;
        }
        
        console.log(`🎵 Ambient ${fadeIn ? 'faded in' : 'faded out'} over ${duration}ms`);
    }

    // ============================================
    // AUDIO CONTROLS UI
    // ============================================
    
    hideAllPanels() {
        // Hide all panels
        const panels = ['analytics-panel', 'audio-controls-panel'];
        panels.forEach(panelId => {
            const panel = document.getElementById(panelId);
            if (panel) {
                panel.style.display = 'none';
            }
        });
    }
    
    showAudioControls() {
        this.closeMenu();
        this.hideAllPanels();
        
        const audioPanel = document.getElementById('audio-controls-panel');
        if (!audioPanel) {
            this.createAudioControlsPanel();
        } else {
            audioPanel.style.display = 'block';
        }
        
        // Make panel draggable
        this.makePanelDraggable('audio-controls-panel');
        
        this.updateAudioControls();
    }
    
    hideAudioControls() {
        const audioPanel = document.getElementById('audio-controls-panel');
        if (audioPanel) {
            audioPanel.style.display = 'none';
        }
    }
    
    createAudioControlsPanel() {
        const panel = document.createElement('div');
        panel.id = 'audio-controls-panel';
        panel.className = 'overlay-panel';
        panel.innerHTML = `
            <div class="panel-content">
                <div class="panel-header">
                    <h2>🎵 Audio Controls</h2>
                    <button class="close-btn" onclick="framework.hideAudioControls()">&times;</button>
                </div>
                <div class="panel-body">
                    <div class="audio-controls">
                        <div class="control-group">
                            <label>Background Volume</label>
                            <div class="volume-control">
                                <input type="range" id="ambient-volume" min="0" max="100" value="30" 
                                       onchange="framework.setAmbientVolume(this.value / 100)">
                                <span id="volume-display">30%</span>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <label>Current Ambient</label>
                            <div class="ambient-info">
                                <span id="current-ambient">None</span>
                                <button onclick="framework.stopBackgroundAmbient()" class="btn btn-warning">Stop</button>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <label>Test Ambient Sounds</label>
                            <div class="ambient-tests">
                                <button onclick="framework.testAmbient('ocean_waves')" class="btn btn-info">🌊 Ocean</button>
                                <button onclick="framework.testAmbient('soft_drone')" class="btn btn-info">🎵 Drone</button>
                                <button onclick="framework.testAmbient('forest_night')" class="btn btn-info">🌲 Forest</button>
                                <button onclick="framework.testAmbient('meditation_music')" class="btn btn-info">🧘 Music</button>
                                <button onclick="framework.testAmbient('rain_sounds')" class="btn btn-info">🌧️ Rain</button>
                                <button onclick="framework.testAmbient('singing_bowls')" class="btn btn-info">🔔 Bowls</button>
                                <button onclick="framework.testAmbient('flute_music')" class="btn btn-info">🎶 Flute</button>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <label>Audio Settings</label>
                            <div class="audio-settings">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="auto-ambient" checked> Auto-play ambient during programs
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" id="fade-ambient" checked> Fade in/out ambient sounds
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.addAudioControlsCSS();
    }
    
    addAudioControlsCSS() {
        if (document.getElementById('audio-controls-css')) return;
        
        const style = document.createElement('style');
        style.id = 'audio-controls-css';
        style.textContent = `
            .overlay-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 20px 25px rgba(0,0,0,0.15);
                z-index: 1000;
                min-width: 400px;
                max-width: 90vw;
                max-height: 90vh;
                overflow: hidden;
            }
            
            .panel-content {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            
            .panel-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #4a5568;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .panel-header h2 {
                color: #ffffff;
                font-size: 1.25rem;
                font-weight: 700;
                text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                margin: 0;
            }
            
            .panel-header .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #000000;
                text-shadow: 0 0 3px rgba(255,255,255,0.8);
                font-weight: 600;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .panel-header .close-btn:hover {
                background: rgba(0,0,0,0.1);
                color: #000000;
                text-shadow: 0 0 5px rgba(255,255,255,1);
            }
            
            .panel-body {
                padding: 0;
                overflow-y: auto;
                flex: 1;
            }
            
            .audio-controls {
                padding: 1rem;
            }
            
            .control-group {
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
            
            .control-group label {
                display: block;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: #495057;
            }
            
            .volume-control {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .volume-control input[type="range"] {
                flex: 1;
                height: 6px;
                border-radius: 3px;
                background: #ddd;
                outline: none;
                -webkit-appearance: none;
            }
            
            .volume-control input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #667eea;
                cursor: pointer;
            }
            
            .volume-control input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #667eea;
                cursor: pointer;
                border: none;
            }
            
            .ambient-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem;
                background: white;
                border-radius: 6px;
                border: 1px solid #dee2e6;
            }
            
            .ambient-tests {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 0.5rem;
            }
            
            .ambient-tests .btn {
                font-size: 0.875rem;
                padding: 0.5rem;
                text-align: center;
            }
            
            .audio-settings {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: normal;
                cursor: pointer;
            }
            
            .checkbox-label input[type="checkbox"] {
                margin: 0;
            }
            
            .dark-mode .control-group {
                background: #4a5568;
                border-color: #718096;
            }
            
            .dark-mode .control-group label {
                color: #e2e8f0;
            }
            
            .dark-mode .ambient-info {
                background: #2d3748;
                border-color: #4a5568;
                color: #e2e8f0;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    updateAudioControls() {
        const volumeSlider = document.getElementById('ambient-volume');
        const volumeDisplay = document.getElementById('volume-display');
        const currentAmbient = document.getElementById('current-ambient');
        
        if (volumeSlider && volumeDisplay) {
            volumeSlider.value = Math.round(this.audioSystem.volume * 100);
            volumeDisplay.textContent = `${Math.round(this.audioSystem.volume * 100)}%`;
        }
        
        if (currentAmbient) {
            currentAmbient.textContent = this.audioSystem.isPlaying ? 'Playing' : 'None';
        }
    }
    
    testAmbient(ambientType) {
        // Stop current ambient
        this.stopBackgroundAmbient();
        
        // Initialize audio system if needed
        if (!this.audioSystem.audioContext) {
            this.initializeAudioSystem();
        }
        
        // Play test ambient
        this.playBackgroundAmbient(ambientType, this.audioSystem.volume);
        
        // Update display
        this.updateAudioControls();
        
        console.log(`🎵 Testing ambient: ${ambientType}`);
    }

    // ============================================
    // MEDITATION BELL SYSTEM
    // ============================================
    
    // Bell system for meditation exercises
    playBell(count = 1, type = 'single') {
        try {
            console.log(`🔔 Playing bell: ${count} rings, type: ${type}`);
            const bellSound = this.createBellSound();
            
            if (type === 'single') {
                // Single bell for exercise start
                this.playBellSequence(bellSound, count, 1000); // 1 second between bells
            } else if (type === 'continuous') {
                // Continuous ringing for program end
                this.playContinuousBell(bellSound);
            }
        } catch (error) {
            console.error('🔔 Bell system error:', error);
            // Fallback: show visual notification
            this.showBellNotification(`🔔 Bell ${count} (Audio unavailable)`);
        }
    }
    
    createBellSound() {
        try {
            // Use shared audio context or create new one
            let audioContext = this.audioSystem?.audioContext;
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.audioSystem.audioContext = audioContext;
            }
            
            // Resume audio context if suspended
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // Bell characteristics
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Base frequency
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5); // Decay
            
            // Envelope for bell-like sound
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1); // Attack
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2); // Decay
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            return { oscillator, gainNode, audioContext };
        } catch (error) {
            console.error('🔔 createBellSound error:', error);
            throw error;
        }
    }
    
    playBellSequence(bellSound, count, interval) {
        let currentCount = 0;
        
        const playNextBell = () => {
            if (currentCount < count) {
                try {
                    // Create new bell sound for each ring
                    const newBell = this.createBellSound();
                    newBell.oscillator.start();
                    newBell.oscillator.stop(newBell.audioContext.currentTime + 2);
                    
                    console.log(`🔔 Bell ${currentCount + 1}/${count} played`);
                } catch (error) {
                    console.error('🔔 Bell sequence error:', error);
                }
                
                currentCount++;
                setTimeout(playNextBell, interval);
            }
        };
        
        playNextBell();
    }
    
    playContinuousBell(bellSound) {
        // Continuous ringing for program completion
        const bellSound2 = this.createBellSound();
        bellSound2.oscillator.start();
        bellSound2.oscillator.stop(bellSound2.audioContext.currentTime + 5); // 5 seconds of ringing
        
        // Visual feedback for continuous bell
        this.showBellNotification('🔔 Program Complete - Continuous Bell Ringing');
    }
    
    showBellNotification(message) {
        // Show visual bell notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 3000;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            animation: bellPulse 2s ease-in-out;
        `;
        notification.textContent = message;
        
        // Add animation keyframes
        if (!document.getElementById('bell-animation-style')) {
            const style = document.createElement('style');
            style.id = 'bell-animation-style';
            style.textContent = `
                @keyframes bellPulse {
                    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    
    // ============================================
    // SESSION HISTORY & ANALYTICS
    // ============================================
    
    async recordSession(programId, duration, completed = true) {
        const session = {
            id: Date.now(),
            programId: programId,
            programName: this.getProgramName(programId),
            duration: duration,
            completed: completed,
            timestamp: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
            dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
            timeOfDay: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        // Get existing sessions
        const sessions = this.getSessions();
        sessions.push(session);
        
        // Keep only last 100 sessions to prevent storage bloat
        if (sessions.length > 100) {
            sessions.splice(0, sessions.length - 100);
        }
        
        // Save to localStorage
        localStorage.setItem('wellness_sessions', JSON.stringify(sessions));
        
        console.log('📊 Session recorded:', session);
        
        // Update streak counter
        this.updateStreakCounter();
        
        // Trigger analytics update if charts are visible
        if (document.getElementById('analytics-panel') && document.getElementById('analytics-panel').style.display !== 'none') {
            this.updateAnalyticsCharts();
        }
        
        return session;
    }
    
    getSessions() {
        const sessions = localStorage.getItem('wellness_sessions');
        return sessions ? JSON.parse(sessions) : [];
    }
    
    getProgramName(programId) {
        const program = this.programs[programId];
        return program ? program.name : 'Unknown Program';
    }
    
    updateStreakCounter() {
        const sessions = this.getSessions();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        // Calculate current streak
        let streak = 0;
        const uniqueDays = [...new Set(sessions.map(s => s.date))].sort().reverse();
        
        for (let i = 0; i < uniqueDays.length; i++) {
            const day = uniqueDays[i];
            const expectedDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            if (day === expectedDate) {
                streak++;
            } else {
                break;
            }
        }
        
        // Update streak display
        const streakElement = document.getElementById('streak-counter');
        if (streakElement) {
            streakElement.textContent = streak;
        }
        
        return streak;
    }
    
    getAnalyticsData() {
        const sessions = this.getSessions();
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        // Filter sessions from last 30 days
        const recentSessions = sessions.filter(session => 
            new Date(session.timestamp) >= thirtyDaysAgo
        );
        
        // Calculate statistics
        const totalSessions = recentSessions.length;
        const totalMinutes = recentSessions.reduce((sum, session) => sum + session.duration, 0);
        const averageSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;
        const completionRate = totalSessions > 0 ? 
            Math.round((recentSessions.filter(s => s.completed).length / totalSessions) * 100) : 0;
        
        // Most popular programs
        const programCounts = {};
        recentSessions.forEach(session => {
            programCounts[session.programId] = (programCounts[session.programId] || 0) + 1;
        });
        const mostPopular = Object.entries(programCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([programId, count]) => ({
                programId,
                name: this.getProgramName(programId),
                count
            }));
        
        // Sessions by day of week
        const dayStats = {};
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
            dayStats[day] = 0;
        });
        recentSessions.forEach(session => {
            dayStats[session.dayOfWeek] = (dayStats[session.dayOfWeek] || 0) + 1;
        });
        
        // Sessions by time of day
        const timeStats = {
            'Early Morning (5-8 AM)': 0,
            'Morning (8-12 PM)': 0,
            'Afternoon (12-5 PM)': 0,
            'Evening (5-9 PM)': 0,
            'Night (9 PM-5 AM)': 0
        };
        
        recentSessions.forEach(session => {
            const hour = new Date(session.timestamp).getHours();
            if (hour >= 5 && hour < 8) timeStats['Early Morning (5-8 AM)']++;
            else if (hour >= 8 && hour < 12) timeStats['Morning (8-12 PM)']++;
            else if (hour >= 12 && hour < 17) timeStats['Afternoon (12-5 PM)']++;
            else if (hour >= 17 && hour < 21) timeStats['Evening (5-9 PM)']++;
            else timeStats['Night (9 PM-5 AM)']++;
        });
        
        return {
            totalSessions,
            totalMinutes,
            averageSessionLength,
            completionRate,
            mostPopular,
            dayStats,
            timeStats,
            recentSessions
        };
    }
    
    showAnalytics() {
        const analyticsPanel = document.getElementById('analytics-panel');
        if (!analyticsPanel) {
            this.createAnalyticsPanel();
        }
        
        document.getElementById('analytics-panel').style.display = 'block';
        
        // Make panel draggable
        this.makePanelDraggable('analytics-panel');
        
        this.updateAnalyticsCharts();
    }
    
    hideAnalytics() {
        const analyticsPanel = document.getElementById('analytics-panel');
        if (analyticsPanel) {
            analyticsPanel.style.display = 'none';
        }
    }
    
    createAnalyticsPanel() {
        const analyticsHTML = `
            <div id="analytics-panel" class="analytics-panel" style="display: none;">
                <div class="analytics-header">
                    <h2>📊 Your Wellness Analytics</h2>
                    <button class="close-btn" onclick="window.framework.hideAnalytics()">✕</button>
                </div>
                
                <div class="analytics-content">
                    <!-- Stats Overview -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-number" id="total-sessions">0</div>
                            <div class="stat-label">Total Sessions</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="total-minutes">0</div>
                            <div class="stat-label">Total Minutes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="avg-session">0</div>
                            <div class="stat-label">Avg Session (min)</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number" id="completion-rate">0%</div>
                            <div class="stat-label">Completion Rate</div>
                        </div>
                        <div class="stat-card streak-card">
                            <div class="stat-number" id="streak-counter">0</div>
                            <div class="stat-label">🔥 Current Streak</div>
                        </div>
                    </div>
                    
                    <!-- Charts Section -->
                    <div class="charts-section">
                        <div class="chart-container">
                            <h3>📈 Sessions by Day of Week</h3>
                            <div id="day-chart" class="chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <h3>⏰ Sessions by Time of Day</h3>
                            <div id="time-chart" class="chart"></div>
                        </div>
                        
                        <div class="chart-container">
                            <h3>⭐ Most Popular Programs</h3>
                            <div id="programs-chart" class="chart"></div>
                        </div>
                    </div>
                    
                    <!-- Recent Sessions -->
                    <div class="recent-sessions">
                        <h3>📋 Recent Sessions</h3>
                        <div id="recent-sessions-list" class="sessions-list"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', analyticsHTML);
        
        // Add CSS for analytics
        this.addAnalyticsCSS();
    }
    
    addAnalyticsCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .analytics-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 2000;
                overflow-y: auto;
            }
            
            .analytics-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 2001;
            }
            
            .analytics-content {
                background: white;
                margin: 0;
                padding: 1rem;
                min-height: calc(100vh - 80px);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .stat-card {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                padding: 1.5rem;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border: 1px solid #dee2e6;
            }
            
            .streak-card {
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #8b4513;
            }
            
            .stat-number {
                font-size: 2rem;
                font-weight: bold;
                color: #667eea;
                margin-bottom: 0.5rem;
            }
            
            .streak-card .stat-number {
                color: #8b4513;
            }
            
            .stat-label {
                font-size: 0.9rem;
                color: #6c757d;
                font-weight: 500;
            }
            
            .charts-section {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .chart-container {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .chart-container h3 {
                margin: 0 0 1rem 0;
                color: #495057;
                font-size: 1.1rem;
            }
            
            .chart {
                min-height: 200px;
                display: flex;
                align-items: end;
                gap: 4px;
                padding: 1rem 0;
            }
            
            .bar {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 4px 4px 0 0;
                min-width: 30px;
                display: flex;
                align-items: end;
                justify-content: center;
                color: white;
                font-size: 0.8rem;
                font-weight: bold;
                padding: 0.5rem 0.25rem;
                position: relative;
            }
            
            .bar-label {
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.7rem;
                color: #6c757d;
                white-space: nowrap;
            }
            
            .sessions-list {
                max-height: 300px;
                overflow-y: auto;
            }
            
            .session-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                border-bottom: 1px solid #dee2e6;
                background: #f8f9fa;
                margin-bottom: 0.5rem;
                border-radius: 8px;
            }
            
            .session-info {
                flex: 1;
            }
            
            .session-name {
                font-weight: 600;
                color: #495057;
                margin-bottom: 0.25rem;
            }
            
            .session-details {
                font-size: 0.85rem;
                color: #6c757d;
            }
            
            .session-status {
                padding: 0.25rem 0.5rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .session-completed {
                background: #d4edda;
                color: #155724;
            }
            
            .session-incomplete {
                background: #f8d7da;
                color: #721c24;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .close-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            @media (max-width: 768px) {
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .charts-section {
                    grid-template-columns: 1fr;
                }
                
                .chart {
                    min-height: 150px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    updateAnalyticsCharts() {
        const data = this.getAnalyticsData();
        
        // Update stats
        document.getElementById('total-sessions').textContent = data.totalSessions;
        document.getElementById('total-minutes').textContent = data.totalMinutes;
        document.getElementById('avg-session').textContent = data.averageSessionLength;
        document.getElementById('completion-rate').textContent = data.completionRate + '%';
        document.getElementById('streak-counter').textContent = this.updateStreakCounter();
        
        // Update day of week chart
        this.createDayChart(data.dayStats);
        
        // Update time of day chart
        this.createTimeChart(data.timeStats);
        
        // Update programs chart
        this.createProgramsChart(data.mostPopular);
        
        // Update recent sessions
        this.updateRecentSessions(data.recentSessions.slice(-10).reverse());
    }
    
    createDayChart(dayStats) {
        const chart = document.getElementById('day-chart');
        chart.innerHTML = '';
        
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const maxValue = Math.max(...Object.values(dayStats));
        
        days.forEach(day => {
            const value = dayStats[day] || 0;
            const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
            
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${height}%`;
            bar.innerHTML = `
                <span class="bar-label">${day.substring(0, 3)}</span>
                ${value > 0 ? `<div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #495057;">${value}</div>` : ''}
            `;
            chart.appendChild(bar);
        });
    }
    
    createTimeChart(timeStats) {
        const chart = document.getElementById('time-chart');
        chart.innerHTML = '';
        
        const times = Object.keys(timeStats);
        const maxValue = Math.max(...Object.values(timeStats));
        
        times.forEach(time => {
            const value = timeStats[time];
            const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
            
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${height}%`;
            bar.innerHTML = `
                <span class="bar-label">${time.split(' ')[0]}</span>
                ${value > 0 ? `<div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #495057;">${value}</div>` : ''}
            `;
            chart.appendChild(bar);
        });
    }
    
    createProgramsChart(programs) {
        const chart = document.getElementById('programs-chart');
        chart.innerHTML = '';
        
        if (programs.length === 0) {
            chart.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 2rem;">No sessions yet. Start your first session!</div>';
            return;
        }
        
        const maxValue = Math.max(...programs.map(p => p.count));
        
        programs.forEach(program => {
            const height = (program.count / maxValue) * 100;
            
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${height}%`;
            bar.innerHTML = `
                <span class="bar-label">${program.name.substring(0, 8)}</span>
                <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: #495057;">${program.count}</div>
            `;
            chart.appendChild(bar);
        });
    }
    
    updateRecentSessions(sessions) {
        const container = document.getElementById('recent-sessions-list');
        container.innerHTML = '';
        
        if (sessions.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #6c757d; padding: 2rem;">No sessions yet. Start your first session!</div>';
            return;
        }
        
        sessions.forEach(session => {
            const item = document.createElement('div');
            item.className = 'session-item';
            item.innerHTML = `
                <div class="session-info">
                    <div class="session-name">${session.programName}</div>
                    <div class="session-details">
                        ${session.duration} min • ${session.dayOfWeek} • ${session.timeOfDay}
                    </div>
                </div>
                <div class="session-status ${session.completed ? 'session-completed' : 'session-incomplete'}">
                    ${session.completed ? '✓ Completed' : '○ Incomplete'}
                </div>
            `;
            container.appendChild(item);
        });
    }

    // ============================================
    // EXPORT / IMPORT USER DATA
    // ============================================
    
    exportUserData() {
        const userData = {
            version: '2.1',
            exportDate: new Date().toISOString(),
            sessions: this.getSessions(),
            aiPrograms: this.getAIPrograms(),
            aiExercises: this.getAIExercises(),
            settings: this.getUserSettings(),
            metadata: {
                totalSessions: this.getSessions().length,
                totalMinutes: this.getSessions().reduce((sum, session) => sum + session.duration, 0),
                exportReason: 'Backup and transfer data'
            }
        };
        
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `pranayama-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('📤 User data exported successfully');
        this.showNotification('User data exported successfully!', 'success');
    }
    
    importUserData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const userData = JSON.parse(e.target.result);
                    this.processImportedData(userData);
                } catch (error) {
                    console.error('❌ Error parsing import file:', error);
                    this.showNotification('Invalid file format. Please select a valid backup file.', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
    
    processImportedData(userData) {
        try {
            // Validate data structure
            if (!userData.version || !userData.exportDate) {
                throw new Error('Invalid backup file format');
            }
            
            let importedCount = 0;
            
            // Import sessions
            if (userData.sessions && Array.isArray(userData.sessions)) {
                const existingSessions = this.getSessions();
                const newSessions = userData.sessions.filter(session => 
                    !existingSessions.some(existing => existing.id === session.id)
                );
                
                if (newSessions.length > 0) {
                    const allSessions = [...existingSessions, ...newSessions];
                    localStorage.setItem('wellness_sessions', JSON.stringify(allSessions));
                    importedCount += newSessions.length;
                }
            }
            
            // Import AI programs
            if (userData.aiPrograms && Array.isArray(userData.aiPrograms)) {
                const existingPrograms = this.getAIPrograms();
                const newPrograms = userData.aiPrograms.filter(program => 
                    !existingPrograms.some(existing => existing.id === program.id)
                );
                
                if (newPrograms.length > 0) {
                    const allPrograms = [...existingPrograms, ...newPrograms];
                    localStorage.setItem('ai_programs', JSON.stringify(allPrograms));
                    importedCount += newPrograms.length;
                }
            }
            
            // Import AI exercises
            if (userData.aiExercises && Array.isArray(userData.aiExercises)) {
                const existingExercises = this.getAIExercises();
                const newExercises = userData.aiExercises.filter(exercise => 
                    !existingExercises.some(existing => existing.id === exercise.id)
                );
                
                if (newExercises.length > 0) {
                    const allExercises = [...existingExercises, ...newExercises];
                    localStorage.setItem('ai_exercises', JSON.stringify(allExercises));
                    importedCount += newExercises.length;
                }
            }
            
            // Import settings (merge with existing)
            if (userData.settings) {
                const existingSettings = this.getUserSettings();
                const mergedSettings = { ...existingSettings, ...userData.settings };
                localStorage.setItem('user_settings', JSON.stringify(mergedSettings));
            }
            
            console.log('📥 Import completed:', importedCount, 'items imported');
            this.showNotification(`Import successful! ${importedCount} items imported.`, 'success');
            
            // Refresh the app to show imported data
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('❌ Error processing import:', error);
            this.showNotification('Error importing data. Please check the file format.', 'error');
        }
    }
    
    getAIPrograms() {
        const programs = localStorage.getItem('ai_programs');
        return programs ? JSON.parse(programs) : [];
    }
    
    getAIExercises() {
        const exercises = localStorage.getItem('ai_exercises');
        return exercises ? JSON.parse(exercises) : [];
    }
    
    getUserSettings() {
        const settings = localStorage.getItem('user_settings');
        return settings ? JSON.parse(settings) : {};
    }
    
    showDataManagement() {
        const dataPanel = document.getElementById('data-management-panel');
        if (!dataPanel) {
            this.createDataManagementPanel();
        }
        
        document.getElementById('data-management-panel').style.display = 'block';
    }
    
    hideDataManagement() {
        const dataPanel = document.getElementById('data-management-panel');
        if (dataPanel) {
            dataPanel.style.display = 'none';
        }
    }
    
    createDataManagementPanel() {
        const dataHTML = `
            <div id="data-management-panel" class="data-management-panel" style="display: none;">
                <div class="data-header">
                    <h2>💾 Data Management</h2>
                    <button class="close-btn" onclick="window.framework.hideDataManagement()">✕</button>
                </div>
                
                <div class="data-content">
                    <!-- Export Section -->
                    <div class="data-section">
                        <h3>📤 Export Your Data</h3>
                        <p>Download all your sessions, AI programs, and settings as a backup file.</p>
                        <div class="data-stats">
                            <div class="stat-item">
                                <span class="stat-label">Sessions:</span>
                                <span class="stat-value" id="export-sessions-count">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">AI Programs:</span>
                                <span class="stat-value" id="export-programs-count">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">AI Exercises:</span>
                                <span class="stat-value" id="export-exercises-count">0</span>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="window.framework.exportUserData()">
                            📥 Export All Data
                        </button>
                    </div>
                    
                    <!-- Import Section -->
                    <div class="data-section">
                        <h3>📥 Import Data</h3>
                        <p>Restore your data from a backup file or import from another device.</p>
                        <div class="import-warning">
                            ⚠️ <strong>Warning:</strong> Importing will merge data. Duplicate items will be skipped.
                        </div>
                        <button class="btn btn-secondary" onclick="window.framework.importUserData()">
                            📤 Choose File to Import
                        </button>
                    </div>
                    
                    <!-- Clear Data Section -->
                    <div class="data-section danger-section">
                        <h3>🗑️ Clear Data</h3>
                        <p>Permanently delete all your data. This action cannot be undone.</p>
                        <div class="clear-options">
                            <button class="btn btn-danger" onclick="window.framework.clearAllData()">
                                🗑️ Clear All Data
                            </button>
                            <button class="btn btn-warning" onclick="window.framework.clearSessions()">
                                📊 Clear Sessions Only
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dataHTML);
        this.addDataManagementCSS();
        this.updateDataStats();
    }
    
    addDataManagementCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .data-management-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 2000;
                overflow-y: auto;
            }
            
            .data-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 2001;
            }
            
            .data-content {
                background: white;
                margin: 0;
                padding: 1rem;
                min-height: calc(100vh - 80px);
            }
            
            .data-section {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 12px;
                margin-bottom: 1.5rem;
                border: 1px solid #dee2e6;
            }
            
            .data-section h3 {
                margin: 0 0 1rem 0;
                color: #495057;
                font-size: 1.2rem;
            }
            
            .data-section p {
                color: #6c757d;
                margin-bottom: 1rem;
                line-height: 1.5;
            }
            
            .data-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
                padding: 1rem;
                background: white;
                border-radius: 8px;
                border: 1px solid #dee2e6;
            }
            
            .stat-item {
                text-align: center;
            }
            
            .stat-label {
                display: block;
                font-size: 0.85rem;
                color: #6c757d;
                margin-bottom: 0.25rem;
            }
            
            .stat-value {
                display: block;
                font-size: 1.5rem;
                font-weight: bold;
                color: #667eea;
            }
            
            .import-warning {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 0.75rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }
            
            .danger-section {
                background: #f8d7da;
                border-color: #f5c6cb;
            }
            
            .danger-section h3 {
                color: #721c24;
            }
            
            .clear-options {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                text-decoration: none;
                display: inline-block;
                text-align: center;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            }
            
            .btn-secondary {
                background: #6c757d;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #5a6268;
                transform: translateY(-2px);
            }
            
            .btn-danger {
                background: #dc3545;
                color: white;
            }
            
            .btn-danger:hover {
                background: #c82333;
                transform: translateY(-2px);
            }
            
            .btn-warning {
                background: #ffc107;
                color: #212529;
            }
            
            .btn-warning:hover {
                background: #e0a800;
                transform: translateY(-2px);
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .close-btn:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            @media (max-width: 768px) {
                .data-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .clear-options {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    updateDataStats() {
        const sessions = this.getSessions();
        const programs = this.getAIPrograms();
        const exercises = this.getAIExercises();
        
        document.getElementById('export-sessions-count').textContent = sessions.length;
        document.getElementById('export-programs-count').textContent = programs.length;
        document.getElementById('export-exercises-count').textContent = exercises.length;
    }
    
    clearAllData() {
        if (confirm('⚠️ Are you sure you want to delete ALL your data? This cannot be undone!')) {
            localStorage.removeItem('wellness_sessions');
            localStorage.removeItem('ai_programs');
            localStorage.removeItem('ai_exercises');
            localStorage.removeItem('user_settings');
            
            this.showNotification('All data cleared successfully.', 'success');
            this.hideDataManagement();
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }
    
    clearSessions() {
        if (confirm('⚠️ Are you sure you want to delete all your session history? This cannot be undone!')) {
            localStorage.removeItem('wellness_sessions');
            
            this.showNotification('Session history cleared successfully.', 'success');
            this.hideDataManagement();
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    // ============================================
    // PWA / OFFLINE SUPPORT
    // ============================================
    
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('./service-worker.js');
                console.log('✅ Service Worker registered:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    console.log('🔄 Service Worker update found');
                    
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            if (confirm('📱 New version available! Reload to update?')) {
                                newWorker.postMessage({ type: 'SKIP_WAITING' });
                                window.location.reload();
                            }
                        }
                    });
                });
                
                // Handle controller change
                navigator.serviceWorker.addEventListener('controllerchange', () => {
                    console.log('🔄 Service Worker controller changed');
                });
                
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        } else {
            console.log('ℹ️ Service Workers not supported in this browser');
        }
    }
    
    async checkOfflineStatus() {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            return caches.has('pranayama-wellness-v2.1');
        }
        return false;
    }
    
    setupOfflineDetection() {
        const offlineIndicator = document.getElementById('offline-indicator');
        
        const updateOnlineStatus = () => {
            if (!navigator.onLine) {
                if (offlineIndicator) {
                    offlineIndicator.style.display = 'block';
                }
                console.log('📴 App is offline');
            } else {
                if (offlineIndicator) {
                    offlineIndicator.style.display = 'none';
                }
                console.log('📶 App is online');
            }
        };
        
        // Check initial status
        updateOnlineStatus();
        
        // Listen for status changes
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    }
    
    // ============================================
    // AUDIO SYSTEM & BELL FUNCTIONS
    // ============================================
    
    initializeAudioSystem() {
        try {
            if (!this.audioSystem.audioContext) {
                this.audioSystem.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.audioSystem.isInitialized = true;
                console.log('🎵 Audio system initialized');
            }
        } catch (error) {
            console.error('❌ Audio system initialization failed:', error);
        }
    }
    
    initializeMobileAudio() {
        // Mobile audio compatibility for iOS and Android
        try {
            // Enable audio context on first user interaction for mobile devices
            const enableAudio = () => {
                if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
                    this.audioSystem.audioContext.resume().then(() => {
                        console.log('🎵 Mobile audio context resumed');
                    });
                }
                document.removeEventListener('touchstart', enableAudio);
                document.removeEventListener('click', enableAudio);
            };
            
            // Add listeners for mobile interaction
            document.addEventListener('touchstart', enableAudio, { once: true });
            document.addEventListener('click', enableAudio, { once: true });
            
            console.log('📱 Mobile audio compatibility initialized');
        } catch (error) {
            console.error('Error initializing mobile audio:', error);
        }
    }
    
    // Extract YouTube video ID from URL
    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
    
    // Create YouTube player with iPhone compatibility
    createYouTubePlayer(videoUrl, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return null;
        
        // Extract video ID from URL
        const videoId = this.extractYouTubeId(videoUrl);
        if (!videoId) {
            console.error('Invalid YouTube URL:', videoUrl);
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: #666;">
                    <h3>🎬 Invalid Video URL</h3>
                    <p>Cannot load this YouTube video.</p>
                </div>
            `;
            return null;
        }
        
        // Create iframe for YouTube with iPhone compatibility
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.id = 'youtube-player';
        iframe.style.border = 'none';
        
        // Add iPhone-specific attributes
        iframe.setAttribute('playsinline', 'true');
        iframe.setAttribute('webkit-playsinline', 'true');
        
        container.innerHTML = '';
        container.appendChild(iframe);
        
        console.log('📺 YouTube player created for:', videoId);
        return iframe;
    }
    
    // Manual audio unlock function for iPhone
    unlockAudio() {
        if (this.audioUnlocked) {
            this.showNotification('🔊 Audio already unlocked!', 'info');
            return;
        }
        
        // Create a silent audio to unlock the system
        const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=');
        silentAudio.volume = 0.01;
        silentAudio.play().then(() => {
            silentAudio.pause();
            this.audioUnlocked = true;
            console.log('📱 iPhone audio system manually unlocked');
            
            // Hide header button
            const headerBtn = document.getElementById('audio-unlock-btn');
            if (headerBtn) {
                headerBtn.style.display = 'none';
            }
            
            // Show success message
            this.showNotification('🔊 Audio unlocked! MP3 files should now play on iPhone.', 'success');
            
            // Refresh the execution view to hide the unlock button
            if (this.isRunning) {
                this.showExecutionView();
            }
        }).catch(err => {
            console.log('Manual audio unlock failed:', err.message);
            this.showNotification('❌ Audio unlock failed. Try tapping the screen first.', 'error');
        });
    }
    
    playBell(count = 1, type = 'single') {
        try {
            if (!this.audioSystem.audioContext) {
                this.initializeAudioSystem();
            }
            
            if (this.audioSystem.audioContext.state === 'suspended') {
                this.audioSystem.audioContext.resume();
            }
            
            console.log(`🔔 Playing bell: ${count} rings, type: ${type}`);
            
            if (type === 'single') {
                this.playBellSequence(count);
            } else if (type === 'continuous') {
                this.playContinuousBell();
            }
        } catch (error) {
            console.error('❌ Bell play failed:', error);
            this.showNotification('🔔 Bell sound unavailable', 'warning');
        }
    }
    
    createBellSound(frequency = 800, duration = 0.5, volume = 0.3) {
        try {
            const context = this.audioSystem.audioContext;
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.setValueAtTime(frequency, context.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, context.currentTime + duration);
            
            gainNode.gain.setValueAtTime(0, context.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, context.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
            
            oscillator.start(context.currentTime);
            oscillator.stop(context.currentTime + duration);
            
            return { oscillator, gainNode };
        } catch (error) {
            console.error('❌ Bell sound creation failed:', error);
            return null;
        }
    }
    
    playBellSequence(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createBellSound(800 + (i * 100), 0.5, 0.3);
                console.log(`🔔 Bell ${i + 1}/${count} played`);
            }, i * 600);
        }
    }
    
    playContinuousBell() {
        const context = this.audioSystem.audioContext;
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, context.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.5);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 2);
        
        console.log('🔔 Continuous bell playing');
    }
    
    showBellNotification(message) {
        this.showNotification(message, 'info');
    }
    
    // Test functions
    testBellSystem() {
        console.log('🔔 Testing bell system...');
        this.playBell(1, 'single');
        setTimeout(() => this.playBell(3, 'single'), 2000);
        setTimeout(() => this.playBell(0, 'continuous'), 5000);
    }
    
    testAudioSystem() {
        console.log('🎵 Testing audio system...');
        this.playBell(1, 'single');
        this.showNotification('🔔 Bell system test complete', 'success');
    }
    
    // ============================================
    // PROGRAM EXECUTION WITH BELLS
    // ============================================
    
    startMeditationProgram(programId) {
        const program = this.programs[programId];
        if (!program) {
            console.error('Program not found:', programId);
            return;
        }
        
        console.log('🔔 Starting meditation program with bell system:', program.name);
        
        // Initialize audio system if not already done
        if (!this.audioSystem.audioContext) {
            this.initializeAudioSystem();
        }
        
        // Resume audio context on user interaction to fix autoplay
        if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🎵 Audio context resumed for program start');
                this.startProgramAudio(program);
            });
        } else {
            this.startProgramAudio(program);
        }
    }
    
    startProgramAudio(program) {
        // Set program state
        this.isRunning = true;
        this.currentProgramData = program;
        this.currentExerciseIndex = 0;
        
        // Show program execution modal
        this.showProgramExecution(program.name);
        
        // Show program start notification
        this.showBellNotification(`🔔 Starting: ${program.name}`);
        
        // Play opening bell (single ring)
        this.playBell(1, 'single');
        
        // Start exercise sequence with audio management
        this.executeExerciseWithAudio(program.exercises, 0);
    }
    
    executeExerciseSequence(exercises, currentIndex) {
        if (currentIndex >= exercises.length) {
            // Program complete - play continuous bell
            this.playBell(0, 'continuous');
            this.showBellNotification('🎉 Program complete! Thank you for your practice.');
            return;
        }
        
        const exercise = exercises[currentIndex];
        const exerciseData = this.exercises[exercise.exerciseId];
        
        if (!exerciseData) {
            console.error('Exercise not found:', exercise.exerciseId);
            this.executeExerciseSequence(exercises, currentIndex + 1);
            return;
        }
        
        console.log(`Starting exercise: ${exerciseData.name} Duration: ${exercise.duration} seconds`);
        
        // Play bell for this exercise (number of rings = exercise number)
        const bellCount = currentIndex + 1;
        this.playBell(bellCount, 'single');
        
        // Show exercise notification
        this.showBellNotification(`🔔 Exercise ${bellCount}: ${exerciseData.name}`);
        
        // Set timer for next exercise
        setTimeout(() => {
            this.executeExerciseSequence(exercises, currentIndex + 1);
        }, exercise.duration * 1000);
    }
    
    // Quick start function
    quickStart() {
        // Test audio first
        this.testAudioBeforeStart();
        
        // Prioritize beginner-friendly programs for first-time users
        const quickStartPrograms = ['first_time_user', 'quick_session', 'morning_meditation', 'stress_anxiety_relief'];
        let selectedProgram = null;
        
        for (const programId of quickStartPrograms) {
            if (this.programs[programId]) {
                selectedProgram = programId;
                break;
            }
        }
        
        if (!selectedProgram) {
            // Fallback to first available program
            selectedProgram = Object.keys(this.programs)[0];
        }
        
        if (selectedProgram) {
            this.selectedProgram = selectedProgram;
            this.startMeditationProgram(selectedProgram);
            const programName = this.programs[selectedProgram]?.name || 'meditation';
            this.showNotification(`🚀 Quick Start launched! Enjoy your ${programName} session.`, 'success');
        } else {
            this.showNotification('❌ No programs available for quick start.', 'error');
        }
    }
    
    testAudioBeforeStart() {
        // Test if audio context is working
        if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🎵 Audio context resumed for Quick Start');
            });
        }
        
        // Test bell system
        this.playBell(1, 'single');
    }
    
    // ============================================
    // AUDIO MANAGEMENT SYSTEM
    // ============================================
    
    // Play audio files for an exercise
    playExerciseAudio(exerciseData) {
        if (!exerciseData || !exerciseData.audioFiles) {
            console.log('No audio files for this exercise');
            return;
        }
        
        console.log('🎵 Playing audio for exercise:', exerciseData.name);
        
        // Clear any existing audio
        this.stopAllAudio();
        
        // Play each audio file
        exerciseData.audioFiles.forEach(audioFile => {
            if (audioFile.mediaId && this.mediaRegistry && this.mediaRegistry[audioFile.mediaId]) {
                // Prefer unified desktop/mobile path
                if (typeof this.playAudioFileMobile === 'function') {
                    this.playAudioFileMobile(audioFile);
                } else {
                    this.playAudioFile(audioFile);
                }
            }
        });
    }
    
    // Play a specific audio file
    playAudioFile(audioFile) {
        const mediaData = this.mediaRegistry[audioFile.mediaId];
        if (!mediaData || !mediaData.file) {
            console.log('❌ Media file not found:', audioFile.mediaId);
            console.log('Available media files:', Object.keys(this.mediaRegistry));
            return;
        }
        
        console.log('🎵 Loading audio file:', mediaData.file);
        const audioElement = new Audio(mediaData.file);
        audioElement.volume = (audioFile.volume || 50) / 100;
        audioElement.loop = audioFile.loop || false;
        
        // Add error handling for audio loading
        audioElement.addEventListener('error', (e) => {
            console.warn('Audio file failed to load:', mediaData.file, e);
            // Remove from current audio elements if it fails
            const index = this.currentAudioElements.indexOf(audioElement);
            if (index > -1) {
                this.currentAudioElements.splice(index, 1);
            }
        });
        
        // Store reference for pause/resume control
        this.currentAudioElements.push(audioElement);
        
        // Play the audio with better error handling
        audioElement.play().catch(error => {
            console.warn('Error playing audio:', mediaData.name, error.message);
            // Don't show error for autoplay policy issues
            if (!error.message.includes('autoplay') && !error.message.includes('user gesture')) {
                console.error('Audio playback failed:', error);
            }
        });
        
        // Auto-stop after duration if specified
        if (audioFile.playDuration && audioFile.playDuration < 99999) {
            setTimeout(() => {
                if (audioElement && !audioElement.paused) {
                    audioElement.pause();
                }
            }, audioFile.playDuration * 1000);
        }
        
        console.log('🎵 Playing:', mediaData.name, 'Volume:', audioElement.volume);
    }
    
    // Pause all active audio
    pauseAllAudio() {
        console.log('⏸️ Pausing all audio...');
        this.isAudioPaused = true;
        this.audioPauseTime = Date.now();
        
        this.currentAudioElements.forEach(audioElement => {
            if (audioElement && !audioElement.paused) {
                audioElement.pause();
            }
        });
        
        // Pause speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.pause();
        }
    }
    
    // Resume all paused audio
    resumeAllAudio() {
        console.log('▶️ Resuming all audio...');
        this.isAudioPaused = false;
        
        this.currentAudioElements.forEach(audioElement => {
            if (audioElement && audioElement.paused) {
                audioElement.play().catch(error => {
                    console.error('Error resuming audio:', error);
                });
            }
        });
        
        // Resume speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.resume();
        }
    }
    
    // Pause all media types (audio, video, YouTube, slideshow)
    pauseAllMedia() {
        this.pauseAllAudio();
        const videoElement = document.getElementById('exercise-video');
        if (videoElement && !videoElement.paused) {
            videoElement.pause();
        }
        const youtubePlayer = document.getElementById('youtube-player');
        if (youtubePlayer && youtubePlayer.contentWindow) {
            try { youtubePlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); } catch (_) {}
        }
        if (this.slideshowTimer) {
            clearTimeout(this.slideshowTimer);
            this.slideshowTimer = null;
        }
    }
    
    // Try to resume media (best-effort)
    resumeAllMedia() {
        this.resumeAllAudio();
        const videoElement = document.getElementById('exercise-video');
        if (videoElement && videoElement.paused) {
            videoElement.play().catch(() => {});
        }
        const youtubePlayer = document.getElementById('youtube-player');
        if (youtubePlayer && youtubePlayer.contentWindow) {
            try { youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*'); } catch (_) {}
        }
    }
    
    // Stop all audio completely
    stopAllAudio() {
        console.log('🛑 Stopping all audio...');
        this.isAudioPaused = false;
        
        this.currentAudioElements.forEach(audioElement => {
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        });
        
        // Clear the array
        this.currentAudioElements = [];
        
        // Stop speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        
        // Stop any background ambient
        if (this.audioSystem.backgroundAmbient) {
            this.stopBackgroundAmbient();
        }
    }
    
    // Stop all media completely
    stopAllMedia() {
        this.stopAllAudio();
        this.stopAllExerciseMedia();
        if (typeof this.stopSlideshow === 'function') {
            this.stopSlideshow();
        }
        if (typeof this.stopBackgroundMusic === 'function') {
            this.stopBackgroundMusic();
        }
        if (typeof this.stopBreathingCues === 'function') {
            this.stopBreathingCues();
        }
    }
    
    // Enhanced exercise execution with audio management
    executeExerciseWithAudio(exercises, currentIndex) {
        if (currentIndex >= exercises.length) {
            // Program complete - stop all media and play final bell
            this.stopAllMedia();
            this.playBell(0, 'continuous');
            this.showBellNotification('🎉 Program complete! Thank you for your practice.');
            
            // Hide execution modal
            this.hideProgramExecution();
            
            // Return to main programs page
            this.returnToProgramsPage();
            
            // Reset state
            this.isRunning = false;
            this.currentProgramData = null;
            this.currentExerciseIndex = 0;
            return;
        }
        
        const exercise = exercises[currentIndex];
        const exerciseData = this.exercises[exercise.exerciseId];
        
        if (!exerciseData) {
            console.error('Exercise not found:', exercise.exerciseId);
            this.executeExerciseWithAudio(exercises, currentIndex + 1);
            return;
        }
        
        // Update current exercise index
        this.currentExerciseIndex = currentIndex;
        
        console.log(`Starting exercise: ${exerciseData.name} Duration: ${exercise.duration} seconds`);
        
        // Update execution UI
        this.updateExecutionUI(
            exerciseData.name,
            currentIndex,
            exercises.length,
            exerciseData.instructions
        );
        
        // Play bell for this exercise
        const bellCount = currentIndex + 1;
        this.playBell(bellCount, 'single');
        
        // Show exercise notification
        this.showBellNotification(`🔔 Exercise ${bellCount}: ${exerciseData.name}`);
        
        // Play exercise audio
        this.playExerciseAudio(exerciseData);
        
        // If this is Sanskrit closing, recite mantras
        if (exerciseData.type === 'closing' && exerciseData.mantras) {
            console.log('🕉️ Sanskrit closing detected - starting mantra recitation');
            this.reciteMantras(exerciseData);
        }
        
        // Set timer for next exercise
        this.exerciseTimer = setTimeout(() => {
            this.executeExerciseWithAudio(exercises, currentIndex + 1);
        }, exercise.duration * 1000);
    }
    
    // ============================================
    // PROGRAM EXECUTION CONTROL
    // ============================================
    
    // Show program execution modal
    showProgramExecution(programName) {
        const modal = document.getElementById('program-execution-modal');
        const title = document.getElementById('execution-title');
        title.textContent = `${programName} - In Progress`;
        modal.style.display = 'flex';
    }
    
    // Hide program execution modal
    hideProgramExecution() {
        const modal = document.getElementById('program-execution-modal');
        modal.style.display = 'none';
    }
    
    // Update execution UI
    updateExecutionUI(exerciseName, exerciseIndex, totalExercises, instructions) {
        const exerciseNameEl = document.getElementById('current-exercise-name');
        const progressEl = document.getElementById('exercise-progress');
        const programProgressEl = document.getElementById('program-progress');
        const instructionsEl = document.getElementById('current-exercise-instructions');
        
        if (exerciseNameEl) exerciseNameEl.textContent = exerciseName;
        if (progressEl) progressEl.textContent = `Exercise ${exerciseIndex + 1} of ${totalExercises}`;
        if (programProgressEl) programProgressEl.textContent = `Program Progress: ${Math.round(((exerciseIndex + 1) / totalExercises) * 100)}%`;
        if (instructionsEl) instructionsEl.textContent = instructions || 'Follow the audio guidance and breathe naturally.';
    }
    
    // Toggle pause/resume
    togglePauseResume() {
        const btn = document.getElementById('pause-resume-btn');
        
        if (this.isAudioPaused) {
            // Resume
            this.resumeAllMedia();
            btn.innerHTML = '⏸️ Pause';
            btn.className = 'btn btn-warning';
            console.log('▶️ Program resumed');
            
            // Resume exercise timer if it was paused
            if (this.exerciseTimer && this.audioPauseTime) {
                const pauseDuration = Date.now() - this.audioPauseTime;
                // Note: Timer will continue from where it left off
                console.log('⏰ Exercise timer resumed');
            }
        } else {
            // Pause
            this.pauseAllMedia();
            btn.innerHTML = '▶️ Resume';
            btn.className = 'btn btn-success';
            console.log('⏸️ Program paused');
            
            // Note: Exercise timer continues running, only audio is paused
            // This allows the program to continue timing while audio is paused
        }
    }
    
    // Stop program completely
    stopProgram() {
        console.log('🛑 Stopping program...');
        
        // Stop all media (audio, video, images, timers)
        this.stopAllMedia();
        
        // Clear any timers
        if (this.exerciseTimer) {
            clearTimeout(this.exerciseTimer);
            this.exerciseTimer = null;
        }
        
        // Reset state
        this.isRunning = false;
        this.currentProgramData = null;
        this.currentExerciseIndex = 0;
        this.isAudioPaused = false;
        
        // Hide execution modal
        this.hideProgramExecution();
        
        // Return to main programs page
        this.returnToProgramsPage();
        
        // Show notification
        this.showNotification('🛑 Program stopped', 'info');
    }
    
    // Return to main programs page
    returnToProgramsPage() {
        // Remove execution view if it exists
        const executionView = document.getElementById('execution-view');
        if (executionView) {
            executionView.remove();
        }
        
        // Show programs section
        const programsSection = document.querySelector('.programs-section');
        if (programsSection) {
            programsSection.style.display = 'block';
        }
        
        // Reset selected program
        this.selectedProgram = null;
        
        // Clear any selected program cards
        document.querySelectorAll('.program-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        console.log('🏠 Returned to programs page');
    }
    
    // Start program from detail modal
    startProgramFromDetail() {
        const programId = this.selectedProgram;
        if (!programId) {
            this.showNotification('❌ No program selected', 'error');
            return;
        }
        
        // Get the custom duration from the input
        const customDuration = parseInt(document.getElementById('program-detail-duration').value);
        
        // Close detail modal
        this.closeProgramDetail();
        
        // Use the same execution flow as double-click (with progress bars)
        this.startProgram(customDuration);
    }
    
    // ============================================
    // EXERCISE MANAGER
    // ============================================
    
    // Render exercise manager content (called by openExerciseManager)
    renderExerciseManager() {
        const content = document.getElementById('exercise-manager-content');
        if (!content) return;
        
        content.innerHTML = '';
        
        // Add search/filter section
        const searchSection = document.createElement('div');
        searchSection.style.cssText = 'margin-bottom: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px;';
        searchSection.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #2d3748;">Exercise Library</h3>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <input type="text" id="exercise-search" placeholder="Search exercises..." 
                       style="flex: 1; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px;"
                       onkeyup="framework.filterExercises()">
                <select id="exercise-type-filter" onchange="framework.filterExercises()"
                        style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px;">
                    <option value="">All Types</option>
                    <option value="breathing">Breathing</option>
                    <option value="meditation">Meditation</option>
                    <option value="chanting">Chanting</option>
                    <option value="silence">Silence</option>
                    <option value="closing">Closing</option>
                </select>
            </div>
        `;
        content.appendChild(searchSection);
        
        // Add exercises list
        const exercisesList = document.createElement('div');
        exercisesList.id = 'exercises-list';
        exercisesList.style.cssText = 'display: grid; gap: 1rem;';
        content.appendChild(exercisesList);
        
        this.renderExercisesList();
    }
    
    // Render exercises list
    renderExercisesList() {
        const exercisesList = document.getElementById('exercises-list');
        if (!exercisesList || !this.exercises) return;
        
        exercisesList.innerHTML = '';
        
        const exercises = Object.values(this.exercises);
        exercises.forEach(exercise => {
            const exerciseCard = this.createExerciseCard(exercise);
            exercisesList.appendChild(exerciseCard);
        });
        
        console.log(`Rendered ${exercises.length} exercises in Exercise Manager`);
    }
    
    // Create exercise card
    createExerciseCard(exercise) {
        const card = document.createElement('div');
        card.setAttribute('data-exercise-id', exercise.id);
        card.style.cssText = `
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <div style="flex: 1;">
                    <h4 style="color: #2d3748; margin-bottom: 0.5rem; font-size: 1.125rem;">${exercise.name}</h4>
                    <p style="color: #718096; font-size: 0.875rem; margin-bottom: 0.5rem;">${exercise.description}</p>
                    <div style="display: flex; gap: 1rem; font-size: 0.75rem; color: #a0aec0;">
                        <span>Type: ${exercise.type}</span>
                        <span>Duration: ${exercise.duration}s</span>
                        <span>Level: ${exercise.safetyLevel || 'beginner'}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-success" onclick="framework.testExercise('${exercise.id}')" 
                            style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                        ▶️ Test
                    </button>
                    <button class="btn btn-info" onclick="framework.showExerciseDetails('${exercise.id}')" 
                            style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                        📋 Details
                    </button>
                </div>
            </div>
            <div style="color: #4a5568; font-size: 0.875rem; line-height: 1.5;">
                ${exercise.instructions ? exercise.instructions.substring(0, 150) + '...' : 'No instructions available'}
            </div>
        `;
        
        return card;
    }
    
    // Test individual exercise
    testExercise(exerciseId) {
        const exercise = this.exercises[exerciseId];
        if (!exercise) {
            this.showNotification('❌ Exercise not found', 'error');
            return;
        }
        
        console.log('🧪 Testing exercise:', exercise.name);
        
        // Show notification
        this.showNotification(`🧪 Testing: ${exercise.name}`, 'info');
        
        // Play exercise audio
        this.playExerciseAudio(exercise);
        
        // If it has mantras, recite them
        if (exercise.mantras) {
            this.reciteMantras(exercise);
        }
        
        // Show exercise details
        this.showExerciseDetails(exerciseId);
    }
    
    // Show exercise details
    showExerciseDetails(exerciseId) {
        const exercise = this.exercises[exerciseId];
        if (!exercise) return;
        
        // Create modal for exercise details with image slideshow
        const modal = document.createElement('div');
        modal.id = 'exercise-details-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: flex; align-items: center;
            justify-content: center; z-index: 10000; color: white;
        `;
        
        let slideshowHTML = '';
        if (exercise.imageSlideshow && exercise.imageSlideshow.length > 0) {
            slideshowHTML = `
                <div style="margin-bottom: 20px;">
                    <h4>Visual Guide</h4>
                    <div id="slideshow-container" style="width: 400px; height: 300px; margin: 0 auto; position: relative; border: 2px solid #fff; border-radius: 8px;">
                        <img id="slideshow-image" src="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;" />
                        <div id="slideshow-info" style="position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 4px; font-size: 12px;"></div>
                    </div>
                    <div style="text-align: center; margin-top: 10px;">
                        <button onclick="framework.startSlideshow('${exerciseId}')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">▶️ Start Slideshow</button>
                        <button onclick="framework.stopSlideshow()" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 10px;">⏹️ Stop</button>
                    </div>
                </div>
            `;
        }
        
        modal.innerHTML = `
            <div style="background: #333; padding: 30px; border-radius: 12px; max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #fff;">${exercise.name}</h2>
                    <button onclick="document.getElementById('exercise-details-modal').remove()" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer;">&times;</button>
                </div>
                
                ${slideshowHTML}
                
                <div style="line-height: 1.6;">
                    <p><strong>Description:</strong> ${exercise.description}</p>
                    <p><strong>Type:</strong> ${exercise.type}</p>
                    <p><strong>Duration:</strong> ${exercise.duration} seconds</p>
                    <p><strong>Safety Level:</strong> ${exercise.safety || 'low_risk'}</p>
                    <p><strong>Intimacy Level:</strong> ${exercise.intimacyLevel || 'low'}</p>
                    <p><strong>Difficulty:</strong> ${exercise.difficulty || 'beginner'}</p>
                    
                    <h4>Instructions</h4>
                    <p>${exercise.instructions || 'No instructions available'}</p>
                    
                    <h4>Step-by-Step Cues</h4>
                    <ol>
                        ${exercise.cues ? exercise.cues.map(cue => `<li>${cue}</li>`).join('') : '<li>No cues available</li>'}
                    </ol>
                    
                    <p><strong>Audio Files:</strong> ${exercise.audioFiles ? exercise.audioFiles.length : 0} files</p>
                    <p><strong>Images:</strong> ${exercise.imageSlideshow ? exercise.imageSlideshow.length : 0} images</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="framework.testExercise('${exerciseId}')" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-right: 10px;">🎵 Test Exercise</button>
                    <button onclick="document.getElementById('exercise-details-modal').remove()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Store exercise data for slideshow
        this.currentSlideshowExercise = exercise;
    }
    
    // Slideshow control functions
    startSlideshow(exerciseId) {
        const exercise = this.exercises[exerciseId];
        if (!exercise || !exercise.imageSlideshow || exercise.imageSlideshow.length === 0) return;
        
        // Clear any existing slideshow state
        if (this.slideshowTimer) {
            clearTimeout(this.slideshowTimer);
            this.slideshowTimer = null;
        }
        
        // Reset slideshow state
        this.currentSlideIndex = 0;
        this.currentSlideshowExercise = exercise;
        
        // Clear any existing image
        const img = document.getElementById('slideshow-image');
        if (img) img.src = '';
        
        // Show slideshow container
        const container = document.getElementById('slideshow-container');
        if (container) {
            container.style.display = 'block';
        }
        
        // Start the slideshow
        this.showNextSlide(exercise.imageSlideshow, 0);
    }
    
    showNextSlide(slideshow, index) {
        // Check if slideshow is still active and for the current exercise
        if (!this.slideshowTimer && index > 0) {
            console.log('Slideshow stopped, not showing next slide');
            return;
        }
        
        if (index >= slideshow.length) {
            // Loop back to start
            this.showNextSlide(slideshow, 0);
            return;
        }
        
        const slide = slideshow[index];
        const mediaFile = this.mediaRegistry[slide.mediaId];
        
        if (!mediaFile) {
            console.error('Media file not found:', slide.mediaId);
            return;
        }
        
        const img = document.getElementById('slideshow-image');
        
        if (img) {
            // Preload image for better performance
            const imageLoader = new Image();
            imageLoader.onload = () => {
                // Double-check slideshow is still active before updating
                if (this.slideshowTimer || index === 0) {
                    img.src = mediaFile.file;
                    
                    // Adjust container height based on image aspect ratio
                    this.adjustSlideshowContainer(img);
                    
                    // Set timer for next slide using duration from JSON or default 5 seconds
                    const duration = slide.duration || 5;
                    this.slideshowTimer = setTimeout(() => {
                        this.showNextSlide(slideshow, index + 1);
                    }, duration * 1000);
                }
            };
            imageLoader.onerror = () => {
                console.warn('Failed to load image:', mediaFile.file);
                // Continue to next slide even if image fails to load
                const duration = slide.duration || 5;
                if (this.slideshowTimer || index === 0) {
                    this.slideshowTimer = setTimeout(() => {
                        this.showNextSlide(slideshow, index + 1);
                    }, duration * 1000);
                }
            };
            imageLoader.src = mediaFile.file;
        }
    }
    
    adjustSlideshowContainer(img) {
        const container = document.getElementById('slideshow-container');
        const wrapper = document.getElementById('slideshow-image-wrapper');
        
        if (!container || !wrapper || !img) return;
        
        // Get image dimensions
        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;
        
        if (imgWidth && imgHeight) {
            const aspectRatio = imgWidth / imgHeight;
            const maxWidth = 600; // Container max width
            const maxHeight = 400; // Container max height
            
            let newWidth = maxWidth;
            let newHeight = maxWidth / aspectRatio;
            
            // If height exceeds max, adjust based on height
            if (newHeight > maxHeight) {
                newHeight = maxHeight;
                newWidth = maxHeight * aspectRatio;
            }
            
            // Ensure minimum dimensions
            newWidth = Math.max(newWidth, 300);
            newHeight = Math.max(newHeight, 200);
            
            // Apply dimensions
            container.style.width = newWidth + 'px';
            wrapper.style.height = newHeight + 'px';
            
            console.log(`📐 Adjusted slideshow container: ${newWidth}x${newHeight} (aspect: ${aspectRatio.toFixed(2)})`);
        }
    }
    
    stopSlideshow() {
        if (this.slideshowTimer) {
            clearTimeout(this.slideshowTimer);
            this.slideshowTimer = null;
        }
        
        // Hide slideshow container
        const container = document.getElementById('slideshow-container');
        if (container) {
            container.style.display = 'none';
        }
        
        const img = document.getElementById('slideshow-image');
        if (img) img.src = '';
    }
    
    // Setup page unload handlers to stop all media
    setupPageUnloadHandlers() {
        // Stop all media when page is about to unload
        window.addEventListener('beforeunload', () => {
            console.log('🛑 Page unloading - stopping all media');
            this.stopAllMedia();
            this.stopAllAudio();
            this.stopAllExerciseMedia();
            
            // Stop speech synthesis
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            
            // Clear all timers
            if (this.exerciseTimer) {
                clearInterval(this.exerciseTimer);
                this.exerciseTimer = null;
            }
            
            if (this.slideshowTimer) {
                clearTimeout(this.slideshowTimer);
                this.slideshowTimer = null;
            }
        });
        
        // Stop media on page visibility change (when user switches tabs)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('🛑 Page hidden - pausing all media');
                this.pauseAllMedia();
            }
        });
        
        // Stop media on page focus loss
        window.addEventListener('blur', () => {
            console.log('🛑 Page lost focus - pausing all media');
            this.pauseAllMedia();
        });
    }
    
    // Automatic contrast detection for better readability
    detectContrast(element) {
        if (!element) return { textColor: '#000000', backgroundColor: '#ffffff' };
        
        // Get computed styles
        const styles = window.getComputedStyle(element);
        const backgroundColor = styles.backgroundColor;
        const currentColor = styles.color;
        
        // If no background color is set, try to detect from parent elements
        let bgColor = backgroundColor;
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            let parent = element.parentElement;
            while (parent && (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent')) {
                const parentStyles = window.getComputedStyle(parent);
                bgColor = parentStyles.backgroundColor;
                parent = parent.parentElement;
            }
        }
        
        // Parse RGB values
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!rgbMatch) {
            return { textColor: currentColor, backgroundColor: bgColor };
        }
        
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return appropriate text color based on background luminance
        const textColor = luminance > 0.5 ? '#000000' : '#ffffff';
        
        return { textColor, backgroundColor: bgColor };
    }
    
    // Apply automatic contrast to elements
    applyAutoContrast(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const contrast = this.detectContrast(element);
            element.style.color = contrast.textColor;
            
            // Add text shadow for better readability on complex backgrounds
            if (contrast.textColor === '#ffffff') {
                element.style.textShadow = '0 0 3px rgba(0,0,0,0.8)';
            } else {
                element.style.textShadow = '0 0 3px rgba(255,255,255,0.8)';
            }
        });
    }
    
    // Enhanced pause all media function
    pauseAllMedia() {
        // Pause all audio
        this.activeAudioTracks.forEach(audio => {
            if (audio && !audio.paused) {
                audio.pause();
            }
        });
        
        // Pause video
        if (this.activeVideoElement && !this.activeVideoElement.paused) {
            this.activeVideoElement.pause();
        }
        
        // Pause slideshow
        if (this.slideshowTimer) {
            clearTimeout(this.slideshowTimer);
            this.slideshowTimer = null;
        }
        
        // Stop speech synthesis
        if (window.speechSynthesis) {
            window.speechSynthesis.pause();
        }
    }
    
    // Filter exercises
    filterExercises() {
        const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
        const typeFilter = document.getElementById('exercise-type-filter').value;
        
        const exercisesList = document.getElementById('exercises-list');
        if (!exercisesList) return;
        
        const cards = exercisesList.querySelectorAll('[data-exercise-id]');
        cards.forEach(card => {
            const exerciseId = card.dataset.exerciseId;
            const exercise = this.exercises[exerciseId];
            
            if (!exercise) return;
            
            const matchesSearch = !searchTerm || 
                exercise.name.toLowerCase().includes(searchTerm) ||
                exercise.description.toLowerCase().includes(searchTerm);
            
            const matchesType = !typeFilter || exercise.type === typeFilter;
            
            if (matchesSearch && matchesType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Export exercises
    exportExercises() {
        const exercisesData = {
            exercises: this.exercises,
            mediaRegistry: this.mediaRegistry,
            exportDate: new Date().toISOString(),
            totalExercises: Object.keys(this.exercises).length
        };
        
        const dataStr = JSON.stringify(exercisesData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `exercises_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('📁 Exercises exported successfully!', 'success');
    }
    
    // ============================================
    // MANTRA RECITATION SYSTEM
    // ============================================
    
    reciteMantras(exerciseData) {
        if (!exerciseData || !exerciseData.mantras) {
            console.log('No mantras to recite');
            return;
        }
        
        console.log('🕉️ Starting mantra recitation...');
        
        // Recite each mantra with timing
        exerciseData.mantras.forEach((mantra, index) => {
            setTimeout(() => {
                this.reciteMantra(mantra, index + 1, exerciseData.mantras.length);
            }, index * 3000); // 3 seconds between mantras
        });
    }
    
    reciteMantra(mantra, current, total) {
        console.log(`🕉️ Reciting mantra ${current}/${total}: ${mantra.transliteration}`);
        
        // Show notification with mantra
        this.showNotification(`🕉️ ${mantra.transliteration} - ${mantra.meaning}`, 'info');
        
        // Use speech synthesis to recite the mantra
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(mantra.transliteration);
            utterance.rate = 0.6; // Slower for mantras
            utterance.pitch = 1.0;
            utterance.volume = 0.8;
            utterance.lang = 'en-US';
            
            utterance.onstart = () => {
                console.log(`🕉️ Speaking: ${mantra.transliteration}`);
            };
            
            utterance.onend = () => {
                console.log(`🕉️ Finished: ${mantra.transliteration}`);
            };
            
            speechSynthesis.speak(utterance);
        }
    }
    
    // Enhanced exercise execution with mantra recitation
    executeExerciseWithMantras(exercises, currentIndex) {
        if (currentIndex >= exercises.length) {
            // Program complete - play continuous bell
            this.playBell(0, 'continuous');
            this.showBellNotification('🎉 Program complete! Thank you for your practice.');
            return;
        }
        
        const exercise = exercises[currentIndex];
        const exerciseData = this.exercises[exercise.exerciseId];
        
        if (!exerciseData) {
            console.error('Exercise not found:', exercise.exerciseId);
            this.executeExerciseWithMantras(exercises, currentIndex + 1);
            return;
        }
        
        console.log(`Starting exercise: ${exerciseData.name} Duration: ${exercise.duration} seconds`);
        
        // Play bell for this exercise (number of rings = exercise number)
        const bellCount = currentIndex + 1;
        this.playBell(bellCount, 'single');
        
        // Show exercise notification
        this.showBellNotification(`🔔 Exercise ${bellCount}: ${exerciseData.name}`);
        
        // If this is Sanskrit closing, recite mantras
        if (exerciseData.type === 'closing' && exerciseData.mantras) {
            console.log('🕉️ Sanskrit closing detected - starting mantra recitation');
            this.reciteMantras(exerciseData);
        }
        
        // Set timer for next exercise
        setTimeout(() => {
            this.executeExerciseWithMantras(exercises, currentIndex + 1);
        }, exercise.duration * 1000);
    }
    
    // Show/hide header audio unlock button for iPhone users
    addAudioUnlockButton() {
        // Check if we're on iPhone/iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const audioBtn = document.getElementById('audio-unlock-btn');
        
        if (!audioBtn) {
            console.log('❌ Audio unlock button not found in header');
            return;
        }
        
        console.log('🔍 Audio button check:', {
            isIOS: isIOS,
            audioUnlocked: this.audioUnlocked,
            buttonExists: !!audioBtn
        });
        
        if (isIOS && !this.audioUnlocked) {
            // Show the button for iPhone users who haven't unlocked audio
            audioBtn.style.display = 'block';
            console.log('📱 iPhone audio unlock button shown in header');
        } else {
            // Hide the button for non-iOS or already unlocked
            audioBtn.style.display = 'none';
            console.log('📱 Audio unlock button hidden (not iOS or already unlocked)');
        }
    }
    
    // Offer to download new AI-generated exercises as JSON
    offerDownloadNewExercises(newExercises) {
        // Get all AI exercises from localStorage
        const allAIExercises = JSON.parse(localStorage.getItem('aiGeneratedExercises') || '{}');
        
        // Create download button in a modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 500px;
            width: 90%;
        `;
        
        modal.innerHTML = `
            <h3 style="margin: 0 0 1rem 0; color: #1a202c;">🎉 New Custom Exercises Created!</h3>
            <p style="margin-bottom: 1rem; color: #4a5568; line-height: 1.6;">
                AI just created <strong>${newExercises.length} new exercise(s)</strong> specifically for your goal!
                <br><br>
                These exercises are now available in your app. Would you like to download them as JSON 
                to add to your permanent exercise library?
            </p>
            <div style="margin-bottom: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                ${newExercises.map(ex => `
                    <div style="margin-bottom: 0.5rem;">
                        <strong style="color: #0284c7;">✨ ${ex.name}</strong>
                        <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.25rem;">
                            ${ex.description}
                            ${ex.pattern ? `<br>Pattern: ${ex.pattern.inhale}:${ex.pattern.hold || 0}:${ex.pattern.exhale}` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; gap: 1rem;">
                <button id="download-exercises-btn" class="btn btn-primary" style="flex: 1;">
                    📥 Download JSON
                </button>
                <button id="close-download-modal" class="btn btn-secondary" style="flex: 1;">
                    Later
                </button>
            </div>
        `;
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        `;
        
        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
        
        // Download button handler
        document.getElementById('download-exercises-btn').onclick = () => {
            // Create JSON file with all AI exercises
            const jsonData = JSON.stringify(allAIExercises, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-generated-exercises-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            
            this.showNotification('📥 Exercises downloaded! You can now add them to your exercise library.', 'success');
            backdrop.remove();
            modal.remove();
        };
        
        // Close button handler
        document.getElementById('close-download-modal').onclick = () => {
            backdrop.remove();
            modal.remove();
        };
        
        // Click backdrop to close
        backdrop.onclick = () => {
            backdrop.remove();
            modal.remove();
        };
    }
    
}

// Initialize global framework instance after script load
window.framework = new WellnessFramework();