const {check} = require("express-validator");

exports.hasModel = check("model")
    .isLength({min: 5})
    .withMessage("Car Model name is required. Min length 5 characters.");