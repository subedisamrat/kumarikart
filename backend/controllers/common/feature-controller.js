import { Feature } from "../../models/Features.js";

//It's used for admin view
const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featuresImages = new Feature({ image });

    await featuresImages.save();

    res.status(201).json({
      success: true,
      data: featuresImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!!",
    });
  }
};

//It's used for client view
const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find();
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!!",
    });
  }
};
const deleteFeatureImages = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Feature.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: deletedImage, // This includes the _id
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export { addFeatureImage, getFeatureImages, deleteFeatureImages };
