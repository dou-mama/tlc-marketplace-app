const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // console.log("SENDING");
    // 1) Create transporter (from nodemailer)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    // 2) Define the email options
    const mailOptions = {
        from: 'Mamadou Diallo <hello@mamadou.io',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;