import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//generate the access and resfresh token
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    //save refresh token to the db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      'something went wrong while generating refresh and access token'
    );
  }
};
// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address, role, password } = req.body;

  // Validate required fields
  if (!fullName || !email || !phone || !role || !password) {
    throw new ApiError(400, 'Please fill all required fields');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  // Handle avatar upload if provided
  console.log('req files: ', req.file);
  // console.log(req.files.avatar);
  let avatarUrl;
  if (req.file) {
    const avatarLocalPath = req.file.path;
    console.log(avatarLocalPath);

    const avatarResponse = await uploadOnCloudinary(avatarLocalPath);
    console.log('avatarResponse: ', avatarResponse);

    if (!avatarResponse) {
      throw new ApiError(500, 'Failed to upload avatar file');
    }

    avatarUrl = avatarResponse.url;
  }

  // Create new user
  const user = await User.create({
    fullName,
    email,
    phone,
    address,
    avatar: avatarUrl, // This will be undefined if no avatar was uploaded
    role,
    password,
  });

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  // Return success response
  res
    .status(201)
    .json(new ApiResponse(201, userResponse, 'User registered successfully'));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Both fields are required');
  }
  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!user || !isPasswordCorrect) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  //send refresh token to frontend
  const option = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie('accessToken', accessToken, option)
    .cookie('refreshToken', refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged in Succesfully'
      )
    );
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');

  res.json(new ApiResponse(200, user, 'User profile retrieved successfully'));
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'User not found');
  if (fullName) {
    user.fullName = fullName;
  }
  if (email) {
    user.email = email;
  }
  if (phone) {
    user.phone = phone;
  }
  if (address) {
    user.address = address;
  }
  if (password) {
    user.password = password;
  }
  await user.save();
  const updatedUser = await User.findOne(req.user?._id);
  res.json(
    new ApiResponse(200, updatedUser, 'User profile updated successfully')
  );
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // console.log("see: ", token);
  //Remove refresh token form the db
  await User.findOneAndUpdate(
    { _id: userId },
    { $unset: { refreshToken: 1 } },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged Out'));
});
