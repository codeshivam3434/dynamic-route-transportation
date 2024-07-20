const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to check if the user is authenticated
exports.authorized = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "You do not have access to this resource",
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
    };
};

// Specific middleware to verify admin role
exports.verifyAdmin = exports.authorized(['admin']);
