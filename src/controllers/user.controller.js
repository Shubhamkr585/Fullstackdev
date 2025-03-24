import {asyncHandler} from '../utils/asyncHandler.js'

import {ApiError} from '../utils/ApiError.js'

import {User} from '../models/user.model.js'

import uploadOnCloudinary from '../utils/cloudinary.js'

import ApiResponse from '../utils/ApiResponse.js'
const registerUser = asyncHandler(async(req,res)=>{

// res.status(200).json({
//     message:"dream11 khelo"
// })


//get user details from frontend
//validation - not empty
//check if user already exists:username,email
//check for images,check for avatar
// create user object- create entry in the db
//remove password and refresh token field from response
//check for user creation 
// return response

const {fullname,email,username,password}=req.body
console.log("email",email);
console.log("password",password);


if([fullname,email,username,password].some((field)=>field?.trim() === "")){
    throw new ApiError(400,"All fields are required")
}

const existingUser=await User.findOne({
    $or:[{email} , {username}]
})

if(existingUser){
    throw new ApiError(400,"User already exists")
}

const avatarlocalFilePath=req.files?.avatar[0]?.path
const coverImageLocalFilePath=req.files?.coverImage[0]?.path;

if(!avatarlocalFilePath){
    throw new ApiError(400,"Avatar is required")
}

const avatar=await uploadOnCloudinary(avatarlocalFilePath)
const coverImage=await uploadOnCloudinary(coverImageLocalFilePath)


if(!avatar ){
    throw new ApiError(400,"File upload failed")
}


const user=await User.create({
    fullname,
    email,
    username:username.toLowerCase(),
    password,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
})


const craetedUser=await User.findById(user._id).select("-password -refreshToken")

if(!craetedUser){
    throw new ApiError(400,"User creation failed")
}


return res.status(201).json(new ApiResponse(200,craetedUser,"User created successfully",craetedUser))

})


export {registerUser}