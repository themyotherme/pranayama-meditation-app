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
