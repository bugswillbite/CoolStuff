// SCROLL ANIMATION EFFECTS (Bidirectional)
document.addEventListener("DOMContentLoaded", function () {
    
    // SCROLL ANIMATION SETUP
    function addScrollAnimations() {
        // Add animation classes to elements
        const sections = document.querySelectorAll('section');
        const productCards = document.querySelectorAll('.product-card, .product-card1');
        const headings = document.querySelectorAll('h2');
        
        // Add fade-in to sections
        sections.forEach((section, index) => {
            if (index > 0) { // Skip the home section
                section.classList.add('fade-in');
            }
        });
        
        // Add staggered animations to product cards
        productCards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('slide-in-left');
            } else {
                card.classList.add('slide-in-right');
            }
        });
        
        // Add scale animation to headings
        headings.forEach(heading => {
            heading.classList.add('scale-in');
        });
    }

    // INTERSECTION OBSERVER FOR BIDIRECTIONAL ANIMATIONS
    function observeElements() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is entering viewport - animate in
                    entry.target.classList.add('visible');
                } else {
                    // Element is leaving viewport - animate out
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // SMOOTH SCROLL FOR NAVIGATION
    function setupSmoothScroll() {
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // SWORD POPUP FUNCTIONALITY
    function setupSwordPopup() {
        const sword1 = document.getElementById('sword1');
        const sword2 = document.getElementById('sword2');
        const popup = document.getElementById('swordPopup');
        const closeBtn = document.getElementById('closePopup');

        // Open popup when clicking either sword
        function openPopup() {
            popup.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Close popup
        function closePopup() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Event listeners
        if (sword1) sword1.addEventListener('click', openPopup);
        if (sword2) sword2.addEventListener('click', openPopup);
        if (closeBtn) closeBtn.addEventListener('click', closePopup);

        // Close popup when clicking outside the content
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.style.display === 'block') {
                closePopup();
            }
        });
    }

    // PARALLAX SCROLL EFFECTS FOR HEADER
    function setupHeaderParallax() {
        const subtitle = document.querySelector('.subTitle');
        const nav = document.querySelector('nav');
        
        if (!subtitle || !nav) return;

        let lastScrollY = 0;
        let scrollDirection = 'down';

        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Determine scroll direction
            scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = scrollY;
            
            // Subtitle fade effect
            const fadeDistance = windowHeight * 0.3; // Fade over 30% of viewport height
            const subtitleOpacity = Math.max(0, 1 - (scrollY / fadeDistance));
            const subtitleTranslateY = scrollY * 0.3; // Reduced movement to prevent overlap
            
            // Nav movement with buffer animation
            let navTransform = 0;
            
            if (scrollY <= 50) {
                // Near the top - reset to original position or add buffer
                if (scrollDirection === 'up' && scrollY < 20) {
                    navTransform = 0; // Reset to original position
                } else {
                    navTransform = Math.min(scrollY * 0.2, 10); // Small buffer movement down
                }
            } else {
                // Further down - normal upward movement
                const navMoveDistance = Math.min(scrollY * 0.4, 25);
                navTransform = -navMoveDistance;
            }
            
            // Apply the effects
            subtitle.style.opacity = subtitleOpacity;
            subtitle.style.transform = `translateY(-${subtitleTranslateY}px)`;
            nav.style.transform = `translateY(${navTransform}px)`;
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Set initial state
        handleScroll();
    }

    // SETTINGS MENU FUNCTIONALITY
    function setupSettingsMenu() {
        const settingsMenuToggle = document.getElementById('settingsMenuToggle');
        const settingsMenu = document.getElementById('settingsMenu');
        const animationToggle = document.getElementById('animationToggle');
        const flyingElements = document.querySelector('.flying-elements');
        const toggleText = animationToggle.querySelector('.toggle-text');
        
        if (!settingsMenuToggle || !settingsMenu || !animationToggle || !flyingElements) return;

        let menuOpen = false;
        let animationsEnabled = true;

        // Toggle settings menu
        function toggleSettingsMenu() {
            menuOpen = !menuOpen;
            settingsMenu.classList.toggle('active', menuOpen);
        }

        // Toggle animations
        function toggleAnimations() {
            animationsEnabled = !animationsEnabled;
            
            if (animationsEnabled) {
                // Enable animations
                flyingElements.style.display = 'block';
                flyingElements.style.animationPlayState = 'running';
                toggleText.textContent = 'ON';
                animationToggle.classList.remove('disabled');
                
                // Re-enable individual animations
                const flyingImages = flyingElements.querySelectorAll('img');
                flyingImages.forEach(img => {
                    img.style.animationPlayState = 'running';
                });
            } else {
                // Disable animations
                flyingElements.style.display = 'none';
                toggleText.textContent = 'OFF';
                animationToggle.classList.add('disabled');
            }
        }

        // Close menu when clicking outside
        function handleClickOutside(event) {
            if (menuOpen && !settingsMenu.contains(event.target) && !settingsMenuToggle.contains(event.target)) {
                menuOpen = false;
                settingsMenu.classList.remove('active');
            }
        }

        // Event listeners
        settingsMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSettingsMenu();
        });

        animationToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleAnimations();
        });

        document.addEventListener('click', handleClickOutside);

        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOpen) {
                menuOpen = false;
                settingsMenu.classList.remove('active');
            }
        });
        
        // Initialize states
        toggleText.textContent = 'ON';
    }

    // MUSIC PLAYER FUNCTIONALITY
    function setupMusicPlayer() {
        const musicMenuToggle = document.getElementById('musicMenuToggle');
        const musicPopup = document.getElementById('musicPopup');
        const closeMusicPopup = document.getElementById('closeMusicPopup');
        const songButtons = document.querySelectorAll('.song-btn');
        const currentGenre = document.getElementById('currentGenre');
        const currentSongTitle = document.getElementById('currentSongTitle');
        const radioDescription = document.getElementById('radioDescription');
        const radioDescriptionDupe = document.getElementById('radioDescriptionDupe');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const volumeBtn = document.getElementById('volumeBtn');
        const volumeSlider = document.getElementById('volumeSlider');

        let currentAudio = null;
        let isPlaying = false;
        let isMuted = false;
        let currentVolume = 0.5;

        // Song data (you can replace these with actual audio file URLs)
        const songs = {
            'cyber-dreams': {
                name: 'Hip Hop',
                songTitle: 'Song 1',
                albumCover: 'imgs/pngs-gifs/everythingpossible.png',
                url: 'music/cyber-dreams.mp3' // Replace with actual audio file
            },
            'neon-nights': {
                name: 'Smooth Jazz',
                songTitle: 'Song 2',
                albumCover: 'imgs/pngs-gifs/ikeaAlien.png',
                url: 'music/neon-nights.mp3' // Replace with actual audio file
            },
            'digital-rain': {
                name: 'Ambient',
                songTitle: 'Song 3',
                albumCover: 'imgs/pngs-gifs/aeroglasses.gif',
                url: 'music/digital-rain.mp3' // Replace with actual audio file
            },
            'retro-wave': {
                name: 'House',
                songTitle: 'Song 4',
                albumCover: 'imgs/pngs-gifs/lighting.gif',
                url: 'music/retro-wave.mp3' // Replace with actual audio file
            },
            'synthwave': {
                name: 'Techno',
                songTitle: 'Song 5',
                albumCover: 'imgs/pngs-gifs/bat.gif',
                url: 'music/synthwave.mp3' // Replace with actual audio file
            },
            'lo-fi-beats': {
                name: 'Pop',
                songTitle: 'Song 6',
                albumCover: 'imgs/pngs-gifs/hand.png',
                url: 'music/lo-fi-beats.mp3' // Replace with actual audio file
            },
            'synthpop': {
                name: 'Dance',
                songTitle: 'Song 7',
                albumCover: 'imgs/pngs-gifs/lighting2.gif',
                url: 'music/synthpop.mp3' // Replace with actual audio file
            },
            'chillwave': {
                name: 'Funk',
                songTitle: 'Song 8',
                albumCover: 'imgs/pngs-gifs/us.png',
                url: 'music/chillwave.mp3' // Replace with actual audio file
            },
            'cyberpunk': {
                name: 'Spooky',
                songTitle: 'Song 9',
                albumCover: 'imgs/pngs-gifs/fuckedGremlin.png',
                url: 'music/cyberpunk.mp3' // Replace with actual audio file
            }
        };

        // Open music popup
        function openMusicPopup() {
            musicPopup.style.display = 'block';
            // Auto-play first song if no audio is currently playing
            if (!currentAudio) {
                playSong('cyber-dreams');
            }
        }

        // Close music popup
        function closeMusicPopupFunc() {
            musicPopup.style.display = 'none';
        }

        // Play selected song
        function playSong(songId) {
            currentSong = songId;
            const song = songs[songId];
            
            // Update current album cover
            const currentAlbumCover = document.getElementById('currentAlbumCover');
            if (currentAlbumCover) {
                currentAlbumCover.src = song.albumCover;
            }
            
            // Update now playing text
            document.getElementById('nowPlaying').textContent = `${song.name}`;
            document.getElementById('currentSongTitle').textContent = song.songTitle;
            
            // Remove active class from all song buttons
            const songButtons = document.querySelectorAll('.song-btn');
            songButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to selected song button
            const selectedButton = document.querySelector(`[data-song="${songId}"]`);
            if (selectedButton) {
                selectedButton.classList.add('active');
            }
            
            // Update the play/pause button to show "pause" when playing
            const playPauseBtn = document.getElementById('playPauseBtn');
            playPauseBtn.textContent = '⏸️';
            isPlaying = true;
            
            console.log(`Playing: ${song.name} - ${song.songTitle}`);
        }

        // Toggle play/pause
        function togglePlayPause() {
            if (currentAudio) {
                if (isPlaying) {
                    currentAudio.pause();
                    isPlaying = false;
                    playPauseBtn.textContent = '▶';
                } else {
                    currentAudio.play().then(() => {
                        isPlaying = true;
                        playPauseBtn.textContent = '⏸';
                    }).catch(error => {
                        console.log('Play was prevented:', error);
                    });
                }
            }
        }

        // Toggle mute
        function toggleMute() {
            if (currentAudio) {
                if (isMuted) {
                    currentAudio.volume = currentVolume;
                    volumeSlider.value = currentVolume * 100;
                    volumeBtn.textContent = '🔊';
                    isMuted = false;
                } else {
                    currentAudio.volume = 0;
                    volumeSlider.value = 0;
                    volumeBtn.textContent = '🔇';
                    isMuted = true;
                }
            }
        }

        // Update volume
        function updateVolume() {
            const volume = volumeSlider.value / 100;
            currentVolume = volume;
            if (currentAudio && !isMuted) {
                currentAudio.volume = volume;
            }
            
            // Update volume button icon
            if (volume === 0) {
                volumeBtn.textContent = '🔇';
            } else if (volume < 0.5) {
                volumeBtn.textContent = '🔉';
            } else {
                volumeBtn.textContent = '🔊';
            }
        }

        // Event listeners
        musicMenuToggle.addEventListener('click', openMusicPopup);
        closeMusicPopup.addEventListener('click', closeMusicPopupFunc);
        
        // Close popup when clicking outside
        musicPopup.addEventListener('click', function(e) {
            if (e.target === musicPopup) {
                closeMusicPopupFunc();
            }
        });

        // Song selection
        songButtons.forEach(button => {
            button.addEventListener('click', function() {
                const songKey = this.getAttribute('data-song');
                playSong(songKey);
            });
        });

        // Music controls
        playPauseBtn.addEventListener('click', togglePlayPause);
        volumeBtn.addEventListener('click', toggleMute);
        volumeSlider.addEventListener('input', updateVolume);

        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && musicPopup.style.display === 'block') {
                closeMusicPopupFunc();
            }
        });

        // Initialize volume slider
        volumeSlider.value = currentVolume * 100;
    }

    // INITIALIZE EVERYTHING
    addScrollAnimations();
    observeElements();
    setupSmoothScroll();
    setupSwordPopup();
    setupHeaderParallax();
    setupSettingsMenu();
    setupMusicPlayer();
});
