async function updateVisitorCount() {
    const counterElement = document.getElementById('visit-count');
    if (!counterElement) return;

    try {
        // Use a unique namespace for this portfolio
        const namespace = "inosha-portfolio-2026";
        const key = "visits";
        
        // Fetch and increment the count
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        // Update the display with a formatted number
        counterElement.innerText = data.count.toLocaleString();
    } catch (error) {
        console.error('Visitor Counter Error:', error);
        counterElement.innerText = '---';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateVisitorCount);
} else {
    updateVisitorCount();
}
