import mongoose, { Schema } from 'mongoose';

const addToFavSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Assuming you are favoriting suppliers or specific products
    supplierId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: false },
  },
  { timestamps: true }
);

export const AddToFav = mongoose.model('AddToFav', addToFavSchema);
