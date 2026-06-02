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
        next(error); // Pass the error to the next middleware
    }

};

module.exports = authMiddleware;