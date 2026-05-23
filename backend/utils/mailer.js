const nodemailer = require("nodemailer");

// Create transporter based on environment
const createTransporter = () => {
  // If using SendGrid
  if (process.env.MAIL_HOST === 'smtp.sendgrid.net') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.MAIL_PASS,
      },
    });
  }
  
  // Default Gmail/SMTP configuration
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
};

const transporter = createTransporter();

const sendOtp = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: "Your ExpatCares Verification Code",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;border-radius:12px;background:#f9f9f9;">
          <h2 style="color:#0457B4;">ExpatCares Email Verification</h2>
          <p>Use the code below to verify your email. It expires in <strong>10 minutes</strong>.</p>
          <div style="font-size:36px;font-weight:700;letter-spacing:12px;color:#0457B4;margin:24px 0;">${otp}</div>
          <p style="color:#888;font-size:12px;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
    console.log("📧 Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("📧 Email sending failed:", error.message);
    throw error;
  }
};

module.exports = { sendOtp };
