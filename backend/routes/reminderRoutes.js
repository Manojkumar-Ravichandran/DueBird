import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { createReminder, getReminders, updateReminder, deleteReminder } from "../controllers/reminderController.js";

const router = express.Router();

router.post("/", auth, createReminder);
router.get("/", auth, getReminders);
router.put("/:id", auth, updateReminder);
router.delete("/:id", auth, deleteReminder);

export default router;
