import { Product } from "../../models/Product.js";
import { calculateWilsonScore } from "../../utils/wilsonScore.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    //category filter

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    //sorting filter:

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;

      case "price-hightolow":
        sort.price = -1;
        break;

      case "title-atoz":
        sort.title = 1;
        break;

      case "title-ztoa":
        sort.title = -1;
        break;

      default:
        sort.price = 1;

        break;
    }

    const products = await Product.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllProductsSortedByWilsonScore = async (req, res) => {
  try {
    // Step 1: Get all products
    const products = await Product.find();
    if (!products) {
      console.log("Products not found");
    }

    // Step 2: Recalculate and update Wilson scores
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const { positiveReviews, totalReviews } = product;

        const score = calculateWilsonScore(positiveReviews, totalReviews);

        product.wilsonScore = score;

        await product.save(); // Save updated score

        return product;
      }),
    );

    // Step 3: Sort by Wilson score descending
    updatedProducts.sort((a, b) => b.wilsonScore - a.wilsonScore);

    res.status(200).json({
      success: true,
      data: updatedProducts,
    });
  } catch (error) {
    console.error("Error fetching and sorting by Wilson Score:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  getFilteredProducts,
  getProductDetails,
  getAllProductsSortedByWilsonScore,
};
