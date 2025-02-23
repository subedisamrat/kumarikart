import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js";

const router = express.Router();

router.get("/getproducts", getFilteredProducts);
router.get("/getproducts/:id", getProductDetails);

export default router;
