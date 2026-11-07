const products = [
    { id: 1, name: "Wireless Headphones", price: 89.99 },
    { id: 2, name: "Mechanical Keyboard", price: 129.99 },
    { id: 3, name: "Ergonomic Mouse", price: 59.99 },
    { id: 4, name: "Smart Watch", price: 199.99 }
];

// Cart structured state mapping item IDs to quantities
let cart = {}; 

// Render products dynamically
const productGrid = document.getElementById('product-grid');
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
});

// Logic: Add item to cart
function addToCart(productId) {
    if (cart[productId]) {
        cart[productId] += 1;
    } else {
        cart[productId] = 1;
    }
    updateCartUI();
}

// Logic: Change item quantity directly from the sidebar
function changeQuantity(productId, delta) {
    if (!cart[productId]) return;
    cart[productId] += delta;
    if (cart[productId] <= 0) {
        delete cart[productId];
    }
    updateCartUI();
}

// Calculate totals and refresh the user interface
function updateCartUI() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;

    Object.keys(cart).forEach(id => {
        const product = products.find(p => p.id == id);
        const quantity = cart[id];
        const itemTotal = product.price * quantity;
        
        totalItems += quantity;
        totalPrice += itemTotal;

        const li = document.createElement('li');
        li.className = 'cart-item-row';
        li.innerHTML = `
            <span>${product.name} (x${quantity})</span>
            <div>
                <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
        cartItemsElement.appendChild(li);
    });

    // Update global indicators
    document.getElementById('cart-count').innerText = totalItems;
    document.getElementById('cart-total-price').innerText = totalPrice.toFixed(2);
    document.getElementById('modal-total-price').innerText = totalPrice.toFixed(2);

    // Toggle checkout button state based on cart emptiness
    const checkoutBtn = document.getElementById('checkout-btn');
    if (totalItems > 0) {
        checkoutBtn.removeAttribute('disabled');
        checkoutBtn.style.backgroundColor = '#007bff';
    } else {
        checkoutBtn.setAttribute('disabled', 'true');
        checkoutBtn.style.backgroundColor = '#6c757d';
    }
}

// Logic: Proceed to Checkout UI Action
function openCheckout() {
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Logic: Place Order Feature & Local Receipt Creation
function placeOrder(event) {
    event.preventDefault(); // Stop webpage from refreshing
    
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const orderId = 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
    const date = new Date().toLocaleString();
    
    let total = 0;
    let itemsReceiptText = '';

    Object.keys(cart).forEach(id => {
        const product = products.find(p => p.id == id);
        const quantity = cart[id];
        const itemTotal = product.price * quantity;
        total += itemTotal;
        itemsReceiptText += `- ${product.name} x${quantity} : $${itemTotal.toFixed(2)}\n`;
    });

    // Generate a downloadable text receipt invoice string
    const invoiceText = `==================================
LOCAL DEV SHOP - RECEIPT INVOICE
==================================
Order ID:   ${orderId}
Date:       ${date}
Customer:   ${name}
Email:      ${email}
----------------------------------
Items Purchased:
${itemsReceiptText}
----------------------------------
TOTAL PAID: $${total.toFixed(2)}
==================================
Thank you for testing your app local build!`;

    // Trigger local machine prompt and browser auto-download mechanism
    alert(`Order Placed Successfully!\n\nThank you, ${name}.\nYour Order ID is: ${orderId}\n\nYour mock receipt invoice .txt file will now download.`);
    
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${orderId}_receipt.txt`;
    link.click();

    // Reset workflow back to starting baseline state
    cart = {};
    document.getElementById('order-form').reset();
    closeCheckout();
    updateCartUI();
}
