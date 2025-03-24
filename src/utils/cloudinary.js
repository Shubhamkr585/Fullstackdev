import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: proccess.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
})



const uploadOnCloudinary=async(localFilePath)=>{
    try{//check for the existence of the file
        if(!localFilePath){
            return
        }
        // upload the file on cloudinary
       const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto',
        })
      //file upload successfully
      console.log('file uploaded successfully on cloudinary',response.url)
      return response
    }
    catch(error){
        fs.unlinkSync(localFilePath)// remove the locally saved temp file as the upload failed
        return null
    }
    }

    export default uploadOnCloudinary