import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js"
import projectReducer from "./slices/projectSlice.js";
import taskReducer from "./slices/taskSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        task: taskReducer
    }
})