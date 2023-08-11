const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const FindHelpInError = require("../utils/SomeUsefulFunction.js/HelpInError");
const { json } = require("express");
const ApiClassError = require("../utils/ApiClassError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// generate token
const GenerateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY);
};

class AuthHelper {
  constructor() {
    this.model = require(`../models/UserModel.js`);
  }

  SignUp = asyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.username);
    const newData = await this.model.create(req.body);
    const token = GenerateToken(newData._id);
    res.status(201).json({ newData, token });
  });
  myprofile = asyncHandler(async (req, res, next) => {
    res.status(201).json({ user: req.user });
  });

  Login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check email
    const data = await this.model.findOne({ email });
    console.log(data);
    if (!data) {
      return next(new ApiClassError("Email not found", 401));
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      return next(new ApiClassError("Invalid password", 401));
    }

    const token = GenerateToken(data._id);
    res.status(201).json({ data, token });
    next();
  });

  protect = asyncHandler(async (req, res, next) => {
    // check if token exist
    if (!req.headers.token)
      return next(new ApiClassError("must throw token", 401));
    let token = req.headers.token.split(" ")[1];
    //verify token
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);

    // verify if user exist
    const user = await this.model.findById(decode.userId);
    if (!user)
      return next(
        new ApiClassError("the user doesn't belong to this token", 401)
      );
    console.log(user);
    req.user = user;
    req.body.owner = user._id;
    next();
  });
}

module.exports = AuthHelper;
