const express = require("express");
const router = express.Router();
const freeDriveRequestController = require("../controllers/free-drive/tset-drive");

router.post("/", freeDriveRequestController.freeDriveRequest);

module.exports = router;
