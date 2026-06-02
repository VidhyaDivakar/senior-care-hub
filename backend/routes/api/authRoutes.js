const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const authMiddleware = require("../../utils/auth");

const router = express.Router();



// Sign Up // POST /api/auth/register

router.post("/register", (req, res, next) => {

    try {

        const { username, email, password } = req.body;

        User.findOne({ email })
            .then(existingUser => {
                if (existingUser) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }

                const user = new User({
                    username,
                    email,
                    password
                });

                // hashing password by pre-save hook
                user.save()
                    .then(() => {
                        res.status(201).json({
                            message: "User registered successfully"
                        });
                    })
                    .catch(error => {
                        next(error); // Pass the error to the next middleware
                    });
            })
            .catch(error => {
                next(error); // Pass the error to the next middleware
            });

    } catch (error) {

        next(error); // Pass the error to the next middleware

    }

});


// Sign In - // POST /api/auth/login

router.post("/login", (req, res, next) => {

    try {

        const { email, password } = req.body;

        User.findOne({ email })
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        message: "Invalid credentials"
                    });
                }

                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({
                                message: "Invalid credentials"
                            });
                        }

                        const payload = {
                            user: {
                                id: user._id
                            }
                        };

                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: "1h" },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({
                                    token
                                });
                            }
                        );
                    })
                    .catch(error => {
                        next(error); // Pass the error to the next middleware
                    });
            })
            .catch(error => {
                next(error); // Pass the error to the next middleware
            });

    } catch (error) {

        next(error); // Pass the error to the next middleware

    }

});



// Current User // GET /api/auth/me

router.get("/me", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;