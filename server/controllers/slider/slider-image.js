const SliderModel = require("../../models/slider");
const mongoose = require("mongoose");

/**
 * This controller adds a SLider Image to the DB
 * @access    private
 * @url       POST api/v1/sliders **MAY BE CHANGE
 */
module.exports.addSlider = async (request, response) => {
  try {
    const { name, rank, imageLink, link } = request.body;

    // Create a new slider image using the provided data
    const sliderImage = await SliderModel.create({
      name,
      rank,
      imageLink,
      link,
    });

    // Check if the slider image creation was successful
    if (!sliderImage) {
      return response.status(500).json({
        success: false,
        message: "Failed to create new slider image!",
        date: null,
      });
    }

    // Return a success response with the created slider image data
    return response.status(201).json({
      success: true,
      message: "Slider image created successfully!",
      data: sliderImage,
    });
  } catch (error) {
    console.error("Error creating slider image:", error);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * This controller gets an array of slider images
 * @access    private
 * @url       GET api/v1/sliders
 */
module.exports.getImages = async (request, response) => {
  try {
    // Fetch slider images that are not marked as deleted
    const sliderImages = await SliderModel.find({ isDeleted: false })
      .lean() // Convert results to plain JavaScript objects for efficiency
      .sort({ rank: 1 }); // Sort images by rank in ascending order

    // Check if any images were found
    if (!sliderImages) {
      return response.status(404).json({
        success: false,
        message: "Failed to fetch Carousel images!",
        data: null,
      });
    }

    // Return a success response with the fetched slider images
    return response.status(200).json({
      success: true,
      message: "Carousel images fetched successfully!",
      data: sliderImages,
    });
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * This controller update a slider images
 * @access    private
 * @url       PUT api/v1/sliders/:id
 */
module.exports.updateImageById = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, rank, imageLink, link } = request.body;

    // Find the slider image by ID
    const sliderImage = await SliderModel.findById(id);

    // Check if the image was found
    if (!sliderImage) {
      return response.status(404).json({
        success: false,
        message: "Slider image not found!",
        data: null,
      });
    }

    // Update the fields with the new data
    if (name !== undefined) sliderImage.name = name;
    if (rank !== undefined) sliderImage.rank = rank;
    if (imageLink !== undefined) sliderImage.imageLink = imageLink;
    if (link !== undefined) sliderImage.link = link;

    // Save the updated document
    await sliderImage.save();

    // Return a success response with the updated slider image
    return response.status(200).json({
      success: true,
      message: "Slider image updated successfully!",
      data: sliderImage,
    });
  } catch (error) {
    console.error("Error updating slider image:", error);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * This controller delete a slider images
 * @access    private
 * @url       PUT api/v1/sliders/:id
 */
module.exports.deleteImageById = async (request, response) => {
  try {
    const { id } = request.params;

    // Find the slider image by ID and mark it as deleted
    const deletedImage = await SliderModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    // Check if the image was found and marked as deleted
    if (!deletedImage) {
      return response.status(404).json({
        success: false,
        message: "Slider image not found!",
        data: null,
      });
    }

    // Return a success response with the deleted (marked as deleted) slider image
    return response.status(200).json({
      success: true,
      message: "Slider image deleted successfully!",
      data: deletedImage,
    });
  } catch (error) {
    console.error("Error deleting slider image:", error);
    return response.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
