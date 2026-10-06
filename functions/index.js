const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const transporter = nodemailer.createTransport({
  host: "mail5019.site4now.net",
  port: 587,
  secure: false,
  auth: {
    user: "eventi@mena-gategroup.com",
    pass: "Eventi@2026",
  },
});

exports.sendEmail = onRequest({ cors: true }, (req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    // Support both application/json and application/x-www-form-urlencoded
    const body = req.body || {};
    
    // Check for honeypot
    if (body._honey) {
      // Spam detected, pretend success
      if (body._next) {
        res.redirect(302, body._next);
      } else {
        res.status(200).json({ success: true, message: "Message received" });
      }
      return;
    }

    // Build the email content dynamically based on submitted fields
    let textContent = "New message from website:\n\n";
    let htmlContent = "<h3>New message from website</h3><table border='1' cellpadding='5' cellspacing='0'>";
    
    // Iterate through all fields except ones starting with _
    for (const [key, value] of Object.entries(body)) {
      if (!key.startsWith("_") && key !== "submit") {
        textContent += `${key}: ${value}\n`;
        htmlContent += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
      }
    }
    htmlContent += "</table>";

    const subject = body._subject || "New Message from Website";

    const mailOptions = {
      from: '"EVENTI for Conferences" <eventi@mena-gategroup.com>',
      to: "info@orlandoblacklinetransportation.com",
      subject: subject,
      text: textContent,
      html: htmlContent,
      replyTo: body.Email || body.email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error("Error sending email", error);
        res.status(500).send("Error sending email. Please try again later.");
      } else {
        logger.info("Email sent: " + info.response);
        if (body._next) {
          res.redirect(302, body._next);
        } else {
          res.status(200).json({ success: true, message: "Email sent" });
        }
      }
    });
  });
});
