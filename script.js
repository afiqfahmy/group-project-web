document.addEventListener('DOMContentLoaded', () => {

    /* 1. FADE-IN ON SCROLL */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));


    /* 2. PAGE TRANSITIONS */
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            if (
                link.closest('.cart') ||
                link.target === '_blank' ||
                link.href.includes('#') ||
                link.href.startsWith('mailto:') ||
                link.href.startsWith('tel:') ||
                !link.href // Safety check
            ) return;

            e.preventDefault();
            document.body.classList.add('page-exit');

            setTimeout(() => {
                window.location.href = link.href;
            }, 250);
        });
    });


    /* 3. CART CORE LOGIC */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        if (cartCount) cartCount.textContent = cart.length;
    }

    updateCartCount();


    /* 4. COLOR SELECTION */
    const swatches = document.querySelectorAll('.swatch-circle');
    const mainImg = document.getElementById('main-product-img');
    const colorLabel = document.getElementById('color-name');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', function () {
            const newImg = this.dataset.image;

            if (mainImg && newImg) {
                mainImg.style.opacity = '0';
                setTimeout(() => {
                    mainImg.src = newImg;
                    mainImg.style.opacity = '1';
                }, 150);
            }

            if (colorLabel) colorLabel.textContent = this.title;

            swatches.forEach(s => s.classList.remove('selected-swatch'));
            this.classList.add('selected-swatch');

            checkSelections();
        });
    });


    /* 5. STORAGE SELECTION */
    const storageCards = document.querySelectorAll('.storage-card');
    const navPrice = document.getElementById('nav-price');

    storageCards.forEach(card => {
        card.addEventListener('click', function () {
            // Update the sticky nav price
            if (navPrice) navPrice.textContent = this.dataset.price;

            storageCards.forEach(c => c.classList.remove('selected-storage'));
            this.classList.add('selected-storage');

            checkSelections();
        });
    });


    /* 6. ADD TO CART */
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedColor = document.querySelector('.selected-swatch');
            const selectedStorage = document.querySelector('.selected-storage');

            if (!selectedColor || !selectedStorage) return;

            // Getting the specific size text (e.g., "256GB")
            const sizeText = selectedStorage.querySelector('.storage-size').innerText;

            const product = {
                name: `${addToCartBtn.dataset.name} (${selectedColor.title}, ${sizeText})`,
                // Cleans price string (RM 5,499 -> 5499)
                price: Number(selectedStorage.dataset.price.replace(/[^0-9]/g, '')),
                img: selectedColor.dataset.image
            };

            cart.push(product);
            saveCart();
            updateCartCount();

            alert(`${product.name} added to cart 🛒`);
            // alert(`${product.name} added to cart! 🛒`);
            showNotification(`${product.name}`);
        });
    }

    // Creating apple like notification style
    function showNotification(productName) {
        let myNotifElement = document.getElementById('custom-alert');

        if (!document.body) {
            console.error("Error: The page is not fully loaded yet.");
            return;
        }

        if (!myNotifElement) {
            console.log("Creating new notification box...");
            myNotifElement = document.createElement('div');
            myNotifElement.id = 'custom-alert';
            myNotifElement.className = 'custom-alert';
            document.body.appendChild(myNotifElement);
        }

        console.log("Notification Element:", myNotifElement);

        myNotifElement.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">✓</span>
                <span style="font-family: -apple-system, sans-serif; font-size: 14px; color: #1d1d1f;">
                    ${productName} added to cart 🛒 !
                </span>
            </div>
        `;
        
        myNotifElement.classList.remove('show');
        void myNotifElement.offsetWidth; // Force restart animation
        myNotifElement.classList.add('show');
        
        setTimeout(() => {
            myNotifElement.classList.remove('show');
        }, 3000);
    }

    /* 7. BUTTON ENABLE LOGIC */
    function checkSelections() {
        const enabled =
            document.querySelector('.selected-swatch') &&
            document.querySelector('.selected-storage');

        if (addToCartBtn) {
            addToCartBtn.disabled = !enabled;
            // Visual feedback
            addToCartBtn.style.opacity = enabled ? '1' : '0.5';
            addToCartBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
        }
    }

    // Initialize button state
    checkSelections();
});