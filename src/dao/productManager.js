

class ProductManager {
  constructor() {
    this.products = [];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  addProduct(product) {
    this.products.push(product);
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id };
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
 