// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(product => product.name === productName);

    if (existingProduct) {
        // If the product exists, increment its quantity
        existingProduct.quantity += 1;
    } else {
        // If the product doesn't exist, create a new product object
        const product = {
            name: productName,
            price: productPrice,
            quantity: 1, // Default quantity
            color: null, // Optional
            size: null,  // Optional
        };

        // Add the new product to the cart
        cart.push(product);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Produit ajouté au panier !");
}


function updateCartSummary() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");

    if (cartList && totalPrice) {
        cartList.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${product.name} - ${product.price} DZD x ${product.quantity}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Supprimer";
            removeButton.className = "remove-btn bg-red-500 text-white ml-4 p-1 rounded";
            removeButton.onclick = () => {
                removeFromCart(index);
                updateCartSummary(); // Refresh cart immediately
            };

            li.appendChild(removeButton);
            cartList.appendChild(li);

            total += product.price * product.quantity;
        });

        totalPrice.textContent = `Total: ${total} DZD`;
    }
}


// Initialize the cart when the sell page is loaded
function loadCartOnSellPage() {
    if (window.location.pathname.includes('sell.html')) {
        updateCartSummary();
    }
}

// Ensure cart is loaded on page load
window.onload = loadCartOnSellPage;

function filterProducts() {
    // Get the search input value and convert to lowercase for case-insensitive matching
    const searchInput = document.querySelector('.search-bar').value.toLowerCase();
    
    // Select all product elements
    const products = document.querySelectorAll('.product');
    
    // Loop through each product and handle visibility based on the search input
    products.forEach(product => {
        // Get the product name from the data-name attribute and convert it to lowercase
        const productName = product.getAttribute('data-name').toLowerCase();
        
        // Check if the product name includes the search input
        if (productName.includes(searchInput)) {
            product.style.display = 'block';  // Show matching products
        } else {
            product.style.display = 'none';   // Hide non-matching products
        }
    });
}


