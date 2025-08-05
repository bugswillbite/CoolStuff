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
        
        // Adjust threshold based on screen size for better mobile experience
        const isMobile = window.innerWidth <= 420;
        const threshold = isMobile ? 0.05 : 0.1;
        const rootMargin = isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px';
        
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
            threshold: threshold,
            rootMargin: rootMargin
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
        const isMobile = window.innerWidth <= 420;

        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Determine scroll direction
            scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = scrollY;
            
            // Reduce parallax effects on mobile for better performance
            if (isMobile) {
                // Simplified mobile effects
                const fadeDistance = windowHeight * 0.2;
                const subtitleOpacity = Math.max(0, 1 - (scrollY / fadeDistance));
                
                subtitle.style.opacity = subtitleOpacity;
                subtitle.style.transform = `translateY(-${scrollY * 0.1}px)`;
                
                // Minimal nav movement on mobile
                if (scrollY > 30) {
                    nav.style.transform = `translateY(-10px)`;
                } else {
                    nav.style.transform = `translateY(0px)`;
                }
            } else {
                // Full desktop effects
                const fadeDistance = windowHeight * 0.3;
                const subtitleOpacity = Math.max(0, 1 - (scrollY / fadeDistance));
                const subtitleTranslateY = scrollY * 0.3;
                
                let navTransform = 0;
                
                if (scrollY <= 50) {
                    if (scrollDirection === 'up' && scrollY < 20) {
                        navTransform = 0;
                    } else {
                        navTransform = Math.min(scrollY * 0.2, 10);
                    }
                } else {
                    const navMoveDistance = Math.min(scrollY * 0.4, 25);
                    navTransform = -navMoveDistance;
                }
                
                subtitle.style.opacity = subtitleOpacity;
                subtitle.style.transform = `translateY(-${subtitleTranslateY}px)`;
                nav.style.transform = `translateY(${navTransform}px)`;
            }
        }

        // Add scroll event listener with throttling for mobile
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => { ticking = false; }, isMobile ? 16 : 8);
            }
        }

        window.addEventListener('scroll', requestTick);
        
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

        // Song data with MP4 placeholder files
        const songs = {
            'cyber-dreams': {
                name: 'Hip Hop',
                songTitle: 'FLO NAZER',
                albumCover: 'imgs/ALBUMS/SKATE.png',
                url: 'music/hip-hop.mp4', // MP4 placeholder
                description: 'This is Hip Hop radio - FLO NAZER. All songs produced & composed by The Prophitt.'
            },
            'neon-nights': {
                name: 'Smooth Jazz',
                songTitle: 'SECRETLY CANADIAN',
                albumCover: 'imgs/ALBUMS/GUITAR.png',
                url: 'music/smooth-jazz.mp4', // MP4 placeholder
                description: 'This is Smooth Jazz radio - SECRETLY CANADIAN. All songs produced & composed by The Prophitt.'
            },
            'digital-rain': {
                name: 'Ambient',
                songTitle: '3DSXLHACKS',
                albumCover: 'imgs/ALBUMS/STARR.png',
                url: 'music/ambient.mp4', // MP4 placeholder
                description: 'This is Ambient radio - 3DSXLHACKS. All songs produced & composed by The Prophitt.'
            },
            'retro-wave': {
                name: 'House',
                songTitle: 'REFRIDGERATOR RUNNIN',
                albumCover: 'imgs/ALBUMS/PARKOUR.png',
                url: 'music/refridgerator_runnin_101 HOUSE.mp3',
                description: 'House Track -+> REFRIDGERATOR RUNNIN. All songs produced & composed by The Prophitt. Better go catch it!'
            },
            'synthwave': {
                name: 'Techno',
                songTitle: 'REMOTE CONTROL THIEF',
                albumCover: 'imgs/ALBUMS/UFO.png',
                url: 'music/techno.mp4', // MP4 placeholder
                description: 'This is Techno radio - REMOTE CONTROL THIEF. All songs produced & composed by The Prophitt.'
            },
            'lo-fi-beats': {
                name: 'Pop',
                songTitle: 'CRINGE-WORTHY',
                albumCover: 'imgs/ALBUMS/SUNNY.png',
                url: 'music/pop.mp4', // MP4 placeholder
                description: 'This is Pop radio - CRINGE-WORTHY. All songs produced & composed by The Prophitt.'
            },
            'synthpop': {
                name: 'Dance',
                songTitle: 'CLASSIC REGULAR',
                albumCover: 'imgs/ALBUMS/JUMP.png',
                url: 'music/dance.mp4', // MP4 placeholder
                description: 'This is Dance radio - CLASSIC REGULAR. All songs produced & composed by The Prophitt.'
            },
            'chillwave': {
                name: 'Funk',
                songTitle: 'SHIVA, BABY',
                albumCover: 'imgs/ALBUMS/IDKK.png',
                url: 'music/shivababy_funk_100_2.mp3', // MP4 placeholder
                description: 'This is Funk radio - SHIVA, BABY. All songs produced & composed by The Prophitt.'
            },
            'cyberpunk': {
                name: 'Indie',
                songTitle: 'COSMIC WAFFLE HOUSE',
                albumCover: 'imgs/ALBUMS/ZOMBI.png',
                url: 'music/Cosmic Waffle House_Indie_154.mp3', // MP4 placeholder
                description: 'Indie Track -+> COSMIC WAFFLE HOUSE. All songs produced & composed by The Prophitt.'
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
            const song = songs[songId];
            
            // Stop current audio if playing
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            
            // Create new audio element
            currentAudio = new Audio();
            currentAudio.src = song.url;
            currentAudio.volume = currentVolume;
            
            // Update display elements
            const currentAlbumCover = document.getElementById('currentAlbumCover');
            if (currentAlbumCover) {
                currentAlbumCover.src = song.albumCover;
            }
            
            // Update genre and song title
            currentGenre.textContent = song.name;
            currentSongTitle.textContent = song.songTitle;
            
            // Update radio description ticker
            radioDescription.textContent = song.description;
            radioDescriptionDupe.textContent = song.description;
            
            // Remove active class from all song buttons
            songButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to selected song button
            const selectedButton = document.querySelector(`[data-song="${songId}"]`);
            if (selectedButton) {
                selectedButton.classList.add('active');
            }
            
            // Start playing the song
            currentAudio.play().then(() => {
                isPlaying = true;
                playPauseBtn.textContent = '⏸';
                console.log(`Now playing: ${song.name} - ${song.songTitle}`);
            }).catch(error => {
                console.log('Audio playback failed:', error);
                // For demo purposes, still update the UI even if audio fails
                isPlaying = true;
                playPauseBtn.textContent = '⏸';
                console.log(`Demo mode: ${song.name} - ${song.songTitle}`);
            });
            
            // Handle audio end event
            currentAudio.addEventListener('ended', () => {
                isPlaying = false;
                playPauseBtn.textContent = '▶';
            });
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
                        // Demo mode - still update UI
                        isPlaying = true;
                        playPauseBtn.textContent = '⏸';
                    });
                }
            } else {
                // If no audio is loaded, start with first song
                playSong('cyber-dreams');
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

    // RESPONSIVE BEHAVIOR HANDLER
    function setupResponsiveBehavior() {
        let resizeTimeout;
        
        function handleResize() {
            // Clear existing timeout
            clearTimeout(resizeTimeout);
            
            // Set a new timeout
            resizeTimeout = setTimeout(() => {
                const isMobile = window.innerWidth <= 420;
                const isTablet = window.innerWidth <= 768 && window.innerWidth > 420;
                const flyingElements = document.querySelector('.flying-elements');
                
                // Handle flying elements based on screen size
                if (flyingElements) {
                    if (isMobile) {
                        flyingElements.style.display = 'none';
                    } else {
                        // Check if animations are enabled via settings
                        const animationToggle = document.getElementById('animationToggle');
                        const toggleText = animationToggle?.querySelector('.toggle-text');
                        const animationsEnabled = toggleText?.textContent === 'ON';
                        
                        if (animationsEnabled) {
                            flyingElements.style.display = 'block';
                        }
                    }
                }
                
                // Re-initialize parallax with new screen size considerations
                setupHeaderParallax();
                
                // Re-initialize intersection observer with new thresholds
                observeElements();
                
                // Adjust popup sizes for better mobile experience
                const musicPopup = document.getElementById('musicPopup');
                if (musicPopup && isMobile) {
                    const musicContent = musicPopup.querySelector('.music-popup-content');
                    if (musicContent) {
                        musicContent.style.borderRadius = '0';
                    }
                }
                
                // Handle navigation behavior on mobile
                const nav = document.querySelector('nav');
                if (nav && isMobile) {
                    nav.style.transform = 'translateY(0px)';
                }
                
            }, 250); // Debounce resize events
        }
        
        // Add resize event listener
        window.addEventListener('resize', handleResize);
        
        // Initial setup
        handleResize();
    }

    // TOUCH GESTURE SUPPORT FOR MOBILE
    function setupTouchGestures() {
        const isMobile = window.innerWidth <= 420;
        
        if (!isMobile) return;
        
        // Add touch-friendly interactions
        const interactiveElements = document.querySelectorAll('.product-card, .product-card1, .song-btn, .setting-toggle-btn');
        
        interactiveElements.forEach(element => {
            // Add touch feedback
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.transition = 'transform 0.3s ease';
            });
        });
        
        // Prevent double-tap zoom on buttons
        const buttons = document.querySelectorAll('button, .song-btn');
        buttons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
    }

    // SCROLLING IMAGES CLICK FUNCTIONALITY
    function setupScrollingImagesClick() {
        const scrollImages = document.querySelectorAll('.scroll-img');
        
        scrollImages.forEach(img => {
            img.addEventListener('click', function() {
                // Navigate to the collectables section
                document.getElementById('collectables').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    // DUAL SCROLL FUNCTIONALITY (Auto + Manual)
    function setupDualScrolling() {
        const scrollContainer = document.querySelector('.scrolling-container');
        const scrollImages = document.querySelector('.scrolling-images');
        
        if (!scrollContainer || !scrollImages) return;
        
        let scrollTimeout;
        let isUserScrolling = false;
        let lastScrollLeft = 0;
        let scrollCheckInterval;
        
        // Ensure auto-scroll is active on page load
        scrollImages.classList.remove('paused');
        
        // Pause auto-scroll when user manually scrolls
        function pauseAutoScroll() {
            isUserScrolling = true;
            scrollImages.classList.add('paused');
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Start checking if user has stopped scrolling
            startScrollCheck();
        }
        
        // Check if user has stopped scrolling
        function startScrollCheck() {
            clearInterval(scrollCheckInterval);
            
            scrollCheckInterval = setInterval(() => {
                const currentScrollLeft = scrollContainer.scrollLeft;
                
                // If scroll position hasn't changed for 500ms, user has stopped
                if (currentScrollLeft === lastScrollLeft) {
                    // User has stopped scrolling, resume auto-scroll after 500ms more
                    clearInterval(scrollCheckInterval);
                    scrollTimeout = setTimeout(() => {
                        isUserScrolling = false;
                        scrollImages.classList.remove('paused');
                    }, 500);
                }
                
                lastScrollLeft = currentScrollLeft;
            }, 500); // Check every 500ms
        }
        
        // Handle infinite scroll loop (seamless transition)
        function handleInfiniteScroll() {
            const scrollLeft = scrollContainer.scrollLeft;
            const scrollWidth = scrollContainer.scrollWidth;
            const clientWidth = scrollContainer.clientWidth;
            const maxScroll = scrollWidth - clientWidth;
            
            // Calculate the width of one complete set of images (including gaps)
            const images = scrollContainer.querySelectorAll('.scroll-img');
            
            // Get actual image dimensions and gap from current viewport
            const imageStyle = window.getComputedStyle(images[0]);
            const imageWidth = parseInt(imageStyle.width);
            const containerStyle = window.getComputedStyle(scrollImages);
            const gap = parseInt(containerStyle.gap);
            
            const oneSetWidth = (imageWidth + gap) * (images.length / 2); // Divide by 2 since images are duplicated
            
            // When we've scrolled past one complete set, reset to beginning
            if (scrollLeft >= oneSetWidth) {
                scrollContainer.scrollLeft = scrollLeft - oneSetWidth;
            }
        }
        
        // Handle manual scrolling with infinite loop
        scrollContainer.addEventListener('scroll', function() {
            handleInfiniteScroll();
            if (!isUserScrolling) {
                pauseAutoScroll();
            }
        });
        
        // Handle touch scrolling on mobile
        scrollContainer.addEventListener('touchstart', function() {
            pauseAutoScroll();
        });
        
        scrollContainer.addEventListener('touchmove', function() {
            pauseAutoScroll();
        });
        
        // Handle mouse wheel scrolling
        scrollContainer.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                // Convert vertical scroll to horizontal scroll
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
                pauseAutoScroll();
            }
        });
        
        // Handle keyboard navigation
        scrollContainer.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollContainer.scrollLeft -= 50; // Scroll by 50px increments
                pauseAutoScroll();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollContainer.scrollLeft += 50; // Scroll by 50px increments
                pauseAutoScroll();
            }
        });
        
        // Make container focusable for keyboard navigation
        scrollContainer.setAttribute('tabindex', '0');
    }

    // FLYING PROMO SETUP
    function setupFlyingPromo() {
        const flyingPromo = document.getElementById('flyingPromo');
        
        if (!flyingPromo) {
            console.log('Flying promo element not found');
            return;
        }

        let isPromoActive = false;
        let isPromoClicked = false;
        let isInteractiveMode = false;
        let regularInterval;
        let promoHideTimeout;
        let enterFromLeft = false; // Track which side to enter from

        // Array of possible links to open
        const promoLinks = [
            'https://www.podowski.net/',
            'https://theprophitt.bandcamp.com/',
            'https://www.youtube.com/@powdowski',
        ];

        // Show promo function
        function showPromo() {
            if (isPromoActive || isInteractiveMode) {
                console.log('Promo already active or in interactive mode, skipping');
                return;
            }
            
            console.log(`Showing flying promo from ${enterFromLeft ? 'left' : 'right'} side`);
            isPromoActive = true;
            isPromoClicked = false;
            
            // Clear any existing classes and reset opacity
            flyingPromo.classList.remove('clicked', 'interactive', 'from-left');
            flyingPromo.style.transition = '';
            flyingPromo.style.opacity = '';
            
            // Add appropriate class for entrance direction
            if (enterFromLeft) {
                flyingPromo.classList.add('from-left');
            }
            
            flyingPromo.classList.add('active');
            
            // Toggle entrance side for next time
            enterFromLeft = !enterFromLeft;
            
            // Hide after 5 seconds (animation duration) unless clicked
            promoHideTimeout = setTimeout(() => {
                if (!isPromoClicked && !isInteractiveMode) {
                    console.log('Hiding flying promo after 5 seconds');
                    dismissPromo();
                }
            }, 5000); // Changed from 30000 to 5000 (5 seconds)
        }

        // Smooth dismiss function
        function dismissPromo() {
            flyingPromo.classList.remove('active', 'from-left');
            flyingPromo.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            flyingPromo.style.opacity = '0';
            flyingPromo.style.transform = 'translateY(-50%) scale(0.8)';
            
            setTimeout(() => {
                flyingPromo.style.transition = '';
                flyingPromo.style.opacity = '';
                flyingPromo.style.transform = '';
                isPromoActive = false;
                console.log('Promo ready to show again');
            }, 1000); // Wait for smooth transition to complete
        }

        // Set up regular interval (every 5 minutes)
        regularInterval = setInterval(() => {
            if (!isPromoActive && !isPromoClicked && !isInteractiveMode) {
                console.log('5 minute interval triggered, showing promo');
                showPromo();
            } else {
                console.log('5 minute interval triggered but promo already active or in interactive mode');
            }
        }, 300000); // 5 minutes (300,000 ms)

        // Initialize first promo appearance after 5 minutes
        setTimeout(() => {
            console.log('Initial promo appearance after 5 minutes');
            showPromo();
        }, 300000); // 5 minutes for initial appearance

        // Handle promo click - randomly open one of three links
        flyingPromo.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Flying promo clicked! Opening random link');
            
            if (isPromoActive && !isPromoClicked && !isInteractiveMode) {
                isPromoClicked = true;
                
                // Select random link
                const randomIndex = Math.floor(Math.random() * promoLinks.length);
                const selectedLink = promoLinks[randomIndex];
                
                console.log(`Opening link ${randomIndex + 1}: ${selectedLink}`);
                
                // Clear the auto-hide timeout
                if (promoHideTimeout) {
                    clearTimeout(promoHideTimeout);
                }
                
                // Add clicked animation
                flyingPromo.classList.remove('active', 'from-left');
                flyingPromo.classList.add('clicked');
                
                // Open the link after a short delay for visual feedback
                setTimeout(() => {
                    window.open(selectedLink, '_blank');
                    
                    // Smooth hide the promo after opening link
                    flyingPromo.classList.remove('clicked');
                    flyingPromo.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                    flyingPromo.style.opacity = '0';
                    flyingPromo.style.transform = 'translate(50%, -50%) scale(0.8)';
                    
                    setTimeout(() => {
                        flyingPromo.style.transition = '';
                        flyingPromo.style.opacity = '';
                        flyingPromo.style.transform = '';
                        isPromoActive = false;
                        isPromoClicked = false;
                        console.log('Link opened and promo dismissed smoothly');
                    }, 1000); // Smooth 1 second fade out
                }, 300); // Short delay for click animation
            }
        });

        // Handle ESC key to dismiss with smooth fade
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isPromoActive) {
                console.log('ESC pressed, dismissing promo smoothly');
                if (promoHideTimeout) {
                    clearTimeout(promoHideTimeout);
                }
                dismissPromo();
                isPromoClicked = false;
            }
        });

        console.log('Flying promo setup complete - will appear every 5 minutes with smooth fade transitions');
    }

    // INITIALIZE EVERYTHING
    addScrollAnimations();
    observeElements();
    setupSmoothScroll();
    setupSwordPopup();
    setupHeaderParallax();
    setupSettingsMenu();
    setupMusicPlayer();
    setupResponsiveBehavior();
    setupTouchGestures();
    setupScrollingImagesClick();
    setupDualScrolling();
    setupFlyingPromo();
});



window.addEventListener('scroll', () => {
    const image = document.querySelector('.tilt-img');
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;
    const offset = rect.top + rect.height / 2 - windowCenter;

    const rotateY = Math.max(-15, Math.min(15, offset / 15)); // ← note: positive value
    image.style.transform = `rotateY(${rotateY}deg)`;
});
