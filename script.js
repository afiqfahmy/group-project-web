// Fade-in on scroll
function fade_out() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document
        .querySelectorAll('.fade-on-scroll')
        .forEach(el => observer.observe(el));
}

fade_out();


// Page transition (fade out on link click)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', e => {

            // Skip special links
            if (
                link.target === '_blank' ||
                link.href.startsWith('mailto:') ||
                link.href.startsWith('tel:') ||
                link.href.includes('#')
            ) return;

            e.preventDefault();

            document.body.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = link.href;
            }, 250);
        });

    });
});
