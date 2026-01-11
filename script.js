<<<<<<< HEAD
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
=======
main();
>>>>>>> 4e6be9d5ee0fc84a1712a8e54f7cb3cead0d19a2

// Globbal dictionary use by js for cart function
// Unique id: 
// ip17pm   : 001
// ipadair  : 002
// mac air  : 003

// var cart = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function main() {
    fade_on_scroll();
    fluid_scrolling_effect();

    // Prevent windows to be refresh
}

<<<<<<< HEAD
fade_on_scroll();


// Page transition (fade out on link click)
=======
// Page transition (fade out on link click)
>>>>>>> 4e6be9d5ee0fc84a1712a8e54f7cb3cead0d19a2
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


function fluid_scrolling_effect() {
    // Lazy to import the outside js file for smooth for every single file
    // so write auto load function at here
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js';

    // make the smooth effect become smoother and fluid like
    script.onload = () => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        console.log('Lenis Smooth Scroll load !');
    }
    // Append script to documnet head
    document.head.appendChild(script);
}

function add_to_cart(product_id, product_name, qty, price) {
    // Find the same ID from the dictionarry
    let existingItem = cart.find(item => item.id === product_id);

    if (existingItem) {
        console.log("Same item, increasing quantity.");
        
        existingItem.quantity = parseInt(existingItem.quantity) + parseInt(qty);
        
    } else {
        console.log("New item, adding to list.");
        
        cart.push({
            id: product_id,
            name: product_name,
            quantity: parseInt(qty), // Save as Number immediately to avoid bugs later
            price: parseFloat(price)
        });
    }

    console.log("Current Cart:", cart);

    // Save to storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Display the cart
function updateCartDisplay() {
    const cartContainer = document.getElementsByClassName('cart-items-container');
    const totalElement = document.getElementsByClassName('cart-tool');

    if (!cartContainer) return;
    
    cartContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        let itemTotal = item.quantity * (item.price || 0);
        totalPrice += itemTotal;

        const itemHTML = `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <button onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;

        cartContainer.innerHTML += itemHTML;
        console.log("Update cart")
    });

    if (totalElement) {
        totalElement.innerText = "$" + totalPrice.toLocaleString();
    }
}