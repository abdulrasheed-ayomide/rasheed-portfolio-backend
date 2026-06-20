const transporter = require('../services/mailService');

const sendContactMail = async (req, res) => {
    console.log("CONTACT REQUEST RECEIVED");
  console.log(req.body);
    try {
        const { name, email, subject, message } = req.body;
        console.log("About to send email");

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Portfolio Contact</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `
        });
        console.log("Email sent successfully");

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error(error.message);
        console.error("EMAIL ERROR:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message'
        });
    }
};

module.exports = { sendContactMail };