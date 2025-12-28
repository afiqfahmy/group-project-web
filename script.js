// Fade out animation
function fade_out() {
    // Set up observer first
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Check if the element is visible on viewport
            if (entry.isIntersecting) {
                // Adding the animation
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,  // trigger when 10% of element is visible
    });

    // Target all element with the .fade-on-scroll class
    const hiddenElement = document.querySelectorAll('.fade-on-scroll');
    hiddenElement.forEach((el) => observer.observe(el));
}

fade_out();