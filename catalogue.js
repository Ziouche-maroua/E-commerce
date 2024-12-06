// Initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(product => product.name === name);
    
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product is already in the cart
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new product with quantity 1
    }
    
    // Update localStorage with new cart data
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartSummary();
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

function removeFromCart(index) {
    cart.splice(index, 1);
    // Update localStorage after removing product
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartSummary();
}

function confirmPurchase() {
    if (cart.length === 0) {
        alert("Votre panier est vide.");
    } else {
        let purchaseDetails = "Merci pour votre achat !\n\n";
        cart.forEach(product => {
            purchaseDetails += `${product.name} - ${product.quantity} x ${product.price} DZD\n`;
        });
        purchaseDetails += `Total : ${document.getElementById("total-price").textContent}`;

        alert(purchaseDetails);

        // Clear cart
        cart = [];
        // Clear localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartSummary();
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
