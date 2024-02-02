import { Users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asynchandler} from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser= asynchandler( async(req,res)=>{
  //get data from frontend
  //validation-check if empty fields
  //check if user already exists-username,email
  //check for avatar,image
  //upload on cloudinary
  //create user object-create entry in db
  //remove password and refreshtoken from response
  //check for user creation
  //return response

  const {username,email,fullname,password}=req.body;
  console.log(email,username);
  //
//   if(username==="")
//   {
//     throw new ApiError(400,"all fields are compulsory");
//   }

if([username,email,fullname,password].some((fields)=>fields?.trim()===""))//check for empty fields
{
throw new ApiError(400,"All fields are compulsory");
}


//user exists
const existingUser=Users.findOne({

    $or:[{username},{email}]
}
)
if(existingUser){
    throw new ApiError(408,"Username or email already exists");
}
const avatarlocalPath=req.files?.avatar[0]?.path
const coverImagelocalPath=req.files?.coverImage[0]?.path
if(!avatarlocalPath){
    throw new ApiError(400,"Avatar is required");
}

const avatar=await uploadOnCloudinary(avatarlocalPath);
const coverImage=await uploadOnCloudinary(coverImagelocalPath);
if(!avatar)
{
    throw new ApiError(400,"Avatar is required");
}

const user=await Users.create(
    {
        fullname,
        username:username.toLowerCase(),
        coverImage:coverImage?.url||"",
        avatar:avatar.url,
        email,
        password
    }
)
     const createdUser=await Users.findById(user._id).select(
        "-password -refreshToken"
     )
     if(!createdUser)
     {
        throw new ApiError(500,"something went wrong while regisetring user")
     }
     return res.status(201).json(
        new ApiResponse(200,createdUser,"User has been created successfully")
     )

} )
















export {registerUser,}