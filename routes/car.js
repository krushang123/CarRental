const express = require("express");
const carController = require("../controllers/carController");
const router = express.Router();
    

router.get("/", carController.index);

module.exports = router;