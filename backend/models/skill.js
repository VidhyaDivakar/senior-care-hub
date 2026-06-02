const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    Category: {
        type: String,
        required: true
    },

     Description: {
        type: String,
        required: true
    },

    proficiencyLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;