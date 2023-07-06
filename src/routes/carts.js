const express = require('express');
const router = express.Router();

const CartManager = require('../dao/cartManager');

const cartManager = new CartManager();


router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.json({ status: 'success', payload: carts });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCart(cid);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartManager.deleteProductFromCart(cid, pid);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const cart = await cartManager.updateCart(cid, products);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartManager.updateProductQuantity(cid, pid, quantity);
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});


router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    await cartManager.deleteCart(cid);
    res.json({ status: 'success', message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

module.exports = router;
