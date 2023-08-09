const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    schoolname: {
      type: String,
      trim: true,
      required: [true, "schoolname required"],
      unique: [true, "must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "phone required"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "owner required"],
    },
    schoolIMG: String,
    numofclassrooms: Number,
    active: { type: Boolean, default: false },
    about_school: { type: String },
    type_of_school: String,
    school_offers: String,
    schoolcountry: String,
    street_address_school: String,
    city_school: String,
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);

module.exports = School;
