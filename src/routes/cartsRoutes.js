const { Router } = require("express");
const CartManager = require("../dao/fs/cartManager");
const ProductManager = require("../dao/fs/productManager");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allCarts = await CartManager.getAllCarts();
    res.json(allCarts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await CartManager.addCart();
    res.json(newCart);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await CartManager.getCart(idCart);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart not exist" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await CartManager.getCart(idCart);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "failed", payload: "Cart not exist" });
    }
    const idProduct = parseInt(req.params.pid);
    const product = await ProductManager.getProductById(idProduct);
    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", payload: "Product not exist" });
    }

    const addProductToCart = await CartManager.addProductToCart(
      idCart,
      idProduct
    );
    res.json(addProductToCart);
  } catch (error) {
    console.error(error);
  }
});
//////////////////////////////////////////////////////////
//////////////////////CODIGO AGREGADO, HACIA ABAJO////////

router.put("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await CartManager.getCart(idCart);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart does not exist" });
    }

    const products = req.body.products;
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ status: "failed", error: "Invalid products data" });
    }

    cart.products = products;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await CartManager.getCart(idCart);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart does not exist" });
    }

    const idProduct = parseInt(req.params.pid);
    const product = await ProductManager.getProductById(idProduct);
    if (!product) {
      return res
        .status(404)
        .json({ status: "failed", error: "Product does not exist" });
    }

    const quantity = parseInt(req.body.quantity);
    if (isNaN(quantity)) {
      return res
        .status(400)
        .json({ status: "failed", error: "Invalid quantity value" });
    }

    const existingProduct = cart.products.find((p) => p.product.toString() === idProduct.toString());
    if (existingProduct) {
      existingProduct.quantity = quantity;
    } else {
      cart.products.push({ product: idProduct, quantity: quantity });
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const deletedCart = await CartManager.deleteCart(idCart);
    if (!deletedCart) {
      return res
        .status(404)
        .json({ status: "failed", payload: "Cart does not exist" });
    }
    res.json({ status: "success", payload: deletedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cart = await CartManager.getCart(idCart);
    if (!cart) {
      return res
        .status(404)
        .json({ status: "failed", error: "Cart does not exist" });
    }

    const idProduct = parseInt(req.params.pid);
    const existingProductIndex = cart.products.findIndex((p) => p.product.toString() === idProduct.toString());
    if (existingProductIndex === -1) {
      return res
        .status(404)
        .json({ status: "failed", error: "Product does not exist in the cart" });
    }

    cart.products.splice(existingProductIndex, 1);
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

///////////////////////////////////////////
///////////////////////////////////////////

module.exports = router;
