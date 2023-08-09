const { validationResult, check } = require("express-validator");
const errorvalidationmiddleware = require("../../middlewares/Errorvalidationmiddleware");

exports.SignUpvalidateData = (req, res, next) => {
  const validationRules = [
    check("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3, max: 32 })
      .withMessage("Username should be between 3 and 32 characters long"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8, max: 40 })
      .withMessage("Invalid password should be between 8 and 40 character")
      .custom((value, { req }) => {
        if (value !== req.body.ConfirmPasswoed)
          throw new Error("Invalid confirm password");
        return true;
      }),

    check("ConfirmPasswoed")
      .notEmpty()
      .withMessage("confirm password is required"),
    check("phone")
      .isLength({ min: 1, max: 12 })
      .optional()
      // .matches(/^\d{12}$/)
      // .withMessage("Invalid phone number format")
      .matches(/^[0-9]+$/)
      .withMessage(
        "Invalid phone number format. Only numeric characters are allowed."
      ),
    check("firstname").notEmpty().withMessage("First name is required"),
    check("lastname").notEmpty().withMessage("Last name is required"),
    check("country").notEmpty().withMessage("Country is required"),
  ];

  errorvalidationmiddleware(req, res, validationRules, next);
};
exports.LoginvalidateData = (req, res, next) => {
  const validationRules = [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    check("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8, max: 40 })
      .withMessage("Invalid password should be between 8 and 40 character"),
  ];
  errorvalidationmiddleware(req, res, validationRules, next);
};
