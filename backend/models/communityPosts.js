const mongoose = require("mongoose");

const communityPostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "Event",
            "Announcement",
            "Workshop",
            "Volunteer",
            "General"
        ],
        default: "General"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

const CommunityPost = mongoose.model(
    "CommunityPost",
    communityPostSchema
);

module.exports = CommunityPost;