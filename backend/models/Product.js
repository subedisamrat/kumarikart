import mongoose from "mongoose";

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
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", ProductSchema);
