import { Router } from "express";
const router = Router();
import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

// ✅ Protect all routes with JWT authentication
router.use(verifyJwt);

// ✅ Routes
router.route("/create-product").post(createProduct);
router.route("/get-all-products").get(getAllProducts);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);
router.route("/get-product/:id").get(getProductById);

export default router;
