require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const config = {
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
};

module.exports = config;
