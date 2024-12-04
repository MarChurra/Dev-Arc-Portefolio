const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  // Parse incoming request body
  const { name, email, message } = JSON.parse(event.body);

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send the email using the transporter
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_HOST,
      subject: "Arc - Contact Request",
      text: message,
    });

    // Respond back with success message
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error in sending Email" }),
    };
  }
};
