const Cart = require('./models/cartModel');

class CartManager {
  async getAllCarts() {
    try {
      return await Cart.find();
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async getCart(id) {
    try {
      return await Cart.findById(id);
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async addCart() {
    try {
      const newCart = new Cart({
        products: []
      });
      return await newCart.save();
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async addProductToCart(id, idProduct) {
    try {
      const cart = await Cart.findById(id);
      if (!cart) {
        console.error("Carrito no encontrado");
        return null;
      }

      let productFind = cart.products.find(elem => elem?.product.toString() === idProduct);
      if (!productFind) {
        productFind = { product: idProduct, quantity: 0 };
        cart.products.push(productFind);
        console.log("Producto agregado al carrito");
      }
      productFind.quantity++;
      await cart.save();
      return productFind;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}

module.exports = new CartManager();
