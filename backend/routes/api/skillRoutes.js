const express = require("express");

const Skill = require("../models/Skill");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



// Creating Skills // POST /api/skills

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, description, proficiencyLevel } = req.body;

        const skill = new Skill({
            title,
            description,
            proficiencyLevel,
            user: req.user.id
        });

        await skill.save();

        res.status(201).json(skill);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// Fetch all skills
// GET /api/skills

router.get("/", authMiddleware, async (req, res) => {

    try {

        const skills = await Skill.find({
            user: req.user.id
        });

        res.status(200).json(skills);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Fetch single Skill // GET /api/skills/:id

router.get("/:id", authMiddleware, async (req, res) => {

    try {

        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        if (skill.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(skill);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// Update Skill // PUT /api/skills/:id
// =========================
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        if (skill.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(updatedSkill);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Delete SKILL // DELETE /api/skills/:id
// =========================
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        if (skill.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Skill.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Skill deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;