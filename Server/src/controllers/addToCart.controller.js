import { AddToCart } from "../models/AddToCart.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, price } = req.body;

    if (!productId || !price) {
        throw new ApiError(400, "Product ID and price are required");
    }

    const userId = req.user._id;

    // ✅ Check if product is already in the cart
    let cart = await AddToCart.findOne({ userId, productId });

    if (cart) {
        // ✅ If product exists, increase the quantity
        cart.quantity += 1;
    } else {
        // ✅ If product doesn't exist, create a new cart entry
        cart = await AddToCart.create({
            userId,
            productId,
            quantity: 1,
            price
        });
    }
    await cart.save();

    res.status(201).json(
        new ApiResponse(201, cart, "Product added to cart successfully")
    );
});

export const updateCart = asyncHandler(async (req, res) => {
    const { productId, quantity, price } = req.body;

    if (!productId || (!quantity && !price)) {
        throw new ApiError(400, "Product ID and at least one field (quantity or price) are required");
    }

    const userId = req.user._id;

    const cart = await AddToCart.findOne({ userId, productId });

    if (!cart) {
        throw new ApiError(404, "Product not found in cart");
    }

    // ✅ Update quantity and/or price if provided
    if (quantity) cart.quantity = quantity;
    if (price) cart.price = price;

    await cart.save();

    res.status(200).json(
        new ApiResponse(200, cart, "Cart updated successfully")
    );
});

// ✅ Remove from Cart
export const removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    const userId = req.user._id;

    const cart = await AddToCart.findOneAndDelete({ userId, productId });

    if (!cart) {
        throw new ApiError(404, "Product not found in cart");
    }

    res.status(200).json(
        new ApiResponse(200, "Product removed from cart successfully")
    );
});