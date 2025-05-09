const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendPINEmail = async (pin) => {
  return transporter.sendMail({
    from: `"SuperAdmin" <${process.env.GMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Tu PIN para acceder al SUPERADMIN',
    text: `Tu PIN es: ${pin}`,
  });
};

module.exports = { sendPINEmail };
