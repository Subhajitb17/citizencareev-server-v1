// Import framework and dependencies
const express = require("express");

// Import security packages
const logger = require("./server/utils/logger");

// Import configs
const config = require("./server/configs/config");
require("./server/configs/db.config"); // This will automatically run connectDB

// Initialize the application
const app = express();
app.use(express.json());

// Log requests
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

app.get("/", (request, response) => {
  response.status(200).send("CitizenCareEV Server!");
});

// Custom 404 page
app.use(function (req, res) {
  res.type("application/json");
  res.status(404);
  res.send({ success: false, message: "404 Route Not Found", data: null });
});

// Custom server error
app.use(function (err, req, res, next) {
  res.type("application/json");
  res.status(500);
  res.json({ success: false, message: "500 Server Error", data: err.stack });
  next(err);
});

const PORT = config.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
