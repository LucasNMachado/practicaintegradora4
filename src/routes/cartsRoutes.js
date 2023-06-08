const express = require('express');
const router = express.Router();
const CartManager = require('../cartManager');

const cartManager = new CartManager('./src/data/carrito.json');

router.post('/', (req, res) => {
  const cart = req.body;
  cartManager.createCart(cart);
  res.status(201).json({ message: 'Carrito creado correctamente' });
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = cartManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

module.exports = router;
