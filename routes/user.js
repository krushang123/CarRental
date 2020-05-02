const express = require("express");
const userController = require("../controllers/userController");
const {hasName, hasContactNumber} = require("../validations/validators");

const router = express.Router();
    

router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", hasName, hasContactNumber, userController.store);
router.patch("/:id", userController.update);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;