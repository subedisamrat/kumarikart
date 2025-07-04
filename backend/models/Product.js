import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    // availableSize: {
    //   type: String,
    //   enum: ["S", "M", "L", "XL", "XXL", "-"],
    //   required: true,
    //   default: [],
    // },
    reviews: [reviewSchema],
    totalReviews: { type: Number, default: 0 },
    positiveReviews: { type: Number, default: 0 },
    wilsonScore: { type: Number, default: 0 },
    averageReview: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", ProductSchema);
