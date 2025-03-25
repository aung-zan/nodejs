require("dotenv").config();
const nodeMailer = require("nodemailer");

const HOST = process.env.MAIL_HOST;
const AUTH = {
  user: process.env.MAIL_USERNAME,
  pass: process.env.MAIL_PASSWORD
};

const SENDER = {
  address: process.env.SENDER_ADDRESS,
  name: process.env.SENDER_NAME
};

// const mailTrapTransport = MailtrapTransport({
//   token: TOKEN,
// });

const transport = nodeMailer.createTransport({
  // mailTrapTransport
  host: HOST,
  port: 2525,
  auth: AUTH
});

const sendMail = (to, subject, text, html) => {
  const mailOptions = {
    from: SENDER,
    subject: subject,
    category: "Integration Test",
    sandbox: true
  };

  let toAddresses = [];

  if (Array.isArray(to)) {
    toAddresses = to;
  } else {
    toAddresses.push(to);
  }

  mailOptions.to = toAddresses;

  if (text) {
    mailOptions.text = text;
  }

  if (html) {
    console.log("html");
    mailOptions.html = html;
  }

  try {
    transport.sendMail({
      from: SENDER,
      to: toAddresses,
      subject: subject,
      text: text,
      category: "Integration Test",
      sandbox: true
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail };