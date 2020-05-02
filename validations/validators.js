const {check} = require("express-validator");

exports.hasModel = check("model")
    .isLength({min: 1})
    .withMessage("Car Model name is required.");

exports.hasVehicleNumber = check("vehicleNumber")
    .isLength({min: 10})
    .withMessage("Vehicle Number is required.");

exports.hasCity = check("city")
    .isLength({min: 1})
    .withMessage("City name is required.");

exports.hasSeatingCapacity = check("seatingCapacity")
    .isInt({min: 1})
    .withMessage("Car seating capacity is required");

exports.hasRentPerDay = check("rentPerDay")
    .isCurrency({symbol: "Rs",require_symbol: false})
    .withMessage("Car rent per day is required");

exports.hasName = check("name")
    .isLength({min: 3})
    .withMessage("Name is required. Min length 3 characters.");    


exports.hasContactNumber = check("contactNumber")
    .isMobilePhone()
    .withMessage("Valid Contact number is required.");