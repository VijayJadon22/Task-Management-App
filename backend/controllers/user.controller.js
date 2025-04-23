import bcrypt from "bcryptjs";
import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export const handleSignup = async (req, res) => {
    try {
        const { name, email, password, country } = req.body;
        if (!email || !name || !password) return res.status(400).json({ message: "All fields are required" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            country
        });
        await user.save();

        await generateTokenAndSetCookie(user, res);
        return res.status(201).json({ message: "User created successfully", user: { name: user.name, email: user.email, country: user.country } });
    } catch (error) {
        return res.status(500).send("Error creating user");
    }
}
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(404).json({ message: "Inavlid Credentials" });

        await generateTokenAndSetCookie(user, res);
        return res.status(200).json({ message: "Login successfull", user: { name: user.name, email: user.email, country: user.country } });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in user try again later" });
    }
}

export const handleLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
