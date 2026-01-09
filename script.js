main();

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