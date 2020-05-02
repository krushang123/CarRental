const express = require("express");
const bookingController = require("../controllers/bookingController");
const {
    hasValidIssueDate, 
    hasValidReturnDate,
    hasCar,
    hasUser
} = require("../validations/validators");

const router = express.Router();
    

router.get("/", bookingController.index);
router.get("/:id", bookingController.show);
router.post("/",[hasValidIssueDate, hasValidReturnDate, hasCar, hasUser], bookingController.store);

module.exports = router;