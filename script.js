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
                !link.href 
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

            const sizeText = selectedStorage.querySelector('.storage-size').innerText;

            const product = {
                name: `${addToCartBtn.dataset.name} (${selectedColor.title}, ${sizeText})`,
                price: Number(selectedStorage.dataset.price.replace(/[^0-9]/g, '')),
                img: selectedColor.dataset.image
            };

            cart.push(product);
            saveCart();
            updateCartCount();

            showNotification(`${product.name}`);
        });
    }

    /* 7. NOTIFICATION LOGIC */
    function showNotification(productName) {
        let myNotifElement = document.getElementById('custom-alert');

        if (!myNotifElement) {
            myNotifElement = document.createElement('div');
            myNotifElement.id = 'custom-alert';
            myNotifElement.className = 'custom-alert';
            document.body.appendChild(myNotifElement);
        }

        myNotifElement.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">✓</span>
                <span style="font-family: -apple-system, sans-serif; font-size: 14px; color: #1d1d1f;">
                    ${productName} added to bag 🛒
                </span>
            </div>
        `;
        
        myNotifElement.classList.remove('show');
        void myNotifElement.offsetWidth; 
        myNotifElement.classList.add('show');
        
        setTimeout(() => {
            myNotifElement.classList.remove('show');
        }, 3000);
    }

    /* 8. BUTTON ENABLE LOGIC */
    function checkSelections() {
        const enabled =
            document.querySelector('.selected-swatch') &&
            document.querySelector('.selected-storage');

        if (addToCartBtn) {
            addToCartBtn.disabled = !enabled;
            addToCartBtn.style.opacity = enabled ? '1' : '0.5';
            addToCartBtn.style.cursor = enabled ? 'pointer' : 'not-allowed';
        }
    }

    checkSelections();

    /* 9. CART PAGE RENDERING (New) */
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (!cartItemsContainer) return; // Only runs if we are on cart.html

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="font-size: 21px; padding: 40px;">Your bag is empty.</p>';
            if (cartTotalElement) cartTotalElement.textContent = 'Total: RM 0';
            return;
        }

        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">RM ${item.price.toLocaleString()}</div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });

        if (cartTotalElement) {
            cartTotalElement.textContent = `Total: RM ${total.toLocaleString()}`;
        }

        // Add events to remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                saveCart();
                updateCartCount();
                renderCart(); // Re-render the list immediately
            });
        });
    }

    renderCart(); // Run on load to see if we are on the cart page

    /* 10. Smooth scrolling experience */
    const lenis = new Lenis({
        duration: 1.2,       // How long the scroll slide lasts (higher = smoother)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,   // Sensitivity
        touchMultiplier: 2,
    });

    // The Animation Loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});