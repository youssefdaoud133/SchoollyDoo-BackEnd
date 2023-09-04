const express = require("express");
const router = express.Router();
const Auth = require("../services/AuthClass");
const AuthUsers = new Auth();
const { getuploadedprofilepicture } = require("../services/getawsservices");

const {
  SignUpvalidateData,
  LoginvalidateData,
} = require("../utils/validations/ValidationsAuth");
//
router
  .route("/signup")
  .post(SignUpvalidateData, AuthUsers.SignUp.bind(AuthUsers));
router.route("/login").post(LoginvalidateData, AuthUsers.Login.bind(AuthUsers));
router.route("/addstudents").post(AuthUsers.addstudents.bind(AuthUsers));
router
  .route("/myprofile")
  .get(
    AuthUsers.protect.bind(AuthUsers),
    getuploadedprofilepicture,
    AuthUsers.myprofile.bind(AuthUsers)
  );

module.exports = router;
