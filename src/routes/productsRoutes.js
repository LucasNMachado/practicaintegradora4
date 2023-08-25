import { Router } from "express";
import ProductManager from "../dao/mongo/productManager.js";
import { productsGet, productsId, productsAdd, productsUpdate, productsDelete} from "../controllers/productsControllers.js";

const router = Router();

router.get("/", productsGet); 

router.get("/:pid", productsId);

router.post("/", productsAdd); 

router.put("/:pid", productsUpdate); 

router.delete("/:pid", productsDelete); 

export default router;
