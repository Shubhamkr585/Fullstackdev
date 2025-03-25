import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// ✅ Correct Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// ✅ Function to Upload File to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("❌ File path is missing!");
            return null;
        }

        console.log("🚀 Uploading file to Cloudinary:", localFilePath);

        // Upload the file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        console.log("✅ File uploaded successfully on Cloudinary:", response.url);

        // Delete local file after upload
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("❌ Cloudinary Upload Error:", error);
        
        // Remove local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export default uploadOnCloudinary;
