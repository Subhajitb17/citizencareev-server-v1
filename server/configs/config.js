require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const config = {
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  EMAIL_SERVICE_PROVIDER: process.env.EMAIL_SERVICE_PROVIDER,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN,
  EMAIL_PASS: process.env.EMAIL_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};

module.exports = config;
