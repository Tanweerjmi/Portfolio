import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parse HTML form data
app.use(express.static(__dirname)); // Serve HTML, CSS, JS from same folder

// Default route (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Contact page route
app.get("/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Route for sending emails
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mdtanweeralam634@gmail.com", // Your Gmail address
    pass: "xorv zfqk xdci pivz"        // Your App Password from Google
  }
});

const mailOptions = {
  from: "mdtanweeralam634@gmail.com", // MUST be your Gmail
  to: "mdtanweeralam634@gmail.com",   // Recipient (your inbox)
  subject: `New message from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  replyTo: email                       // So you can reply to the visitor
};


  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.json({ success: false });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
