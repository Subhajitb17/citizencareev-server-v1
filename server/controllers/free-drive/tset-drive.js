const FreeDriveRequestModel = require("../../models/test-drive");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const {
  EMAIL_SERVICE_PROVIDER,
  EMAIL_ADMIN,
  EMAIL_PASS,
  ADMIN_EMAIL,
} = require("../../configs/config");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE_PROVIDER,
  auth: {
    user: EMAIL_ADMIN,
    pass: EMAIL_PASS,
  },
});

// Function to send email using EJS template
const sendEmail = async (templatePath, subject, recipient, data) => {
  const emailTemplate = await ejs.renderFile(templatePath, data);
  const mailOptions = {
    from: EMAIL_ADMIN,
    to: recipient,
    subject: subject,
    html: emailTemplate,
  };
  await transporter.sendMail(mailOptions);
};

module.exports.freeDriveRequest = async (req, res) => {
  try {
    const { name, address, pincode, date, message, email } = req.body;

    const newRequest = await FreeDriveRequestModel.create({
      name,
      address,
      pincode,
      date,
      message,
      email,
    });

    const data = {
      name,
      address,
      pincode,
      date,
      message,
      type: "Free Drive Request",
    };

    // Send email to admin
    await sendEmail(
      path.join(
        __dirname,
        "../../contact/templates/mail-template-free-drive-admin.ejs"
      ),
      "New Free Drive Request",
      ADMIN_EMAIL,
      data
    );

    // Send thank you email to customer
    await sendEmail(
      path.join(
        __dirname,
        "../../contact/templates/mail-template-free-drive-customer.ejs"
      ),
      "Thank You for Your Free Drive Request",
      email,
      data
    );

    // Return a success response
    return res.status(201).json({
      success: true,
      message: "Free Drive Request submitted successfully!",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error submitting free drive request form:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
