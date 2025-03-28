import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: process.env.CLOUDINARY_IMAGE_FOLDER,
        });
        // console.log("File is uploaded on cloudinary ", uploadResult);
        fs.unlinkSync(localFilePath);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
};

// const deleteFromCloudinary = async (publicId) => {
//     return new Promise((resolve, rejects) => {
//         cloudinary.uploader.destroy(publicId, (error, result) => {
//             if (error) return rejects(error);
//             return resolve(result);
//         });
//     });
// };

export { uploadOnCloudinary };
