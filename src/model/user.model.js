import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrpyt from "bcryptjs";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercse: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercse: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      requried: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timeStamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // checls if password is changed or not
  this.password = bcrpyt.hash(this.password, 10); // hashing the password with salt 10
  next(); // calling next middleware
});
userSchema.methods.isPasswordCorrecct = async function (password) {
  return await bcrpyt.compare(password, this.password);
}; // comparing original password and hashed password same or not ,retyrns true or false.

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullname: this.fullname,
      email: this.email,
    },
    process.env.ACCESS_tOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};// generating access token
userSchema.methods.generaterefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
}; // generating refresh token
export const User = mongoose.model("User", userSchema);
