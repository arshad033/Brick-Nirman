import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantityAvailable: {
      type: Number,
      required: true,
      min: 0,
    },
    size: {
      type: String, // e.g., "9x4x3 inches"
      required: true,
    },
    grade: {
      type: String, // e.g., "A", "B", "C"
      required: true,
    },
    image: {
      type: String, // Array of image URL
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: {
          type: String,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);
