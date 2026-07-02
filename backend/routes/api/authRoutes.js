const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("../../config/passport");

const User = require("../../models/user");
const authMiddleware = require("../../utils/auth");

const router = express.Router();

const signToken = (user) => jwt.sign(
    { user: { id: user._id, role: user.role } },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
);



// Sign Up // POST /api/auth/register

router.post("/register", (req, res, next) => {

    try {

        const { username, email, password, role } = req.body;

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
                    password,
                    role: role === 'provider' ? 'provider' : 'senior'
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
                if (!user || !user.password) {
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

                        res.status(200).json({
                            token: signToken(user)
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



// Google OAuth // GET /api/auth/google

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));

router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}), (req, res) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
});


// GitHub OAuth // GET /api/auth/github

router.get("/github", passport.authenticate("github", {
    scope: ["user:email"],
    session: false
}));

router.get("/github/callback", passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}), (req, res) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
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