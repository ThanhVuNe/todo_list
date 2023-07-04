const mongoose = require('mongoose');

const User = require("./user");
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: "No description",
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    userId: {
        type: mongoose.Types.ObjectId,
    }
});

module.exports = mongoose.model("Todo", todoSchema);
