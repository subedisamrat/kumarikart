import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  { timestamps: true },
);

export const ProductReview = mongoose.model("Review", productReviewSchema);
