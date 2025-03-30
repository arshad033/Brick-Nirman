import { Supplier } from '../models/supplierModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// Create a new supplier
export const createSupplier = asyncHandler(async (req, res) => {
  const { supplierId, name, gstNumber, phone, email, address, serviceArea } =
    req.body;
  if (
    !supplierId ||
    !name ||
    !gstNumber ||
    !phone ||
    !email ||
    !address ||
    !serviceArea
  ) {
    throw new ApiError(400, 'All fields are required');
  }

  const supplier = await Supplier.create({
    supplierId,
    name,
    gstNumber,
    phone,
    email,
    address,
    serviceArea,
  });

  res
    .status(201)
    .json(new ApiResponse(201, supplier, 'Supplier created successfully'));
});

// Get all suppliers
export const getAllSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find();
  res
    .status(200)
    .json(new ApiResponse(200, suppliers, 'Suppliers retrieved successfully'));
});

// Get a single supplier by ID
export const getSupplierById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const supplier = await Supplier.findById(id);

  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }

  res
    .status(200)
    .json(new ApiResponse(200, supplier, 'Supplier retrieved successfully'));
});

// Update a supplier
export const updateSupplier = asyncHandler(async (req, res) => {
  const { name, gstNumber, phone, email, address, serviceArea } = req.body;
  const supplier = await Supplier.findOne({ supplierId: req.user?._id });

  if (!supplier) {
    throw new ApiError(404, 'Supplier not found');
  }

  if (name) {
    supplier.name = name;
  }
  if (gstNumber) {
    supplier.gstNumber = gstNumber;
  }
  if (phone) {
    supplier.phone = phone;
  }
  if (email) {
    supplier.email = email;
  }
  if (address) {
    supplier.address = address;
  }
  if (serviceArea) {
    supplier.serviceArea = serviceArea;
  }

  await supplier.save();
  const updatedSupplier = await Supplier.find({ supplierId: req.user?._id });
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedSupplier, 'Supplier updated successfully')
    );
});

// Delete a supplier
export const deleteSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  if (role == 'user') {
    throw new ApiError(403, 'Unauthorized to delete supplier');
  }
  if (role == 'admin' || role == 'supplier') {
    const supplier = await Supplier.findByIdAndDelete(id);
    if (!supplier) {
      throw new ApiError(404, 'Supplier not found');
    }
  }
  res
    .status(200)
    .json(new ApiResponse(200, null, 'Supplier deleted successfully'));
});
