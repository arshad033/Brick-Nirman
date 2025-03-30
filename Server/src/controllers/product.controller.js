import { Product } from "../models/Product.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, category, price, quantityAvailable, size, grade, supplierId } = req.body;

    // ✅ Validation: Ensure required fields
    if (!name || !description || !category || !price || !quantityAvailable || !size || !grade || !supplierId) {
        throw new ApiError(400, "All fields are required");
    }

    // ✅ Extract image paths from `req.files`
    const imagePaths = req.files?.images?.path

    // ✅ Validate image presence
    if (!imagePaths) {
        throw new ApiError(400, "At least one image is required");
    }

    const uploadedImage = await uploadOnCloudinary(imagePaths);

    if (!uploadedImage) {
        throw new ApiError(500, `Failed to upload image`);
    }

    // ✅ Create new product with Cloudinary URLs
    const newProduct = await Product.create({
        name,
        description,
        category,
        price,
        quantityAvailable,
        size,
        grade,
        images: uploadedImage,
        supplierId
    });

    res.status(201).json(
        new ApiResponse(201, true, newProduct, null, "Product created successfully")
    );
});


export const getAllProducts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search, category, minPrice, maxPrice } = req.query;

    const filters = {};

    // ✅ Filtering
    if (search) {
        filters.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } }
        ];
    }

    if (category) filters.category = category;
    if (minPrice) filters.price = { ...filters.price, $gte: minPrice };
    if (maxPrice) filters.price = { ...filters.price, $lte: maxPrice };

    const skip = (page - 1) * limit;

    const products = await Product.find(filters)
        .populate("supplierId", "name contact")  // Populate supplier details
        .populate("reviews.userId", "name email")  // Populate review user details
        .sort({ createdAt: -1 })  // Sort by newest
        .skip(skip)
        .limit(Number(limit));

    const totalProducts = await Product.countDocuments(filters);

    if (!products || products.length === 0) {
        throw new ApiError(404, "No products found");
    }

    res.status(200).json(
        new ApiResponse(200, true, {
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Number(page),
        }, null, "Products fetched successfully")
    );
});

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate("supplierId", "name contact")  // Populate supplier details
        .populate("reviews.userId", "name email");  // Populate review user details

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json(
        new ApiResponse(200, true, product, null, "Product fetched successfully")
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, category, price, quantityAvailable, size, grade, supplierId } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // ✅ Extract image paths from `req.files`
    const imagePaths = req.files?.images?.path
    let uploadedImage
    if (imagePaths) {  
        uploadedImage = await uploadOnCloudinary(path);
    }

    // ✅ Update only provided fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (quantityAvailable) product.quantityAvailable = quantityAvailable;
    if (size) product.size = size;
    if (grade) product.grade = grade;
    if (supplierId) product.supplierId = supplierId;
    if (uploadedImage) product.images = uploadedImage;

    await product.save();

    res.status(200).json(
        new ApiResponse(200, true, product, null, "Product updated successfully")
    );
});


export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json(
        new ApiResponse(200, true, null, null, "Product deleted successfully")
    );
});
