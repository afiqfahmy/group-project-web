// =====================
// Fade-in on scroll
// =====================
function fade_on_scroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.getBoundingClientRect(); // force reflow
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-on-scroll')
        .forEach(el => observer.observe(el));
}

fade_on_scroll();


// =====================
// DOM READY
// =====================
document.addEventListener('DOMContentLoaded', () => {

    /* =====================
       PAGE TRANSITION
    ====================== */
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {

            if (
                link.closest('.cart') ||      // ✅ allow cart
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



    /* =====================
       CART SETUP
    ====================== */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    updateCartCount();


    /* =====================
       ADD TO CART (VALIDATED)
    ====================== */
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {

            const selectedColor = document.querySelector('.swatch-circle.selected-swatch');
            if (!selectedColor) {
                alert("Please select a color before adding to cart.");
                return;
            }

            const selectedStorage = document.querySelector('.storage-card.selected-storage');
            if (!selectedStorage) {
                alert("Please select a storage option before adding to cart.");
                return;
            }

            const color = selectedColor.getAttribute('title');
            const storage = selectedStorage.querySelector('.size').innerText;
            const price = Number(
                selectedStorage.getAttribute('data-price').replace(/[^0-9]/g, '')
            );
            const img = selectedColor.getAttribute('data-image');

            const product = {
                name: `${addToCartBtn.dataset.name} (${color}, ${storage})`,
                price,
                img
            };

            cart.push(product);
            saveCart();
            updateCartCount();

            alert(`${product.name} added to cart! 🛒`);
        });
    }


    /* =====================
       OPTIONAL: DISABLE BUTTON UNTIL SELECTED
    ====================== */
    function checkSelections() {
        const colorSelected = document.querySelector('.selected-swatch');
        const storageSelected = document.querySelector('.selected-storage');
        if (addToCartBtn) {
            addToCartBtn.disabled = !(colorSelected && storageSelected);
            addToCartBtn.style.opacity = addToCartBtn.disabled ? '0.5' : '1';
            addToCartBtn.style.cursor = addToCartBtn.disabled ? 'not-allowed' : 'pointer';
        }
    }

    document.querySelectorAll('.swatch-circle, .storage-card')
        .forEach(el => el.addEventListener('click', checkSelections));

    checkSelections();



});
