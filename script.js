// Fade-in on scroll
function fade_on_scroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Force reflow so animation always plays
                entry.target.getBoundingClientRect();
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-on-scroll')
        .forEach(el => observer.observe(el));
}

fade_on_scroll();


// Page transition (fade out on link click)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', e => {

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
