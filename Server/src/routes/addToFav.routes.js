import { Router } from "express";
const router = Router();
import { 
    addToFavorites, 
    getFavorites, 
    removeFromFavorites 
} from "../controllers/addToFav.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

// ✅ Protect all routes with JWT authentication
router.use(verifyJwt);

// ✅ Routes
router.route("/add-to-favorites").post(addToFavorites);
router.route("/get-favorites").get(getFavorites);
router.route("/remove-favorites").delete(removeFromFavorites);

export default router;
