// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = [];
        this.cartElement = document.getElementById('shopping-cart');
        this.cartCountElement = document.getElementById('cart-count');
        this.cartTotalElement = document.getElementById('cart-total');
        this.loadCart();
        this.updateCartDisplay();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('hrelevate-cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('hrelevate-cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(id, name, price, type) {
        // Check if item already exists in cart
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: id,
                name: name,
                price: price,
                type: type,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${name} toegevoegd aan winkelwagen`);
    }

    // Remove item from cart
    removeItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const removedItem = this.items[index];
            this.items.splice(index, 1);
            this.saveCart();
            this.updateCartDisplay();
            this.showNotification(`${removedItem.name} verwijderd uit winkelwagen`);
        }
    }

    // Update item quantity
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(id);
            } else {
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    // Calculate total price
    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
    }

    // Count total items
    countItems() {
        return this.items.reduce((count, item) => {
            return count + item.quantity;
        }, 0);
    }

    // Update cart display
    updateCartDisplay() {
        // Update cart count
        if (this.cartCountElement) {
            const itemCount = this.countItems();
            this.cartCountElement.textContent = itemCount;
            this.cartCountElement.style.display = itemCount > 0 ? 'flex' : 'none';
        }

        // Update cart total if on checkout page
        if (this.cartTotalElement) {
            const total = this.calculateTotal();
            this.cartTotalElement.textContent = `€${total.toFixed(2)}`;
        }

        // Update cart items list if on checkout page
        if (this.cartElement) {
            if (this.items.length === 0) {
                this.cartElement.innerHTML = '<p>Je winkelwagen is leeg.</p>';
                document.getElementById('checkout-button').style.display = 'none';
            } else {
                let cartHTML = '<ul class="cart-items">';
                
                this.items.forEach(item => {
                    const itemTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
                    cartHTML += `
                        <li class="cart-item">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <p>${item.type} | €${parseFloat(item.price).toFixed(2)}</p>
                            </div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                            <div class="cart-item-total">
                                <p>€${itemTotal}</p>
                                <button class="remove-btn" onclick="cart.removeItem('${item.id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>
                    `;
                });
                
                cartHTML += '</ul>';
                this.cartElement.innerHTML = cartHTML;
                document.getElementById('checkout-button').style.display = 'block';
            }
        }
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    // Process checkout
    checkout() {
        // Here you would typically integrate with a payment processor
        alert('Bedankt voor je bestelling! Je wordt doorgestuurd naar de betaalpagina.');
        // For demo purposes, we'll just clear the cart
        this.clearCart();
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global cart instance
    window.cart = new ShoppingCart();
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const id = productCard.dataset.id || Math.random().toString(36).substr(2, 9);
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.card-price').textContent;
            const price = parseFloat(priceText.replace('€', '').replace(',', '.'));
            const type = productCard.querySelector('.card-category').textContent;
            
            cart.addItem(id, name, price, type);
        });
    });
});
