const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: function () {
            return !this.googleId && !this.githubId;
        }
    },

    role: {
        type: String,
        enum: ['senior', 'provider', 'admin'],
        default: 'senior'
    },

    googleId: {
        type: String,
        default: null
    },

    githubId: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

userSchema.pre("save", async function () {

    if (!this.isModified("password") || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

const User = mongoose.model("User", userSchema);

module.exports = User;