import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.COULDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadFileToCloudinary = async (localFilePath) => {
    try {
        // if no file path is there, return null
        if (!localFilePath) return null;

        // upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        // file has been uploaded successfully
        return response;
    }
    catch (e) {
        // remove the locally saved temp file, as opperation failed
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export { uploadFileToCloudinary };