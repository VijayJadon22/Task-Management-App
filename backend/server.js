import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectToDB from "./utils/connectToDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("Welcome hello");
});


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    connectToDB();
})