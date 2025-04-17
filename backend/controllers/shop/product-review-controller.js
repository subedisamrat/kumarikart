import { Order } from "../../models/Order.js";
import { Product } from "../../models/Product.js";
import { ProductReview } from "../../models/Review.js";

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "Products should be purchased first to review",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "Product has been review already!!",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewLength = reviews.length;
    const averageReview = reviews.reduce(
      (sum, reviewItm) => (sum + reviewItm.reviewValue, 0) / totalReviewLength,
    );

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(200).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addProductReview, getProductReviews };
