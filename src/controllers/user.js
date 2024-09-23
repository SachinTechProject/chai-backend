import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { APiResponse } from '../utils/ApiResponse.js'
const registerUser = asyncHandler( async (req,res) => {
   // get user details from frontend 
  // validation - not empty
  // check if user alerdy exists: username, email
  // check for images, check for avatar
  // upload then to cloudery,avatar
  // create user object - create entry in db
  // remove password and refersh token field from response
  // check fro user cration 
  // return res

  
  
  const {fullName,email,username,password} = req.body
  console.log("email",email);
    // if(fullName === ""){
    //     throw new ApiError(400,"fullname is required")
    // }
    if(
        [ fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
       throw new ApiError(400,"All fields are required")
    }

   const existerUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existerUser){
        throw ApiError(409, "User with email or username already exists")
    }
  
   const avatarLocalPath =  req.files?.avatar[0]?.path
   const coverImagelocalPath =  req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
       throw new ApiError(400,"Avater files is required")
   }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage =  await uploadOnCloudinary(coverImagelocalPath)

  if(!avatar){
    throw new ApiError(400,"Avater files is required")
  }

  const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createUser){
    throw new ApiError(500, "Something went wrong while registring the user");
}
 
return res.status(201).json(
    new APiResponse(200, createUser, " User registered Successfully")
)

} )

export {registerUser} 