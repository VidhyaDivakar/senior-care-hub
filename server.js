const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("./backend/config/passport");
const connectDB = require("./backend/db/connectDB");

const authRoutes = require("./backend/routes/api/authRoutes");
const skillRoutes = require("./backend/routes/api/skillRoutes");
const learningRequestRoutes = require("./backend/routes/api/learningRequestRoutes");
const communityPostRoutes = require("./backend/routes/api/communityPostRoutes");
const profileRoutes = require("./backend/routes/api/profileRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://nexcorehub.onrender.com'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/learning-requests", learningRequestRoutes);
app.use("/api/posts", communityPostRoutes);
app.use("/api/profile", profileRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.json({
        message: "Senior Community Hub API Running"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});