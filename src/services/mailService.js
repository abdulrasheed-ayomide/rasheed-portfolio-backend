const nodemailer = require('nodemailer');

console.log("EMAIL:", process.env.EMAIL);
console.log("HAS PASSWORD:", !!process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((err, success) => {
    if (err) {
        console.log("VERIFY ERROR:", err);
    } else {
        console.log("SMTP READY");
    }
});

module.exports = transporter;