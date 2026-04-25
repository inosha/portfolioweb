document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for the scrolling text elements (fade-in effect)
    const fadeElements = document.querySelectorAll('.fade-text');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        textObserver.observe(el);
    });
});
