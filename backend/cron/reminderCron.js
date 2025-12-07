import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

cron.schedule("0 8 * * *", async () => {
  console.log("Running reminder cron...");

  const today = new Date();
  const next3 = new Date(today);
  next3.setDate(today.getDate() + 3);

  const reminders = await Reminder.find({
    dueDate: { $gte: today, $lte: next3 },
    isCompleted: false
  }).populate("userId");

  reminders.forEach(async (r) => {
    await transporter.sendMail({
      to: r.userId.email,
      subject: `Reminder: ${r.title}`,
      text: `Your reminder is due on ${r.dueDate.toDateString()}`
    });
  });
});
