const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  phone: {
    type: String,
    default: ""
  },

  dob: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  bio: {
    type: String,
    default: ""
  }

}, {
  timestamps: true
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
