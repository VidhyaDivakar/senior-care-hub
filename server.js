const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./backend/db/connectDB");

const authRoutes = require("./backend/routes/api/authRoutes");
const skillRoutes = require("./backend/routes/api/skillRoutes");
const learningRequestRoutes = require("./backend/routes/api/learningRequestRoutes");
const communityPostRoutes = require("./backend/routes/api/communityPostRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/learning-requests", learningRequestRoutes);
app.use("/api/posts", communityPostRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.json({
        message: "Senior Community Hub API Running"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});