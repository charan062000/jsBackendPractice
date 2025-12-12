import mongoose, { Schema } from "mongoose";
import mongooseAgregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // will come from cloudinary
      required: true,
    },
    views: {
      type: Number, //cloudinary url
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);
videoSchema.plugin(mongooseAgregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
