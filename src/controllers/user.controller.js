import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';



const generateAccessandRefreshToken = async(userId) => {
    try{
       const user = await User.findById(userId) 
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false})
    return { accessToken, refreshToken };
    }
    catch(error){
        throw new ApiError(500,"Token generation failed")
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

    console.log("email:", email);
    console.log("password:", password);

    // Validate required fields
    if ([fullname, email, username, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    // Ensure avatar file exists
    const avatarFile = req.files?.avatar?.[0]?.path;
    const coverImageFile = req.files?.coverImage?.[0]?.path;

    if (!avatarFile) {
        throw new ApiError(400, "Avatar is required");
    }
    console.log("Received files:", req.files);


    // Upload avatar
    const avatar = await uploadOnCloudinary(avatarFile);
    if (!avatar?.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Upload cover image (if provided)
    let coverImage = { url: "" }; // Default empty value
    if (coverImageFile) {
        coverImage = await uploadOnCloudinary(coverImageFile);
    }

    // Create user in DB
    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
    });

    // Retrieve user without sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(400, "User creation failed");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
});


const loginUser=asyncHandler(async(req,res)=>{

    //  res body --->  data
    // username or email
    // find the user
    // check password
    // access token and refresh token
    //send cookie

    const {email,username,password}=req.body

    if(!email && !username){
        throw new ApiError(400,"email or username is required")
    }

    const user=await User.findOne({$or:[{email},{username}]})

    if(!user){
        throw new ApiError(400,"user not found")
    }


    const isPasswordValid=await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400,"password is incorrect")
    }

    // const accessToken=user.generateAccessToken()
    // const refreshToken=user.generateRefreshToken()

    const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true,
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,
        
        {
        user:loggedInUser,accessToken,refreshToken
        },
        "User logged in successfully"))

         


})



const logoutUser=asyncHandler(async(req,res)=>{

        

})

export { registerUser, };
