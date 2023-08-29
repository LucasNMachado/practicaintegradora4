import { Router } from "express";
import { getCarts, createCart, getIdCart, getIdProductCart, cartUpdate, updateQuantity, cartDelete, deleteProduct } from "../controllers/cartsController.js";
import { purchaseCart } from "../controllers/cartPurchaseController.js";
import { isUser } from "../middlewares/role.js";

const router = Router();

router.get("/", getCarts);

router.get("/", createCart);

router.get("/:cid", getIdCart);

router.post("/:cid/product/:pid", getIdProductCart);

router.post("/:cid/purchase", isUser, purchaseCart);

router.put("/:cid", cartUpdate);

router.put("/:cid/products/:pid", updateQuantity);

router.delete("/:cid", cartDelete); 

router.delete("/:cid/products/:pid", deleteProduct); 

export default router;
