const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    post_text: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      required: [true, "role required"],
    },

    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "owner required"],
    },
    school: {
      type: String,
      required: [true, "school required"],
    },
    photos: [
      {
        type: String,
      },
    ],
    PhotosUrl: [
      {
        type: String,
      },
    ],

    likes: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
