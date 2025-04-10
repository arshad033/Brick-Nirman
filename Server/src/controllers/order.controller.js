import { Order } from '../models/order.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
// ✅ Create a New Order
export const createOrder = asyncHandler(async (req, res) => {
  const { products, totalAmount, paymentMethod, deliveryAddress } = req.body;
  const userId = req.user._id;
  // Validate required fields
  if (
    !userId ||
    !products ||
    !totalAmount ||
    !paymentMethod ||
    !deliveryAddress
  ) {
    throw new ApiError(400, 'All required fields must be provided');
  }

  // Validate products array
  if (!Array.isArray(products) || products.length === 0) {
    throw new ApiError(400, 'Products array must contain at least one product');
  }

  products.forEach((product) => {
    if (!product.productId || !product.quantity || !product.price) {
      throw new ApiError(
        400,
        'Each product must have productId, quantity, and price'
      );
    }
  });

  // Create order object
  const order = new Order({
    userId,
    products,
    totalAmount,
    paymentMethod,
    deliveryAddress,
  });

  await order.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, true, order, null, 'Order created successfully')
    );
});

// ✅ Get All Orders with Population
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({userId:req.user._id});
  // ✅ Validation: Check if orders exist
  if (!orders || orders.length === 0) {
    throw new ApiError(404, 'No orders found');
  }
  try {
    if(req.user?._id ){
        const orders = await Order.find({ userId: req.user?._id });       
        // ✅ Validation: Check if orders exist
        if (!orders || orders.length === 0) {
            throw new ApiError(404, "No orders found");
        }
        // ✅ Send structured response
        res.status(200).json(
            new ApiResponse(200,  orders, "Orders fetched successfully")
        );
    }

    } catch (error) {
        console.log(error);
    }

});

// ✅ Get Order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // ✅ Validation: Check if the order exists
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  // ✅ Send structured response
  res
    .status(200)
    .json(
      new ApiResponse(200, true, order, null, 'Order fetched successfully')
    );
});

// ✅ Update Order by ID
export const updateOrder = asyncHandler(async (req, res) => {
  const { street, city, state, zip, country, mobileNumber } = req.body;

  // ✅ Validation: Ensure at least one field is provided
  if (!street && !city && !state && !zip && !country && !mobileNumber) {
    throw new ApiError(400, 'Provide at least one field to update');
  }

  const updatedOrder = await Order.findById(req.params.id);

  // ✅ Check if the order exists
  if (!updatedOrder) {
    throw new ApiError(404, 'Order not found');
  }

  // ✅ Update address fields if provided
  if (street) updatedOrder.deliveryAddress.street = street;
  if (city) updatedOrder.deliveryAddress.city = city;
  if (state) updatedOrder.deliveryAddress.state = state;
  if (zip) updatedOrder.deliveryAddress.zip = zip;
  if (country) updatedOrder.deliveryAddress.country = country;

  // ✅ Update mobile number if provided
  if (mobileNumber) {
    updatedOrder.mobileNumber = mobileNumber;
  }

  await updatedOrder.save();

  // ✅ Send structured response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        true,
        updatedOrder,
        null,
        'Order updated successfully'
      )
    );
});

// ✅ Cancel Order by ID
export const cancelOrder = asyncHandler(async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  // ✅ Validation: Check if the order exists
  if (!deletedOrder) {
    throw new ApiError(404, 'Order not found');
  }

  // ✅ Send structured response
  res
    .status(200)
    .json(
      new ApiResponse(200, true, null, null, 'Order canceled successfully')
    );
});

// ✅ Update Order Status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  // const { deliveryStatus, paymentStatus } = req.body;

  // // ✅ Validation: Ensure at least one status is provided
  // if (!deliveryStatus && !paymentStatus) {
  //   throw new ApiError(
  //     400,
  //     'Provide deliveryStatus or paymentStatus to update'
  //   );
  // }

  const order = await Order.findById(req.params.id);

  // ✅ Check if the order exists
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }

  // ✅ Update delivery status and calculate delivery time if delivered

    order.deliveryStatus = 'Cancelled';

    // if (deliveryStatus === 'Delivered') {
    //   const createdAt = order.createdAt;
    //   const deliveredAt = new Date();

    //   // Calculate delivery time in days
    //   const deliveryTime = Math.ceil(
    //     (deliveredAt - createdAt) / (1000 * 60 * 60 * 24)
    //   );

    //   order.deliveryTimeInDays = deliveryTime;
    // }
  


  await order.save();

  // ✅ Send structured response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        order,
        'Order status updated successfully'
      )
    );
});
// ✅ Delete All Orders
export const deleteAllOrders = asyncHandler(async (req, res) => {
  const result = await Order.deleteMany({});

  // ✅ Validation: Check if any documents were deleted
  if (result.deletedCount === 0) {
    throw new ApiError(404, 'No orders found to delete');
  }

  // ✅ Send structured response
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        true,
        null,
        null,
        `${result.deletedCount} orders deleted successfully`
      )
    );
});
