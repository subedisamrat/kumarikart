import { imageUploadUtil } from "../../config/cloudinary.js";
import { Product } from "../../models/Product.js";

const handleImageUpload = async (req, res) => {
  try {
    //converting into base-64

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    //For image url

    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "An error occured!",
    });
  }
};

//add new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
      salePrice,
    } = req.body;

    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !totalStock
    ) {
      return res.status(400).json({
        success: false,
      });
    }

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
      salePrice,
    });
    await newlyCreatedProduct.save();
    res.status(200).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

//fetch product

const fetchProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

//edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
      salePrice,
    } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  fetchProduct,
  editProduct,
  deleteProduct,
};
