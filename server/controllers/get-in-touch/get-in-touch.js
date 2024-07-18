const GetInTouchModel = require("../../models/get-in-touch");
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

module.exports.getInTouch = async (req, res) => {
  try {
    const { name, address, pincode, date, message, email } = req.body;

    // Create a new contact document
    const newContact = await GetInTouchModel.create({
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
      type: "Get in touch",
    };

    // Send email to admin
    await sendEmail(
      path.join(
        __dirname,
        "../../contact/templates/mail-template-get-in-touch-admin.ejs"
      ),
      "Get in touch Request",
      ADMIN_EMAIL,
      data
    );

    // Send thank you email to customer
    await sendEmail(
      path.join(
        __dirname,
        "../../contact/templates/mail-template-get-in-touch-customer.ejs"
      ),
      "Thank You for Your Request",
      email,
      data
    );

    // Return a success response
    return res.status(201).json({
      success: true,
      message: "Get in touch form request submitted successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error("Error submitting request form:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
