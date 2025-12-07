import mongoose from "mongoose";

const NotifyLogSchema = new mongoose.Schema({
  reminderId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  sentAt: { type: Date, default: Date.now },
  channel: String
});

export default mongoose.model("NotifyLog", NotifyLogSchema);
