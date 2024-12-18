// Modal functionality (Shop button)
var modal = document.getElementById('shopModal');
var shopLink = document.getElementById('shopLink');
var closeModal = document.getElementsByClassName('close')[0];

// When the user clicks on the "Shop" link, open the modal
shopLink.onclick = function() {
    modal.style.display = "block"; // Show the modal
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.style.display = "none"; // Hide the modal
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal if outside is clicked
    }
}

// Cart functionality: Create an empty cart array
var cart = [];

// Handle "Add to Cart" button clicks
function addToCart(productName, productPrice) {
    // Create a product object and push it to the cart
    var product = {
        name: productName,
        price: productPrice
    };
    cart.push(product);
    updateCartDisplay();
}

// Update the cart display (show items in cart)
function updateCartDisplay() {
    var cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = ""; // Clear current cart items

    // Loop through the cart and display each item
    cart.forEach(function(product, index) {
        var productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <p><strong>${product.name}</strong> - $${product.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(productElement);
    });

    // Update cart count in the navbar (or wherever you'd like)
    document.getElementById('cartCount').innerText = cart.length;
}

// Remove product from cart by index
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart
    updateCartDisplay(); // Update the cart display
}

// Checkout (simplified)
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        var total = cart.reduce(function(sum, product) {
            return sum + parseFloat(product.price);
        }, 0);
        alert("Your total is: $" + total.toFixed(2));
        // For now, we’ll clear the cart after checkout
        cart = [];
        updateCartDisplay(); // Update the cart display after checkout
    }
}

// Event listeners for "Add to Cart" buttons on products
document.getElementById('addProduct1').addEventListener('click', function() {
    addToCart("Stylish Jogger", 45.99);
});

document.getElementById('addProduct2').addEventListener('click', function() {
    addToCart("Cool Sneakers", 65.99);
});

// Event listener for "Checkout" button
document.getElementById('checkoutButton').addEventListener('click', function() {
    checkout();
});
