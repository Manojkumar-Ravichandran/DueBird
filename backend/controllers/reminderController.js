import Reminder from "../models/Reminder.js";

export const createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({ ...req.body, userId: req.user });
    res.json(reminder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getReminders = async (req, res) => {
  const reminders = await Reminder.find({ userId: req.user }).sort({ dueDate: 1 });
  res.json(reminders);
};

export const updateReminder = async (req, res) => {
  const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(reminder);
};

export const deleteReminder = async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
