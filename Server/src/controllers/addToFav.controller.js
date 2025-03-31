import { AddToFav } from "../models/AddToFav.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Add to Favorites
export const addToFavorites = asyncHandler(async (req, res) => {
    const { productId, supplierId } = req.body;

    if (!productId && !supplierId) {
        throw new ApiError(400, "Product ID or Supplier ID is required");
    }

    const userId = req.user._id;

    // ✅ Check if already in favorites
    let existingFav = await AddToFav.findOne({ userId, productId, supplierId });

    if (existingFav) {
        throw new ApiError(409, "Already in favorites");
    }

    const favorite = await AddToFav.create({
        userId,
        productId: productId || null,
        supplierId: supplierId || null,
    });

    res.status(201).json(
        new ApiResponse(201, favorite, "Added to favorites successfully")
    );
});

// ✅ Get Favorites
export const getFavorites = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const favorites = await AddToFav.find({ userId })
        .populate("productId", "name price images")
        .populate("supplierId", "name email");

    if (!favorites.length) {
        throw new ApiError(404, "No favorites found");
    }

    res.status(200).json(
        new ApiResponse(200, favorites, "Favorites retrieved successfully")
    );
});

// ✅ Remove from Favorites
export const removeFromFavorites = asyncHandler(async (req, res) => {
    const { productId, supplierId } = req.body;

    if (!productId && !supplierId) {
        throw new ApiError(400, "Product ID or Supplier ID is required");
    }

    const userId = req.user._id;

    const favorite = await AddToFav.findOneAndDelete({
        userId,
        productId: productId || null,
        supplierId: supplierId || null,
    });

    if (!favorite) {
        throw new ApiError(404, "Favorite not found");
    }

    res.status(200).json(
        new ApiResponse(200, "Removed from favorites successfully")
    );
});
