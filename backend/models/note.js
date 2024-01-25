const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define("Note", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.TEXT,
    },
    archived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Note;
