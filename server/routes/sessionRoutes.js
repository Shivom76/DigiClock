const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");
const auth = require("../middleware/authMiddleware");

// Backend API Module (4.1): CRUD endpoints for stopwatch sessions & laps.
// `protect` runs first on every route here, so all of this is
// authenticated — no token, no access.
router.use(protect);

router.route("/").post(createSession).get(getSessions);

router
  .route("/:id")
  .get(getSessionById)
  .put(updateSession)
  .delete(deleteSession);

module.exports = router;
