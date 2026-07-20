import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER!;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD!;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  throw new Error("Please define GMAIL_USER and GMAIL_APP_PASSWORD in .env.local");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
});

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  return transporter.sendMail({
    from: GMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text,
    attachments: options.attachments,
  });
}
