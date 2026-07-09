const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} = require("../controllers/sessionController");

//  FIX: Add explicit relative file extensions to force Node to break the case cache
const { protect } = require("./../middleware/authMiddleware.js");
const auth = require("./../middleware/authMiddleware.js");

// Backend API Module (4.1): CRUD endpoints for stopwatch sessions & laps.
router.use(protect);

router.route("/").post(createSession).get(getSessions);

router
  .route("/:id")
  .get(getSessionById)
  .put(updateSession)
  .delete(deleteSession);

module.exports = router;