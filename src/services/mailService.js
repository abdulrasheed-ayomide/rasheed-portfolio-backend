const nodemailer = require("nodemailer");
console.log("EMAIL:", process.env.EMAIL);
console.log("HAS PASSWORD:", !!process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("VERIFY ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

module.exports = transporter;