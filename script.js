document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    // Configuration
    const frameCount = 192; // Total number of frames in the anim folder
    const scrollSensitivity = 8; // Controls how much scrolling is required (multiplied by 100vh)
    
    // Set dynamic body height based on sensitivity to allow enough scrolling space
    document.body.style.height = `${scrollSensitivity * 100}vh`;

    // Function to generate the correct image path
    // Maps index 1 to '000001', etc.
    const currentFrame = index => (
        `anim/animate_this_more_202604251524_${index.toString().padStart(6, '0')}.webp`
    );

    const images = [];
    let loadedImages = 0;
    const loader = document.getElementById("loader");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    // State for smooth scrolling animation
    let animationState = {
        currentFrameIndex: 0,
        targetFrameIndex: 0,
        ease: 0.08 // Lower value = smoother but slower to catch up
    };

    // Helper to calculate dimensions for object-fit: cover behavior on canvas
    const resizeCanvasAndDraw = (img) => {
        if (!img || !img.complete) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    // Preload all images
    const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            
            img.onload = () => {
                loadedImages++;
                const progress = (loadedImages / frameCount) * 100;
                
                // Update Loading UI
                progressBar.style.width = `${progress}%`;
                progressText.innerText = `${Math.floor(progress)}%`;

                // Draw the very first frame immediately once it loads
                if (i === 1) {
                    resizeCanvasAndDraw(img);
                }

                // All images have loaded successfully
                if (loadedImages === frameCount) {
                    setTimeout(() => {
                        loader.style.opacity = "0";
                        loader.style.visibility = "hidden";
                        // Start the render loop once loading is complete
                        requestAnimationFrame(render);
                    }, 600); // Slight delay for smoother user experience
                }
            };
            images.push(img); // index 0 is frame 1, index 239 is frame 240
        }
    };

    // Scroll Event Listener
    window.addEventListener('scroll', () => {
        const html = document.documentElement;
        // Total scrollable distance
        const maxScrollTop = html.scrollHeight - window.innerHeight;
        // Current scroll position
        const scrollTop = html.scrollTop;
        
        // Calculate scroll percentage (0.0 to 1.0)
        const scrollFraction = scrollTop / maxScrollTop;
        
        // Map scroll percentage to the corresponding frame index
        const frameIndex = Math.min(
            frameCount - 1,
            Math.ceil(scrollFraction * frameCount)
        );

        // Update target frame for the animation loop
        animationState.targetFrameIndex = frameIndex;
    });

    // Main animation render loop using requestAnimationFrame
    const render = () => {
        // Linear interpolation (lerp) towards the target frame
        animationState.currentFrameIndex += (animationState.targetFrameIndex - animationState.currentFrameIndex) * animationState.ease;

        // Ensure we draw a valid integer frame
        const frameToDraw = Math.round(animationState.currentFrameIndex);
        
        // Draw to canvas if the image exists and is fully loaded
        if (images[frameToDraw] && images[frameToDraw].complete) {
            resizeCanvasAndDraw(images[frameToDraw]);
        }

        requestAnimationFrame(render);
    };

    // Handle Window Resizing to keep the canvas properly scaled
    window.addEventListener("resize", () => {
        const frameToDraw = Math.round(animationState.currentFrameIndex);
        if (images[frameToDraw]) {
            resizeCanvasAndDraw(images[frameToDraw]);
        }
    });

    // Start preloading mechanism
    preloadImages();

    // Intersection Observer for the scrolling text elements (fade-in effect)
    const fadeElements = document.querySelectorAll('.fade-text');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the element is visible
    };

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove class to hide elements when scrolled out of view
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        textObserver.observe(el);
    });
});
