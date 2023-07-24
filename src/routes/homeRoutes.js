import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductManager.getProducts();
  res.render("home", {
    products,
    style: "home.css",
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    style: "realTimeProducts.css",
  });
});

export default router;
