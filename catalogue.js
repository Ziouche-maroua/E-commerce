let cart = [];

function addNewProduct() {
    // Récupérer les valeurs du formulaire
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const description = document.getElementById("productDescription").value;
    const imageFile = document.getElementById("productImage").files[0];

    // Vérification que tous les champs sont remplis
    if (!name || !price || !description || !imageFile) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Créer une URL pour l'image
    const imageUrl = URL.createObjectURL(imageFile);

    // Créer un nouvel élément produit
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h3>${name}</h3>
        <p>Prix : ${price}DZD</p>
        <p>Description : ${description}</p>
        <button onclick="addToCart('${name}', ${price})">Ajouter au panier</button>
        <p class="already-added" style="display: none;">Déjà ajouté</p>
    `;

    // Ajouter le nouveau produit dans la grille de produits
    document.querySelector(".catalogue").appendChild(productDiv);

    // Réinitialiser le formulaire
    document.getElementById("productForm").reset();
}

function addToCart(name, price) {
    const alreadyAdded = cart.some(product => product.name === name);

    if (!alreadyAdded) {
        cart.push({ name, price });
        updateCartSummary();

        // Marquer l'article comme déjà ajouté
        const productElements = document.querySelectorAll(".product");
        productElements.forEach(product => {
            if (product.querySelector("h3").textContent === name) {
                product.querySelector(".already-added").style.display = 'block';
            }
        });
    }
}

function updateCartSummary() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - ${product.price}€`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Supprimer";
        removeButton.className = "remove-btn";
        removeButton.onclick = () => removeFromCart(index);

        li.appendChild(removeButton);
        cartList.appendChild(li);
        
        total += product.price;
    });

    totalPrice.textContent = `Total : ${total}€`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartSummary();
}

function confirmPurchase() {
    if (cart.length === 0) {
        alert("Votre panier est vide.");
    } else {
        alert("Merci pour votre achat ! Vous avez acheté " + cart.length + " article(s) pour un total de " + document.getElementById("total-price").textContent);
        cart = [];
        updateCartSummary();

        document.querySelectorAll(".already-added").forEach(el => el.style.display = 'none');
    }
}
