import { Router } from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from '../controllers/supplier.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

// Create a new supplier
router.route('/').post(verifyJwt, createSupplier);

// Get all suppliers
router.route('/').get(verifyJwt, getAllSuppliers);

// Get a single supplier by ID
router.route('/:id').get(verifyJwt, getSupplierById);

// Update a supplier
router.route('/:id').put(verifyJwt, updateSupplier);

// Delete a supplier
router.route('/:id').delete(verifyJwt, deleteSupplier);

export default router;
