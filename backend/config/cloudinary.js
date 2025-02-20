import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "samrat-subedi",
  api_key: "755697744736669",
  api_secret: "EWa_G5OUgbqLKPjjHO9bgnKHUJA",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
