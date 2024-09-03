import nodemailer from "nodemailer";

const emailManager = async (to, subject, html, text) => {
  try {
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c562d498f053ef",
        pass: "93d62d05820e6b",
      },
    });

    await transport.sendMail({
      to: to,
      from: "info@gmail.com",
      subject: subject,
      html: html,
      text: text,
    });

    return true; // Indicate success
  } catch (error) {
    console.error("Error sending email:", error); // Log the error
    return false; // Indicate failure
  }
};

export default emailManager;
