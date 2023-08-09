const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "message required"],
    },

    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "owner required"],
    },

    to: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    direction: {
      type: String,
    },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    to_manager: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const School = mongoose.model("Notification", NotificationSchema);

module.exports = School;
