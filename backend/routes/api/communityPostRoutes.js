const express = require("express");

const CommunityPost = require("../models/CommunityPost");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


//Create Community Posts POST /api/posts

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, content, category } = req.body;

        const post = new CommunityPost({
            title,
            content,
            category,
            user: req.user.id
        });

        await post.save();

        res.status(201).json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Fetch all posts GET /api/posts

router.get("/", authMiddleware, async (req, res) => {

    try {

        const posts = await CommunityPost.find()
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Get Single Post // GET /api/posts/:id

router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const post = await CommunityPost.findById(
            req.params.id
        ).populate("user", "username email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Update Community Post PUT /api/posts/:id

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const post = await CommunityPost.findById(
            req.params.id
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (
            post.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedPost =
            await CommunityPost.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        res.status(200).json(updatedPost);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Delete Community Post DELETE /api/posts/:id

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const post = await CommunityPost.findById(
            req.params.id
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (
            post.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await CommunityPost.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;