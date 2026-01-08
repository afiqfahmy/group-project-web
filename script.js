main();

// Globbal dictionary use by js for cart function
// Unique id: 
// ip17pm   : 001
// ipadair  : 002
// mac air  : 003
var cart = [];

function main() {
    fade_on_scroll();
    fluid_scrolling_effect();

    // Initialize the cart
    cart = [];
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

// Testing the cart function in js
function add_to_cart(product_id, product_name, quantity) {
    // First check the id of the product, if the product got same id then update the quantity
    // if not add new product
    console.log("Item has been added !");
    //if (cart.lenght == 0) {
        cart.push("Product ID: " + product_id + "Product Name: " + product_name + "Quantity: " + quantity);
    // if the id are the same
        for (var i = 0; i < cart.length; i++) {
            console.log(cart[i]);
        }
        
    }


// Function to reduce the quantity of the product
function delete_from_cart_quantity(product_id, product_name, quantity) {

}

// Function delete all same type of product from the cart
function delete_from_cart() {

}
