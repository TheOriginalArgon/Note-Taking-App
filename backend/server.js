// backend/server.js

const express = require("express");
const sqlite3 = require("sqlite3");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// SQLite database setup
// const db = new sqlite3.Database("notes.db");
// db.run(
//     "CREATE TABLE IF NOT EXISTS Notes (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, tags TEXT, archived BOOL)"
// );

// // Middleware to parse JSON.
// app.use(express.json());

// // Middleware to use cors.
// app.use(cors());

// // Allow the URL to access the server.
// let corsOptions = {
//     origin: ["http://localhost:3000"],
// };

// // API endpoint for getting notes
// app.get("/api/notes", cors(corsOptions), (req, res) => {
//     db.all("SELECT * FROM notes", (err, rows) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(rows);
//         }
//     });
// });

// // API endpoint for retrieving a specific note.
// app.get("/api/notes/:id", cors(corsOptions), (req, res) => {
//     db.get("SELECT * FROM notes WHERE id = ?", [noteId], (err, row) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             if (row) {
//                 // Note found!
//                 res.json(row);
//             } else {
//                 // Note not found :c
//                 res.status(404).json({ error: "Note not found" });
//             }
//         }
//     });
// });

// // API endpoint for creating a note
// app.post("/api/notes", cors(corsOptions), (req, res) => {
//     const { content, tags, archived } = req.body;
//     db.run(
//         "INSERT INTO notes (content, tags, archived) VALUES (?, ?, ?)",
//         [content, tags, archived],
//         function (err) {
//             if (err) {
//                 console.error(err);
//                 res.status(500).json({ error: "Internal Server Error" });
//             } else {
//                 res.json({
//                     id: this.lastID,
//                     content,
//                     tags,
//                     archived: archived ? 1 : 0,
//                 });
//             }
//         }
//     );
// });

// // API endpoint for updating a specific note.
// app.put("/api/notes/:id", cors(corsOptions), (req, res) => {
//     const noteId = req.params.id;
//     const { content, tags } = req.body;

//     db.get(
//         "UPDATE notes SET content = ?, tags = ? WHERE id = ? RETURNING *",
//         [content, tags, noteId],
//         function (err, row) {
//             if (err) {
//                 console.error(err);
//                 res.status(500).json({ error: "Internal Server Error" });
//             } else {
//                 console.log(this.changes);
//                 if (row) {
//                     // Note updated!
//                     res.json(row);
//                 } else {
//                     // Note not found.
//                     res.status(404).json({ error: "Note not found" });
//                 }
//             }
//         }
//     );
// });

// // API endpoint for deleting notes.
// app.delete("/api/notes/:id", cors(corsOptions), (req, res) => {
//     const noteId = req.params.id;

//     db.run("DELETE FROM notes WHERE id = ?", [noteId], function (err) {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             if (this.changes > 0) {
//                 // Successfully deleted the note.
//                 res.status(204).end(); // 204 No content.
//             } else {
//                 // Note not found with the specific ID.
//                 res.status(404).json({ error: "Note not found" });
//             }
//         }
//     });
// });

// Sync Sequelize models with the database.
sequelize.sync().then(() => {
    console.log("Database synced!");
});

// Middleware to parse JSON.
app.use(express.json());

// Use routes.
app.use("/", noteRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
