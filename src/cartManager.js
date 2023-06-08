const fs = require('fs');

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.carts = this.loadCarts();
  }

  loadCarts() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      return [];
    }
  }

  saveCarts() {
    const jsonData = JSON.stringify(this.carts, null, 2);
    fs.writeFileSync(this.filePath, jsonData);
  }

  createCart(cart) {
    const newCart = { ...cart, id: this.generateId(), products: [] };
    this.carts.push(newCart);
    this.saveCarts();
  }

  getCartById(cartId) {
    const cart = this.carts.find((cart) => cart.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    return cart;
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const existingProduct = cart.products.find((product) => product.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }
    this.saveCarts();
  }

  generateId() {
    let id;
    do {
      id = Math.random().toString(36).substr(2, 9);
    } while (this.carts.some((cart) => cart.id === id));
    return id;
  }
}

module.exports = CartManager;
