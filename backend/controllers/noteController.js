const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.debugEndpoint = async (req, res) => {
    try {
        res.json({ a: "uwu" });
    } catch (err) {
        console.log("this is bad...");
    }
};

exports.getNoteById = async (req, res) => {
    const noteId = req.params.id;

    try {
        const note = await Note.findByPk(noteId);

        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createNote = async (req, res) => {
    const { content, tags, archived } = req.body;

    try {
        const newNote = await Note.create({
            content,
            tags,
            archived,
        });

        res.json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { content, tags } = req.body;

    try {
        const [rowsUpdated] = await Note.update(
            { content, tags },
            {
                where: { id: noteId },
            }
        );

        const note = await Note.findByPk(noteId);

        if (rowsUpdated > 0 && note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.setArchivedState = async (req, res) => {
    const noteId = req.params.id;
    const { state } = req.body;

    try {
        const [rowsUpdated] = await Note.update(
            { archived: state },
            {
                where: { id: noteId },
            }
        );

        const note = await Note.findByPk(noteId);

        if (rowsUpdated > 0 && note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const rowsDeleted = await Note.destroy({
            where: { id: noteId },
        });

        if (rowsDeleted > 0) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
