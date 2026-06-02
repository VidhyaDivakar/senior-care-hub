const express = require("express");

const LearningRequest = require("../../models/learnerRequest");
const authMiddleware = require("../../utils/auth");

const router = express.Router();



// Create Learning Requests POST /api/learning-requests

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, description, status } = req.body;

        const learningRequest = new LearningRequest({
            title,
            description,
            status,
            user: req.user.id
        });

        await learningRequest.save();

        res.status(201).json(learningRequest);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Fetch all my learning requests  /api/learning-requests

router.get("/", authMiddleware, async (req, res) => {

    try {

        const learningRequests = await LearningRequest.find({
            user: req.user.id
        });

        res.status(200).json(learningRequests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


//Fetch single learning request GET /api/learning-requests/:id

router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const learningRequest = await LearningRequest.findById(
            req.params.id
        );

        if (!learningRequest) {
            return res.status(404).json({
                message: "Learning request not found"
            });
        }

        if (
            learningRequest.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(learningRequest);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// Update learning request PUT /api/learning-requests/:id

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const learningRequest = await LearningRequest.findById(
            req.params.id
        );

        if (!learningRequest) {
            return res.status(404).json({
                message: "Learning request not found"
            });
        }

        if (
            learningRequest.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedLearningRequest =
            await LearningRequest.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        res.status(200).json(updatedLearningRequest);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Delete Learning Requests /api/learning-requests/:id

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const learningRequest = await LearningRequest.findById(
            req.params.id
        );

        if (!learningRequest) {
            return res.status(404).json({
                message: "Learning request not found"
            });
        }

        if (
            learningRequest.user.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await LearningRequest.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Learning request deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;