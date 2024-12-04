const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

//Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    //Send the Email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_HOST,
      subject: "Arc- Contact Request",
      text: message,
    });

    res.status(200).json({ message: "Email sent sucessfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error in sending Email" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
