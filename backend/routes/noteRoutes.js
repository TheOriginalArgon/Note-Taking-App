const express = require("express");
const noteController = require("../controllers/noteController");
// const cors = require("cors");

const router = express.Router();

// router.use(cors({ origin: ["http://localhost:3000"] }));

router.get("/api/notes", noteController.getNotes);
router.get("/api/notes/:id", noteController.getNoteById);
router.post("/api/notes", noteController.createNote);
router.put("/api/notes/:id", noteController.updateNote);
router.put("/api/archive/:id", noteController.setArchivedState);
router.delete("/api/notes/:id", noteController.deleteNote);

router.get("/api/debug", noteController.debugEndpoint);

module.exports = router;
