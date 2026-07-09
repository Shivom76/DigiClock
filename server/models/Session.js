const mongoose = require("mongoose");

// A single lap recorded during a stopwatch run.
const LapSchema = new mongoose.Schema(
  {
    lapNumber: { type: Number, required: true },
    lapTime: { type: Number, required: true }, // milliseconds elapsed at the lap
    splitTime: { type: Number, required: true } // milliseconds since the previous lap
  },
  { _id: false }
);

// Sessions collection, as described in section 4.3 Database Design:
// Session ID (Mongo's own _id), Duration, Lap Times, Notes, Date & Time.
const SessionSchema = new mongoose.Schema(
  {
    user: {
      // Ties each session to the authenticated user who saved it, so the
      // API can scope reads/writes to req.user (see sessionController.js).
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    duration: {
      type: Number, // total elapsed time in milliseconds
      required: true,
      min: 0
    },
    laps: {
      type: [LapSchema],
      default: []
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model("Session", SessionSchema);
