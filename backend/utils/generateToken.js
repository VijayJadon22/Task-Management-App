import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = async (user, res) => {
    try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600000
        });
    } catch (error) {
        console.log("Error setting cookie: generateTokenAndSetCookie");
        throw new error;
    }
}