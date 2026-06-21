const transporter = require('../services/mailService');

const sendContactMail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

      const info = await transporter.sendMail({
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

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error("EMAIL ERROR:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message'
        });
    }
};

module.exports = { sendContactMail };