function displayCart() {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the container to display products
    const cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = ""; // Clear previous content

    // Check if the cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-gray-600">Votre panier est vide.</p>`;
        return;
    }

    // Create HTML for each product in the cart
    cart.forEach((product, index) => {
        const productHTML = `
            <div class="bg-white shadow p-6 rounded-lg flex justify-between items-start mb-4">
                <div>
                    <h2 class="text-lg font-bold">${product.name}</h2>
                    <p class="text-gray-600">Prix: ${product.price} DZD</p>
                </div>
                <div class="space-y-4">
                    <!-- Form for product options -->
                    <div class="space-y-2">
                        <label for="quantity-${index}" class="block">Nombre de pièces :</label>
                        <input 
                            type="number" 
                            id="quantity-${index}" 
                            min="1" 
                            value="${product.quantity}" 
                            class="border rounded p-2 w-full"
                            onchange="updateCart(${index}, 'quantity', this.value)"
                        >

                        <label for="color-${index}" class="block">Couleur :</label>
                        <select 
                            id="color-${index}" 
                            class="border rounded p-2 w-full"
                            onchange="updateCart(${index}, 'color', this.value)"
                        >
                            <option value="red" ${product.color === "red" ? "selected" : ""}>Rouge</option>
                            <option value="blue" ${product.color === "blue" ? "selected" : ""}>Bleu</option>
                            <option value="green" ${product.color === "green" ? "selected" : ""}>Vert</option>
                            <option value="black" ${product.color === "black" ? "selected" : ""}>Noir</option>
                        </select>

                        <label for="size-${index}" class="block">Taille (optionnel):</label>
                        <input 
                            type="text" 
                            id="size-${index}" 
                            placeholder="Ex: 30cm x 20cm" 
                            class="border rounded p-2 w-full"
                            value="${product.size || ""}"
                            onchange="updateCart(${index}, 'size', this.value)"
                        >
                    </div>

                    <!-- Cancel Button -->
                    <button onclick="removeFromCart(${index})" class="bg-red-500 text-white py-1 px-3 rounded">
                        Annuler
                    </button>
                </div>
            </div>
        `;

        cartContainer.innerHTML += productHTML;
    });

    // Add "Confirm Purchase" button
    cartContainer.innerHTML += `
        <div class="mt-6 text-center">
            <button onclick="confirmPurchase()" class="bg-green-500 text-white py-2 px-4 rounded">
                Confirmer l'achat
            </button>
        </div>
    `;
}

// Remove a product from the cart
function removeFromCart(index) {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove the product at the given index
    cart.splice(index, 1);

    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Refresh the cart display
    displayCart();
}

// Update a specific field in the cart
function updateCart(index, field, value) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index][field] = value; // Update the field with the new value
    localStorage.setItem("cart", JSON.stringify(cart)); // Save changes to localStorage
}

// Confirm Purchase
function confirmPurchase() {
    // Get the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the cart is empty
    if (cart.length === 0) {
        alert("Votre panier est vide. Ajoutez des produits pour continuer.");
        return;
    }

    // Prepare the purchase summary
    const summary = cart.map(
        (product) =>
            `Produit: ${product.name}\nQuantité: ${product.quantity}\nCouleur: ${product.color || "Non spécifique"}\nTaille: ${
                product.size || "Non spécifié"
            }\nPrix: ${product.price} DZD`
    ).join("\n\n");

    // Show a confirmation message
    const confirmation = confirm(
        `Résumé de votre achat:\n\n${summary}\n\nVoulez-vous confirmer l'achat ?`
    );

    if (confirmation) {
        alert("Merci pour votre achat ! Votre commande a été confirmée.");
        // Clear the cart after purchase
        localStorage.removeItem("cart");
        displayCart();
    }
}

// Run on page load
displayCart();
