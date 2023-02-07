import jwt from "jsonwebtoken";
import config from "../utils/config.js"

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if(!token) return res.status(403).json({ message: "No token provided" });

        if(token.startsWith("Bearer ")) token.slice(7, token.length).trimLeft();

        const verified = jwt.verify(token, config.jwt_secret);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized!", error: err.message });
    };
};