const express = require("express");
const router = express.Router();
const getInTouchRequestController = require("../controllers/get-in-touch/get-in-touch");

router.post("/", getInTouchRequestController.getInTouch);

module.exports = router;
