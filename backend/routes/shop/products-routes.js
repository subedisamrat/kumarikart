import express from "express";
import {
  getAllProductsSortedByWilsonScore,
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js";

const router = express.Router();

router.get("/getproducts", getFilteredProducts);
router.get("/all-products", getFilteredProducts);
router.get("/getproducts/:id", getProductDetails);
router.get("/sort", getAllProductsSortedByWilsonScore);

export default router;
