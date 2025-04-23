import bcrypt from "bcryptjs";
import User from "../models/user.schema.js";
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
        return res.status(201).json({ message: "User created successfully", user: { name: user.name, email: user.email, country: user.country } });
    } catch (error) {
        return res.status(500).send("Error creating user");
    }
}
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    } catch (error) {
        
    }
}