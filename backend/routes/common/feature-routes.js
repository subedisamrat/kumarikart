import express from "express";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImages,
} from "../../controllers/common/feature-controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeatureImages);

export default router;
