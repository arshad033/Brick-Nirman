import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true, default: 'India' },
      geoLocation: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    serviceArea: {
      type: [String], // Array of service areas
    },
    paymentMethods: {
      type: [String], // Array of accepted payment methods
      default: ['Cash'],
    },
    paymentTerms: {
      type: String,
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Supplier = mongoose.model('Supplier', supplierSchema);
