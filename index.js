// Import framework and dependencies
const express = require("express");

// Import security packages
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const logger = require("./server/utils/logger");

// Import configs
const config = require("./server/configs/config");
require("./server/configs/db.config"); // This will automatically run connectDB

//import routes
const SliderImages = require("./server/routes/slider-images");
const SliderImages2 = require("./server/routes/slider-images-2");
const getInTouch = require("./server/routes/get-in-touch");
const freeDrive = require("./server/routes/test-drive");

// Initialize the application
const app = express();
app.use(express.json());

// Log requests
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}

// Sanitizes input data, prevents NoSQL injection
app.use(mongoSanitize());

// set security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Prevent XSS attacks
app.use(xss());

// prevents HTTP param pollution
app.use(hpp());

//routes
app.use("/api/v1/slider-images", SliderImages);
app.use("/api/v1/slider-images2", SliderImages2);
app.use("/api/v1/get-in-touch", getInTouch);
app.use("/api/v1/free-drive", freeDrive);

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

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
);

process.on("unhandledRejection", (err, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
