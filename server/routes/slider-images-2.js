const express = require("express");
const router = express.Router();

const {
  addSlider,
  getImages,
  updateImageById,
  deleteImageById,
} = require("../controllers/slider/slider-images-2");

router.post("/", addSlider);
router.get("/", getImages);
router.put("/:id", updateImageById);
router.delete("/:id", deleteImageById);

module.exports = router;
