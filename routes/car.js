const express = require("express");
const carController = require("../controllers/carController");
const {hasModel} = require("../validations/validators");
const router = express.Router();
    

router.get("/", carController.index);
router.post("/", hasModel, carController.store);

module.exports = router;