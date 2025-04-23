import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected To DB ${conn.connection}`);
    } catch (error) {
        console.log("Error connecting to DB");
    }
}

export default connectToDB;