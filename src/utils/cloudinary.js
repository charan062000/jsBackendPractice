// same for all cloudinary setup in all projects

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEYE,
  api_secret: process.env.CLOUDINARY_API_SECRECT, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //uplaod the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has benn uploaded on cloudinary so we can remove from local file system
      console.log("File uploaded on cloudinary successfully", response.url);
      return response;
    // remove the file from local file system
  } catch (error) {
      fs.unlinkSync(localFilePath) // remove the file from local file system;
      console.log("Error while uploading file on cloudinary", error);
      return null; 
  }
};

// Upload an image
const uploadResult = await cloudinary.uploader
  .upload(
    "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    {
      public_id: "shoes",
    }
  )
  .catch((error) => {
    console.log(error);
  });
