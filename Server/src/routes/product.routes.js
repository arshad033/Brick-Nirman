import { Router } from 'express';
const router = Router();
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsBySupplierId,
} from '../controllers/product.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

// ✅ Routes
router
  .route('/create-product')
  .post(upload.single('image'), verifyJwt, createProduct);
router.route('/get-all-products').get(getAllProducts);
router.route('/update-product/:id').patch(verifyJwt, updateProduct);
router.route('/delete-product/:id').delete(verifyJwt, deleteProduct);
router.route('/get-product/:id').get(getProductById);
router.route('/get-supplier-products/:id').get(getProductsBySupplierId);

export default router;
