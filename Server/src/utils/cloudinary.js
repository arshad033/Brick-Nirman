import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    console.log('localPath: ', localFilePath);
    //error due to dot env config
    // console.log('Cloudinary Config:', cloudinary.config());
    // console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    // console.log('API Key:', process.env.CLOUDINARY_API_KEY);
    // console.log('API Secret:', process.env.CLOUDINARY_API_SECRET);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // file has been uploaded successfull
    console.log('file is uploaded on cloudinary: ', response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
