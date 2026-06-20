const nodemailer = require('nodemailer');
console.log("EMAIL:", process.env.EMAIL);
console.log("HAS PASSWORD:", !!process.env.EMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;