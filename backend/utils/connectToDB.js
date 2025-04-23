import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected To Database: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to DB", error);
    }
}

export default connectToDB;