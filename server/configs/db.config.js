const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.DATABASE_URI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

module.exports = connectDB;
