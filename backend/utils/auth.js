const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                message: "No token, authorization denied"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded.user;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Token is not valid"
        });

    }

};

module.exports = authMiddleware;