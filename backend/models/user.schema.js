import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
