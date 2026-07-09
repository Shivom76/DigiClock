const Session = require("../models/Session");

// CRUD Algorithm (4.2): Express routes process Create, Read, Update, and
// Delete requests, while Mongoose interacts with MongoDB.

// CREATE — save a finished stopwatch session
exports.createSession = async (req, res, next) => {
  try {
    const { duration, laps, notes } = req.body;

    if (duration === undefined || duration === null) {
      return res.status(400).json({ message: "duration is required" });
    }

    const session = await Session.create({
      duration,
      laps: laps || [],
      notes: notes || ""
    });

    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

// READ — list all sessions, most recent first
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find().sort({ recordedAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

// READ — get a single session by id
exports.getSessionById = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

// UPDATE — e.g. edit notes on a saved session
exports.updateSession = async (req, res, next) => {
  try {
    const { notes, duration, laps } = req.body;

    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: { notes, duration, laps } },
      { new: true, runValidators: true, omitUndefined: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

// DELETE — remove a session
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ message: "Session deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};
