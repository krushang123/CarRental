const express = require("express");
const carController = require("../controllers/carController");
const {
    hasModel, 
    hasRentPerDay, 
    hasCity, 
    hasSeatingCapacity, 
    hasVehicleNumber } = require("../validations/validators");

const router = express.Router();
    

router.get("/", carController.index);
router.get("/:id", carController.show);
router.post("/",[ hasModel, hasCity, hasRentPerDay, hasSeatingCapacity, hasVehicleNumber], carController.store);
router.patch("/:id", carController.update);
router.put("/:id", carController.update);
router.delete("/:id", carController.delete);

module.exports = router;