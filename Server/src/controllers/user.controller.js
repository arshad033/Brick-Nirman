import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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
  if (!fullName || !email || !phone || !role || !password) {
    throw new ApiError(400, 'Please fill all required fields');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (avatarLocalPath) {
    const avatarResponse = await uploadFileOnCloudinary(avatarLocalPath);
    if (!avatarResponse) {
      throw new ApiError(500, 'Failed to upload avatar file');
    }
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, 'User already exists');

  const user = await User.create({
    fullName,
    email,
    phone,
    address,
    avatar: avatarResponse.url,
    role,
    password,
  });

  res
    .status(201)
    .json(new ApiResponse(201, user, 'User registered successfully'));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

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
  const { fullName, email, phone, address } = req.body;

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
