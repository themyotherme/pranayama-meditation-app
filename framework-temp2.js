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
                this.playAudioFileMobile(audioFile);
            }
        });
    }
    
    // Play a specific audio file
    playAudioFile(audioFile) {
        const mediaData = this.mediaRegistry[audioFile.mediaId];
        if (!mediaData || !mediaData.file) {
            console.log('Media file not found:', audioFile.mediaId);
            return;
        }
        
        const audioElement = new Audio(mediaData.file);
        audioElement.volume = (audioFile.volume || 50) / 100;
        audioElement.loop = audioFile.loop || false;
        
        // Store reference for pause/resume control
        this.currentAudioElements.push(audioElement);
        
        // Play the audio
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
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
    }
    
    // ============================================
    // iOS COMPATIBILITY FIXES
    // ============================================
    
    // Initialize mobile audio on first user interaction (iOS + Android)
    initializeMobileAudio() {
        // YouTube-style approach: pre-load audio elements on page load
        this.preloadAudioElements();
        
        // No need for complex unlock mechanism - let video elements handle it
        console.log('🎵 Mobile audio initialized (YouTube-style)');
    }
    
    // Pre-load audio elements like YouTube does
    preloadAudioElements() {
        // Create a hidden video element to establish audio context
        const preloadVideo = document.createElement('video');
        preloadVideo.style.display = 'none';
        preloadVideo.muted = true;
        preloadVideo.playsInline = true;
        preloadVideo.setAttribute('webkit-playsinline', 'true');
        document.body.appendChild(preloadVideo);
        
        // Play silent video to unlock audio context
        preloadVideo.play().then(() => {
            console.log('🎵 Audio context unlocked (YouTube-style)');
            preloadVideo.remove();
        }).catch(() => {
            console.log('🎵 Audio context will unlock on first user interaction');
            preloadVideo.remove();
        });
    }
    
    // Enhanced audio file playing with mobile support (iOS + Android)
    playAudioFileMobile(audioFile) {
        const mediaData = this.mediaRegistry[audioFile.mediaId];
        if (!mediaData || !mediaData.file) {
            console.log('Media file not found:', audioFile.mediaId);
            return;
        }
        
        // Use video element like YouTube for better mobile compatibility
        const audioElement = document.createElement('video');
        audioElement.src = mediaData.file;
        audioElement.volume = (audioFile.volume || 50) / 100;
        audioElement.loop = audioFile.loop || false;
        audioElement.muted = false; // Start unmuted like YouTube
        audioElement.controls = false;
        audioElement.style.display = 'none';
        
        // Add to DOM for better mobile support
        document.body.appendChild(audioElement);
        
        // Mobile-specific attributes (iOS + Android)
        audioElement.preload = 'auto';
        audioElement.crossOrigin = 'anonymous';
        audioElement.playsInline = true; // Important for iOS
        audioElement.setAttribute('webkit-playsinline', 'true'); // iOS Safari
        audioElement.setAttribute('playsinline', 'true'); // Modern iOS
        
        // Store reference for cleanup
        if (!this.activeAudioElements) {
            this.activeAudioElements = [];
        }
        this.activeAudioElements.push(audioElement);
        
        // Play immediately like YouTube (no user gesture required)
        audioElement.play().catch(error => {
            console.log('Auto-play blocked, will require user interaction:', error);
            // If autoplay fails, show user prompt
            this.showNotification('🎵 Tap "Start Program" to enable audio', 'info');
        });
        
        // Clean up after audio ends
        audioElement.addEventListener('ended', () => {
            audioElement.remove();
            const index = this.activeAudioElements.indexOf(audioElement);
            if (index > -1) {
                this.activeAudioElements.splice(index, 1);
            }
        });
        
        // Store reference for pause/resume control
        this.currentAudioElements.push(audioElement);
        
        // Mobile audio context handling
        if (this.audioSystem.audioContext && this.audioSystem.audioContext.state === 'suspended') {
            this.audioSystem.audioContext.resume().then(() => {
                console.log('🎵 Audio context resumed for mobile');
                this.playAudioElementMobile(audioElement);
            });
        } else {
            this.playAudioElementMobile(audioElement);
        }
        
        console.log('🎵 Playing:', mediaData.name, 'Volume:', audioElement.volume);
    }
    
    // Play audio element with mobile compatibility (iOS + Android)
    playAudioElementMobile(audioElement) {
        // Try to play immediately
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
            
            // Mobile fallback - try again after user interaction
            if (error.name === 'NotAllowedError') {
                console.log('🎵 Mobile audio blocked, waiting for user interaction...');
                this.showNotification('🎵 Tap anywhere to enable audio', 'info');
                
                // Add click listener for mobile devices
                const enableAudio = () => {
                    audioElement.play().catch(e => {
                        console.error('Still blocked:', e);
                    });
                    document.removeEventListener('click', enableAudio);
                    document.removeEventListener('touchstart', enableAudio);
                };
                
                document.addEventListener('click', enableAudio);
                document.addEventListener('touchstart', enableAudio);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, creating framework...');
    window.framework = new WellnessFramework();
    console.log('✅ Framework instance created and available globally');
});
