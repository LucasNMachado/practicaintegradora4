import { Router } from "express";
import { productsGet, productsId, productsAdd, productsUpdate, productsDelete} from "../controllers/productsController.js";
import { mockingProducts } from "../controllers/mockController.js";
const router = Router();

router.get('/mockingproducts', mockingProducts);

router.get("/", productsGet); 

router.get("/:pid", productsId);

router.post("/", productsAdd); 

router.put("/:pid", productsUpdate); 

router.delete("/:pid", productsDelete); 


export default router;
