import Reminder from "../models/Reminder.js";

export const getSummary = async (req, res) => {
  const reminders = await Reminder.find({ userId: req.user });

  const totalMonthly = reminders.reduce((sum, r) => sum + (r.amount || 0), 0);

  res.json({
    totalMonthly,
    upcoming: reminders.filter(r => new Date(r.dueDate) >= new Date())
  });
};
