import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectToDB from "./utils/connectToDB.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import projectRoutes from "./routes/project.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/project", projectRoutes);


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    connectToDB();
})