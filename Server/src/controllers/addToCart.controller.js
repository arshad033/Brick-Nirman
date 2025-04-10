import { AddToCart } from '../models/addToCart.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, price } = req.body;

  if (!productId || !price) {
    throw new ApiError(400, 'Product ID and price are required');
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
      price,
    });
  }
  await cart.save();

  res
    .status(201)
    .json(new ApiResponse(201, cart, 'Product added to cart successfully'));
});

export const updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity, price } = req.body;

  if (!productId || (!quantity && !price)) {
    throw new ApiError(
      400,
      'Product ID and at least one field (quantity or price) are required'
    );
  }

  const userId = req.user._id;

  const cart = await AddToCart.findOne({ userId, productId });

  if (!cart) {
    throw new ApiError(404, 'Product not found in cart');
  }

  // ✅ Update quantity and/or price if provided
  if (quantity) cart.quantity = quantity;
  if (price) cart.price = price;

  await cart.save();

  res.status(200).json(new ApiResponse(200, cart, 'Cart updated successfully'));
});

export const getAllCartProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cartProducts = await AddToCart.find({ userId }).populate('productId'); // ✅ Populating product details if needed

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        cartProducts,
        'Fetched all cart products successfully'
      )
    );
});

export const checkCartProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const userId = req.user._id;

  const isInCart = await AddToCart.exists({ userId, productId });

  res
    .status(200)
    .json(
      new ApiResponse(200, { isInCart: !!isInCart }, 'Cart check complete')
    );
});

// ✅ Remove from Cart by quantity
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const userId = req.user._id;

  const cartItem = await AddToCart.findOne({ userId, productId });

  if (!cartItem) {
    throw new ApiError(404, 'Product not found in cart');
  }

  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
    await cartItem.save();
  } else {
    await AddToCart.deleteOne({ _id: cartItem._id });
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Product quantity updated or removed from cart successfully'
      )
    );
});

// ✅ Remove from Cart totally
export const removeCartItemCompletely = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const userId = req.user._id;

  const deleted = await AddToCart.findOneAndDelete({ userId, productId });

  if (!deleted) {
    throw new ApiError(404, 'Product not found in cart');
  }

  res
    .status(200)
    .json(new ApiResponse(200, 'Product removed from cart completely'));
});
// ✅ Remove All Items from Cart
export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // ✅ Delete all cart items for the user
  const result = await AddToCart.deleteMany({ userId });

  // ✅ Check if any items were deleted
  if (result.deletedCount === 0) {
    throw new ApiError(404, 'Cart is already empty');
  }

  // ✅ Send structured response
  res
    .status(200)
    .json(
      new ApiResponse(200, true, null, null, 'All items removed from cart')
    );
});
