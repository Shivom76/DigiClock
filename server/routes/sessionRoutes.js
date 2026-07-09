const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} = require("../controllers/sessionController");

// Backend API Module (4.1): CRUD endpoints for stopwatch sessions & laps.
router.route("/").post(createSession).get(getSessions);

router
  .route("/:id")
  .get(getSessionById)
  .put(updateSession)
  .delete(deleteSession);

module.exports = router;
