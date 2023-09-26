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
    orprofileIMG: {
      type: String,
      default:
        "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    },
    profileIMG: {
      type: String,
      default:
        "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png",
    },
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
    classStages: {
      type: String,
      enum: [
        "First Year of Primary School",
        "Second Year of Primary School",
        "Third Year of Primary School",
        "Fourth Year of Primary School",
        "Fifth Year of Primary School",
        "Sixth Year of Primary School",
        "First Year of Preparatory School",
        "Second Year of Preparatory School",
        "Third Year of Preparatory School",
        "First Year of Secondary School",
        "Second Year of Secondary School",
        "Third Year of Secondary School",
      ],
    },
    sub_class: String,
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
