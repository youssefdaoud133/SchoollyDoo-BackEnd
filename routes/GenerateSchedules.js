const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Crud = require("../services/CrudClass");
const Auth = require("../services/AuthClass");
const make = require("../utils/MakeSch");

const CrudForApply = new Crud("ApplyModel");

const AuthUsers = new Auth();

router.route("/").post(
  asyncHandler(async (req, res, next) => {
    const databytes = await make(req.body);
    // Set the content type to image/jpeg (or the appropriate format)
    // Set the response headers
    res.setHeader("Content-Type", "image/JPEG");
    res.setHeader("Content-Length", databytes.length);

    // Send the buffer as the response
    res.end(databytes);
  })
);

module.exports = router;
