const products = [
    { id: 1, name: "Wireless Headphones", price: 89.99 },
    { id: 2, name: "Mechanical Keyboard", price: 129.99 },
    { id: 3, name: "Ergonomic Mouse", price: 59.99 },
    { id: 4, name: "Smart Watch", price: 199.99 }
];

let cart = [];

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

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(li);
        total += item.price;
    });
    document.getElementById('cart-total-price').innerText = total.toFixed(2);
}
