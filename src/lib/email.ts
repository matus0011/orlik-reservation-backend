import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, text: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "Kod weryfikacyjny do logowania",
    text,
  });
}
