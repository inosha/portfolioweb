document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("hero-lightpass");
    const context = canvas.getContext("2d");

    // Reusing the same frames as CV page for the "Flow Effect"
    const cvFrames = ["videoplayback_000017.webp", "videoplayback_000018.webp", "videoplayback_000019.webp", "videoplayback_000020.webp", "videoplayback_000021.webp", "videoplayback_000022.webp", "videoplayback_000023.webp", "videoplayback_000024.webp", "videoplayback_000025.webp", "videoplayback_000026.webp", "videoplayback_000027.webp", "videoplayback_000028.webp", "videoplayback_000029.webp", "videoplayback_000030.webp", "videoplayback_000031.webp", "videoplayback_000032.webp", "videoplayback_000033.webp", "videoplayback_000034.webp", "videoplayback_000035.webp", "videoplayback_000036.webp", "videoplayback_000037.webp", "videoplayback_000038.webp", "videoplayback_000039.webp", "videoplayback_000040.webp", "videoplayback_000041.webp", "videoplayback_000042.webp", "videoplayback_000043.webp", "videoplayback_000044.webp", "videoplayback_000045.webp", "videoplayback_000046.webp", "videoplayback_000047.webp", "videoplayback_000048.webp", "videoplayback_000049.webp", "videoplayback_000050.webp", "videoplayback_000051.webp", "videoplayback_000052.webp", "videoplayback_000053.webp", "videoplayback_000054.webp", "videoplayback_000055.webp", "videoplayback_000056.webp", "videoplayback_000057.webp", "videoplayback_000058.webp", "videoplayback_000059.webp", "videoplayback_000060.webp", "videoplayback_000061.webp", "videoplayback_000062.webp", "videoplayback_000063.webp", "videoplayback_000064.webp", "videoplayback_000065.webp", "videoplayback_000066.webp", "videoplayback_000067.webp", "videoplayback_000068.webp", "videoplayback_000069.webp", "videoplayback_000070.webp", "videoplayback_000071.webp", "videoplayback_000072.webp", "videoplayback_000073.webp", "videoplayback_000074.webp", "videoplayback_000075.webp", "videoplayback_000076.webp", "videoplayback_000077.webp", "videoplayback_000078.webp", "videoplayback_000079.webp", "videoplayback_000080.webp", "videoplayback_000081.webp", "videoplayback_000082.webp", "videoplayback_000083.webp", "videoplayback_000084.webp", "videoplayback_000085.webp", "videoplayback_000086.webp", "videoplayback_000087.webp", "videoplayback_000088.webp", "videoplayback_000089.webp", "videoplayback_000090.webp", "videoplayback_000091.webp", "videoplayback_000092.webp", "videoplayback_000194.webp", "videoplayback_000195.webp", "videoplayback_000196.webp", "videoplayback_000197.webp", "videoplayback_000198.webp", "videoplayback_000199.webp", "videoplayback_000200.webp", "videoplayback_000201.webp", "videoplayback_000202.webp", "videoplayback_000203.webp", "videoplayback_000204.webp", "videoplayback_000205.webp", "videoplayback_000206.webp", "videoplayback_000207.webp", "videoplayback_000208.webp", "videoplayback_000209.webp", "videoplayback_000210.webp", "videoplayback_000211.webp", "videoplayback_000212.webp", "videoplayback_000213.webp", "videoplayback_000214.webp", "videoplayback_000215.webp", "videoplayback_000216.webp", "videoplayback_000217.webp", "videoplayback_000218.webp", "videoplayback_000219.webp", "videoplayback_000220.webp", "videoplayback_000221.webp", "videoplayback_000222.webp", "videoplayback_000223.webp", "videoplayback_000224.webp", "videoplayback_000225.webp", "videoplayback_000226.webp", "videoplayback_000227.webp", "videoplayback_000228.webp", "videoplayback_000229.webp", "videoplayback_000230.webp", "videoplayback_000231.webp", "videoplayback_000232.webp", "videoplayback_000233.webp", "videoplayback_000234.webp", "videoplayback_000235.webp", "videoplayback_000236.webp", "videoplayback_000237.webp"];
    
    const frameCount = cvFrames.length; // 120 frames
    const scrollSensitivity = 6; // Balanced scroll length for home page
    document.body.style.height = `${scrollSensitivity * 100}vh`;

    const images = [];
    let loadedImages = 0;
    const loader = document.getElementById("loader");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    // Intersection Observer for scrolling text
    const fadeElements = document.querySelectorAll('.fade-text');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    let animationState = {
        currentFrameIndex: 0,
        targetFrameIndex: 0,
        ease: 0.08
    };

    const resizeCanvasAndDraw = (img) => {
        if (!img || !img.complete) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const cx = (canvas.width - img.width * ratio) / 2;
        const cy = (canvas.height - img.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    };

    const preloadImages = () => {
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `cvanim/${cvFrames[i]}`;
            img.onload = () => {
                loadedImages++;
                const progress = (loadedImages / frameCount) * 100;
                progressBar.style.width = `${progress}%`;
                progressText.innerText = `${Math.floor(progress)}%`;

                if (i === 0) resizeCanvasAndDraw(img);

                if (loadedImages === frameCount) {
                    setTimeout(() => {
                        loader.style.opacity = "0";
                        setTimeout(() => {
                            loader.style.display = "none";
                            const content = document.getElementById("content");
                            if (content) {
                                content.style.opacity = "1";
                                content.style.pointerEvents = "auto";
                            }
                            fadeElements.forEach(el => textObserver.observe(el));
                        }, 500);
                        requestAnimationFrame(render);
                    }, 600);
                }
            };
            images.push(img);
        }
    };

    window.addEventListener('scroll', () => {
        const html = document.documentElement;
        const maxScrollTop = html.scrollHeight - window.innerHeight;
        const scrollTop = html.scrollTop;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
        animationState.targetFrameIndex = frameIndex;
    });

    const render = () => {
        animationState.currentFrameIndex += (animationState.targetFrameIndex - animationState.currentFrameIndex) * animationState.ease;
        const frameToDraw = Math.round(animationState.currentFrameIndex);
        if (images[frameToDraw] && images[frameToDraw].complete) {
            resizeCanvasAndDraw(images[frameToDraw]);
        }
        requestAnimationFrame(render);
    };

    window.addEventListener("resize", () => {
        const frameToDraw = Math.round(animationState.currentFrameIndex);
        if (images[frameToDraw]) resizeCanvasAndDraw(images[frameToDraw]);
    });

    preloadImages();
    fadeElements.forEach(el => textObserver.observe(el));
});
