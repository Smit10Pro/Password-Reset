import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  //Create transporter (robot who will send the email)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, //your email (robot's ID)
      pass: process.env.EMAIL_PASS, //robot's secret password (Google App password)
    },
  });

  //Mail details (where to send, subject, message)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  //Actually send the mail
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
