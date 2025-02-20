import express from "express";
import {
  handleImageUpload,
  addProduct,
  fetchProduct,
  deleteProduct,
  editProduct,
} from "../../controllers/admin/products-controller.js";
import { upload } from "../../config/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.get("/getproducts", fetchProduct);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
export default router;
