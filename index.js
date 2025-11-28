require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');  //  <-- require format me import ✔

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// 🟢 RESEND INITIALIZE
const resend = new Resend(process.env.RESEND_KEY);   // ENV se key read hogi

// ------------------------------------------------------
// 🔥 CONTACT MAIL API (FINAL – USING RESEND)
// ------------------------------------------------------
app.post('/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  console.log("===== New Contact Form Received =====");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Service:", service);
  console.log("Message:", message);

  try {
    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // FROM — Resend default domain
      to: process.env.GMAIL_RECEIVER_EMAIL,      // Mail receiver (tumhara email)
      reply_to: email,                           // Reply click → user ko reply jayega
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    return res.status(200).json({ success: true, message: "Message sent successfully!", id: data.id });

  } catch (err) {
    console.error("ERROR (Resend):", err);
    return res.status(500).json({ success: false, message: "Failed to send email", error: err });
  }
});

// ------------------------------------------------------
// SERVER RUN
// ------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // 587 = STARTTLS
//   auth: {
//     user: process.env.GMAIL_EMAIL,
//     pass: process.env.GMAIL_APP_PASS
//   }
// });


// app.post('/contact', async (req, res) => {
//   const { name, email, phone, service, message } = req.body;

//   console.log("Received contact form data:");
//   console.log("Name:", name);
//   console.log("Email:", email);
//   console.log("Phone:", phone);
//   console.log("Service:", service);
//   console.log("Message:", message);

//   const mailOptions = {
//     from: process.env.GMAIL_EMAIL,
//     to: process.env.GMAIL_RECEIVER_EMAIL, // where you want to receive messages
//     subject: `New Contact Form Submission from ${name}`,
//     html: `
//       <h3>New Contact Request</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
//       <p><strong>Service:</strong> ${service || 'N/A'}</p>
//       <p><strong>Message:</strong><br>${message}</p>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ success: true, message: "Message sent successfully!" });
//   } catch (err) {
//     console.error("Error sending email:", err);
//     return res.status(500).json({ success: false, message: "Failed to send message.", error: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const sgMail = require('@sendgrid/mail');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// // Set SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Contact form endpoint
// app.post('/contact', async (req, res) => {
//   const { name, email, phone, service, message } = req.body;

//   console.log("Received contact form data:", req.body);

//   const msg = {
//     to: process.env.SENDGRID_TO_EMAIL, // your receiving email
//     from: process.env.SENDGRID_FROM_EMAIL, // verified sender
//     subject: `New Contact Form Submission from ${name}`,
//     html: `
//       <h3>New Contact Request</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
//       <p><strong>Service:</strong> ${service || 'N/A'}</p>
//       <p><strong>Message:</strong><br>${message}</p>
//     `,
//   };

//   try {
//     await sgMail.send(msg);
//     return res.status(200).json({ success: true, message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({ success: false, message: "Failed to send message.", error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





