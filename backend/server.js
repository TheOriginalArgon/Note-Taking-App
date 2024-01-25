// backend/server.js

const express = require("express");
const sqlite3 = require("sqlite3");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

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
