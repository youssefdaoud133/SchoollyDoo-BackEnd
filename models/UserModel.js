const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "name required"],
      unique: [true, "must be unique"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    phone: {
      type: String,
    },
    profileIMG: String,
    password: {
      type: String,
      required: [true, "password required"],
    },
    role: {
      type: String,
      enum: ["manager", "leader", "teacher", "student", "parent"],
      default: "student",
    },
    gender: {
      type: String,
      enum: ["male", "female", "engineer", "engineer in cairo university"],
      default: "male",
    },
    educational_level: {
      type: String,
      enum: ["primary", "secondary", "preparatory"],
    },
    classroom: String,
    active: { type: Boolean, default: true },
    about: { type: String },
    firstname: String,
    lastname: String,
    country: String,
    exp: String,
    supject: String,
    street_address: String,
    city: String,
    state: String,
    birthday: {
      type: String,
      required: [true, "age required"],
    },
    postal_code: String,
    company: String,
  },
  { timestamps: true }
);

// pre middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
