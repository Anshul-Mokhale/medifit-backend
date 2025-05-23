const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // your email
        pass: process.env.GMAIL_PASS  // app password
    }
});

const sendThankYouEmail = async (toEmail, userName) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: toEmail,
        subject: 'Thank You for Contacting Us!',
        html: `
           <div
    style="max-width: 600px; margin: auto; background-color: #f7f5e8; padding: 30px; font-family: 'Poppins', Arial, sans-serif; border-radius: 12px; border: 1px solid #e0dccc; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">

    <!-- Header: Logo + Medifit Side-by-Side -->
    <div style="display: flex; align-items: center; margin-bottom: 30px;">
        <img src="https://res.cloudinary.com/dxaw17f4u/image/upload/v1745057617/medifit.png" alt="Medifit Logo" style="width: 50px; height: auto; margin-right: 12px;" />
        <h1 style="color: #503217; font-size: 24px; margin: 0;">Medifit</h1>
    </div>

    <!-- Greeting and Message -->
    <div style="color: #3a2a18; font-size: 16px; line-height: 1.7;">
        <p style="margin: 0 0 20px;">Hi <strong>${userName}</strong>,</p>

        <p style="margin: 0 0 20px;">
            Thank you for contacting <strong>Medifit</strong>! We've received your message and are excited to assist
            you.
        </p>

        <!-- Highlight Box -->
        <div
            style="background-color: #ffffff; padding: 20px; border-left: 5px solid #503217; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0; font-style: italic; color: #503217;">
                “Caring for your health is our mission. Thank you for trusting Medifit.”
            </p>
        </div>

        <p style="margin: 0 0 20px;">
            Our team will get back to you shortly. Meanwhile, if there's anything else you’d like to add, feel free to
            reply directly to this email.
        </p>
    </div>

    <!-- Footer / Signature -->
    <div style="margin-top: 40px; color: black; text-align: left;">
        <p style="margin: 0;">Warm regards,</p>
        <p style="margin: 4px 0 0;"><strong>Anshul Mokhale</strong><br />Medifit</p>
    </div>
</div>
        `
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendThankYouEmail };
