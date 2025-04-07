import { Router } from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplier.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

// Create a new supplier
router.route('/register').post(createSupplier);

// Get all suppliers
router.route('/').get(getAllSuppliers);

// Get a single supplier by ID
router.route('/:id').get(getSupplierById);

// Update a supplier
router.route('/update').put(upload.single('avatar'),verifyJwt, updateSupplier);

// Delete a supplier
router.route('/delete').delete(verifyJwt, deleteSupplier);

export default router;
