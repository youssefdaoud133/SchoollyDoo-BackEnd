const { validationResult, check } = require("express-validator");

const errorvalidationmiddleware = (req, res, validationRules, next) => {
  Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.status(400).json({ errors: errors.array() });
    }
  });
};

module.exports = errorvalidationmiddleware;
