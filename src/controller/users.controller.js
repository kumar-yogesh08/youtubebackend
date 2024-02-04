import { Users } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asynchandler} from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const generateAccessTokenAndRefreshToken=async(userId)=>{
try {
    const User=await Users.findById(userId);
    console.log(User);
    const accessToken=User.generateAccessToken();
    console.log("access token h bhai",accessToken);
    const refreshToken=User.generateRefreshToken();
    console.log("refesh token h bhai",refreshToken);

    console.log(User);
    User.refreshToken=refreshToken;
    await User.save({validateBeforeSave:false})//validation is set to false because each time user instance is saved back to data base without it all fields are required 
 return {accessToken,refreshToken}
} 
catch (error) {
throw new ApiError(500,"Somgjething went wrong while generating refresh token");    
}
  
}


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
  console.log(password,fullname);
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
const existingUser=await Users.findOne({

    $or:[{username},{email}]
}
)
if(existingUser){
    throw new ApiError(408,"Username or email alreadyyy exists");
}
console.log(req.files);
const avatarlocalPath=req.files?.avatar[0]?.path

console.log(avatarlocalPath);
let coverImagelocalPath;
if(req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0)
{
    coverImagelocalPath=req.files.coverImage[0].path;
}
// const coverImagelocalPath=req.files?.coverImage[0]?.path;
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

//get data from->req.body
//check if data is stored in username or email
//check if username or email already exists
//check for password
//access and refresh token generate
//send cookie


const loginUser=asynchandler(async(req,res)=>{
// console.log(req.body)
const {username,email,password}=req.body
console.log(email)
if(!username&&!email)
{
    throw new ApiError(400,"email or username is required");
}
const User=await Users.findOne({
    $or:[{username},{email}]
})
if(!User){
throw new ApiError(404,"User doesn't exist");
}
const validPassword=await User.isPasswordCorrect(password);
if(!validPassword){
    throw new ApiError(402,"Invalid password");
}

  const{accessToken,refreshToken}=await generateAccessTokenAndRefreshToken(User._id);
  const loggedInUser=await Users.findById(User._id).select("-password -refreshToken")
  const options={
    httpOnly:true,
    secure:true
  }
  res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(200,{
          User:accessToken ,refreshToken,loggedInUser 
    },"User logged in succefully")
  )

})

const logoutUser=asynchandler(async(req,res)=>{

await Users.findByIdAndUpdate(req.User._id,{$set:{refreshToken:undefined}},{new:true})
const options={
    httpOnly:true,
    secure:true
  }
return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
.json(new ApiResponse(200,{},"User logged out successfully"))






})


export {registerUser,loginUser,logoutUser}