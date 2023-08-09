const { validationResult, check } = require("express-validator");
const errorvalidationmiddleware = require("../../middlewares/Errorvalidationmiddleware");

exports.CreatevalidateData = (req, res, next) => {
  const validationRules = [
    check("schoolname")
      .notEmpty()
      .withMessage("schoolname is required")
      .isLength({ min: 3, max: 32 })
      .withMessage("Username should be between 3 and 32 characters long"),

    check("phone")
      .isLength({ min: 1, max: 12 })
      .optional()
      // .matches(/^\d{12}$/)
      // .withMessage("Invalid phone number format")
      .matches(/^[0-9]+$/)
      .withMessage(
        "Invalid phone number format. Only numeric characters are allowed."
      ),
    check("about_school").notEmpty().withMessage("about is required"),
    check("schoolcountry").notEmpty().withMessage("Country is required"),
  ];

  errorvalidationmiddleware(req, res, validationRules, next);
};
exports.FindvalidateData = (req, res, next) => {
  const validationRules = [check("id").isMongoId().withMessage("Invalid id")];

  errorvalidationmiddleware(req, res, validationRules, next);
};
exports.DeletevalidateData = (req, res, next) => {
  const validationRules = [check("id").isMongoId().withMessage("Invalid id")];

  errorvalidationmiddleware(req, res, validationRules, next);
};

exports.updatevalidateData = (req, res, next) => {
  const validationRules = [
    check("id").isMongoId().withMessage("Invalid id"),
    check("username")
      .optional()
      .isLength({ min: 3, max: 32 })
      .withMessage("Username should be between 3 and 32 characters long"),
    check("email").optional().isEmail().withMessage("Invalid email address"),
    check("password")
      .optional()
      .isLength({ min: 8, max: 40 })
      .withMessage("Invalid password should be between 8 and 40 character"),
    check("phone")
      .isLength({ min: 1, max: 12 })
      .optional()
      // .matches(/^\d{12}$/)
      // .withMessage("Invalid phone number format")
      .matches(/^[0-9]+$/)
      .withMessage(
        "Invalid phone number format. Only numeric characters are allowed."
      ),
  ];

  errorvalidationmiddleware(req, res, validationRules, next);
};
