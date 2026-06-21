const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactMail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("CONTACT REQUEST RECEIVED:", {
      name,
      email,
      subject,
    });

    const data = await resend.emails.send({
      from: "Rasheed Portfolio <onboarding@resend.dev>",
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
      `,
    });

    console.log("EMAIL SENT:", data);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("RESEND ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = { sendContactMail };