import { Router } from 'express';
const router = Router();
import {
  addToCart,
  updateCart,
  removeFromCart,
  getAllCartProducts,
  checkCartProduct,
  removeCartItemCompletely,
} from '../controllers/addToCart.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

// ✅ Protect all routes with JWT authentication
router.use(verifyJwt);

// ✅ Routes
router.route('/add-to-cart').post(addToCart);
router.route('/update-cart').put(updateCart);
router.route('/get-cart').get(getAllCartProducts);
router.route('/check-cart/:productId').get(checkCartProduct);
router.route('/remove-from-cart/:productId').delete(removeFromCart);
router
  .route('/remove-from-cart-complete/:productId')
  .delete(removeCartItemCompletely);

export default router;
