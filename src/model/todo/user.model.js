import mongoose from "mongoose";

const userSchema = new mongoose.schemma(
  {
    email: {
      type: String,
      requried: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      requried: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      requried: true,
      
    },
  },
  {
    timestamps: true,
  }
);

export const User= mongoose.model("User",userSchema)