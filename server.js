const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./backend/routes/api/authRoutes");
const skillRoutes = require("./backend/routes/api/skillRoutes");
const learningRequestRoutes = require("./backend/routes/api/learningRequestRoutes");
const communityPostRoutes = require("./backend/routes/api/communityPostRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

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