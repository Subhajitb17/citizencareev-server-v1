const winston = require("winston");
const logConfiguration = require("../configs/log");

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
