const express = require("express");
const router = express.Router();

const passportJWT = require("../middlewares/passportJWT")();
const authController = require("../controllers/authController");
const {isEmail, hasPassword, hasName, hasContactNumber} = require("../validations/validators");

router.post("/login", authController.login);
router.post("/signup", [isEmail, hasPassword, hasName, hasContactNumber], authController.signup);
router.get("/me", passportJWT.authenticate(), authController.me);

module.exports = router;
