const mongoose = require("mongoose");

const learningRequestSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Open", "In Progress", "Completed"],
        default: "Open"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

const LearningRequest = mongoose.model(
    "LearningRequest",
    learningRequestSchema
);

module.exports = LearningRequest;