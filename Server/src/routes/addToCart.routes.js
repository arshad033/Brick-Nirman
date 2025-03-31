import { Router } from "express";
const router = Router();
import { 
    addToCart, 
    updateCart, 
    removeFromCart 
} from "../controllers/addToCart.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

// ✅ Protect all routes with JWT authentication
router.use(verifyJwt);

// ✅ Routes
router.route("/add-to-cart").post(addToCart);
router.route("/update-cart").put(updateCart);
router.route("/remove-from-cart").delete(removeFromCart);

export default router;
