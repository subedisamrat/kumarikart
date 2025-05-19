import express from "express";
import searchProducts from "../../controllers/shop/search-controller.js";

const router = express.Router();

// router.get("/:keyword", searchProducts);
router.get("/", searchProducts);

export default router;
