import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [notes, setNotes] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [newNote, setNewNote] = useState({
        content: "",
        tags: "",
        archived: false,
    });
    const [editNote, setEditNote] = useState(null);
    const [editingNote, seteditingNote] = useState({
        content: "",
        tags: "",
        archived: false,
    });

    // Fetch notes from the backend.
    const fetchNotes = async () => {
        try {
            const response = await fetch("/api/notes");
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
        // fetchArchivedNotes();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleNoteChange = (event) => {
        const { name, value } = event.target;
        setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const handleNoteSubmit = () => {
        // Submit the new note to the backend
        fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return setNotes((prevNotes) => [...prevNotes, data]);
            })
            .catch((error) => console.error("Error creating note:", error));

        // Clear the input fields after submission
        setNewNote({ content: "", tags: "", archived: false });
    };

    const handleEdit = (note) => {
        setEditNote(note);
        seteditingNote({
            content: note.content,
            tags: note.tags,
            archived: note.archived,
        });
    };

    const handleNoteUpdate = () => {
        if (!editNote) {
            console.error("No note is being edited.");
            return;
        }
        // Update the note on the backend.
        fetch(`/api/notes/${editNote.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editingNote),
        })
            .then((response) => response.json())
            .then((updatedNote) => {
                // Update the note in the local state.
                setNotes((prevNotes) => {
                    if (!prevNotes || !Array.isArray(prevNotes)) {
                        console.error("Invalid state for notes:", prevNotes);
                        return [];
                    }
                    return prevNotes.map((note) => {
                        note.id === updatedNote.id &&
                            console.log({ updatedNote });
                        return note.id === updatedNote.id ? updatedNote : note;
                    });
                });

                // Clear the editing state.
                setEditNote(null);
                seteditingNote({ content: "", tags: "" });
            })
            .catch((error) => console.error("Error updating note:", error));
    };

    const handleArchive = (note) => {
        // Move the note to the archived list.
        const state = !note.archived;
        fetch(`/api/archive/${note.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ state: state }),
        })
            .then((response) => response.json())
            .then((updatedNote) => {
                updatedNote.archived = state;
            });
        fetchNotes();
    };

    const handleDelete = (noteId) => {
        // Delete the note on the backend.
        fetch(`/api/notes/${noteId}`, {
            method: "DELETE",
        })
            .then(() => {
                // Remove the note from the local state.
                setNotes((prevNotes) =>
                    prevNotes.filter((note) => note.id !== noteId)
                );
            })
            .catch((error) => console.error("Error deleting note:", error));
    };

    const handleHideNotes = () => {
        setShowArchived(!showArchived);
    };

    return (
        <div className="App">
            <div>
                <h1>Note Taking App</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Note content"
                        name="content"
                        value={newNote.content}
                        onChange={handleNoteChange}
                    />
                    <input
                        type="text"
                        placeholder="Tags"
                        name="tags"
                        value={newNote.tags}
                        onChange={handleNoteChange}
                    />
                    <button onClick={handleNoteSubmit}>Add Note</button>
                    {/* This part renders only if we are editing a note */}
                    {editNote && (
                        <div>
                            <input
                                type="text"
                                placeholder="Note content"
                                name="content"
                                value={editingNote.content}
                                onChange={(e) =>
                                    seteditingNote((prevNote) => ({
                                        ...prevNote,
                                        content: e.target.value,
                                    }))
                                }
                            />
                            <input
                                type="text"
                                placeholder="Tags"
                                name="tags"
                                value={editingNote.tags}
                                onChange={(e) =>
                                    seteditingNote((prevNote) => ({
                                        ...prevNote,
                                        tags: e.target.value,
                                    }))
                                }
                            />
                            <button onClick={handleNoteUpdate}>Update</button>
                        </div>
                    )}
                </div>
                <ul>
                    {notes.map((note) => {
                        if (!note.archived) {
                            return (
                                <li key={note.id}>
                                    {note.content} - Tags: {note.tags}
                                    <button onClick={() => handleEdit(note)}>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}>
                                        Delete
                                    </button>
                                    <button onClick={() => handleArchive(note)}>
                                        Archive
                                    </button>
                                </li>
                            );
                        }
                    })}
                </ul>
                <button onClick={handleHideNotes}>
                    {showArchived ? "Hide" : "Show"} Archived Notes
                </button>
                {showArchived && (
                    <div>
                        <ul>
                            {notes.map((note) => {
                                if (note.archived) {
                                    return (
                                        <li key={note.id}>
                                            {note.content} - Tags: {note.tags}
                                            <button
                                                onClick={() =>
                                                    handleArchive(note)
                                                }>
                                                Unarchive
                                            </button>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
