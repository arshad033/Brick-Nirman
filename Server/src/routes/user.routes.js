import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

// User Registration
router.route('/register').post(upload.single('avatar'), registerUser);

// User Login
router.route('/login').post(loginUser);

// User Logout
router.route('/logout').post(verifyJwt, logoutUser);

// Get User Profile (Protected Route)
router.route('/profile').get(verifyJwt, getUserProfile);

// Update User Profile (Protected Route)
router.route('/update-profile').put(verifyJwt, updateUserProfile);

export default router;
