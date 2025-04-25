import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies["token"];
        if (!token) return res.status(403).json({ message: "Not Authenticated" });

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedData) return res.status(404).json({ message: "Token expired" });

        const user = await User.findById(decodedData.userId);
        req.user = { _id: user._id, name: user.name, email: user.email, country: user.country };
        next();
    } catch (error) {
        console.log("Error in authMiddleware", error.message);
        return res.status(400).json({ message: "Not Authenticated" });
    }
}