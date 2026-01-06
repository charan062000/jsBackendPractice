import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend /postman
  // validation of user details
  // check if user already exists: email/username
  // check for images ,check for avatar
  // upload them to cloudinary
  // create user object - create entry in DB
  // remove password and refresh token field from response
  // check for user creation
  // return response or error

  const { fullName, email, username, password } = req.body;
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new apiError(400, "all fields are required");
  }
  const existedUser = user.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new apiError(409, "user already exists with this email/username");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new apiError(400, "avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new apiError(400, "avatar file id required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.towerCase(),
    password,
  });
  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createUser) {
    throw new apiError(500, "unable to create user , please try again later");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "user registered successfully"));
});
