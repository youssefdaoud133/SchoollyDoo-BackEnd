const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema(
  {
    schoolname: {
      type: String,
      trim: true,
      required: [true, "schoolname required"],
    },
    active: { type: Boolean, default: false },

    slug: {
      type: String,
      lowercase: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "owner required"],
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "to required"],
    },
    school: {
      type: mongoose.Types.ObjectId,
      ref: "School",
      required: [true, "school required"],
    },
    as: String,

    decision: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Apply = mongoose.model("Apply", ApplySchema);

module.exports = Apply;
