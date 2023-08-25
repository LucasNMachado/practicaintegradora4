import { Router } from "express";
import { getCarts, createCart, getIdCart, getIdProductCart, cartUpdate, updateQuantity, cartDelete, deleteProduct } from "../controllers/cartsController.js";

const router = Router();

router.get("/", getCarts);

router.get("/", createCart);

router.get("/:cid", getIdCart);

router.post("/:cid/product/:pid", getIdProductCart);

router.put("/:cid", cartUpdate);

router.put("/:cid/products/:pid", updateQuantity);

router.delete("/:cid", cartDelete); 

router.delete("/:cid/products/:pid", deleteProduct); 

export default router;
