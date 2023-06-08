
const express = require('express');
const ProductManager = require('./productManager');
const router = express.Router();

const productManager = new ProductManager();


router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


router.post('/', (req, res) => {
  const { name, price } = req.body;
  const id = Date.now().toString(); 
  const newProduct = { id, name, price };
  productManager.addProduct(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const updatedProduct = { name, price };
  const success = productManager.updateProduct(id, updatedProduct);
  if (success) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const success = productManager.deleteProduct(id);
  if (success) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

module.exports = router;
