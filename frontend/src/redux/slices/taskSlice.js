import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios.js"

export const fetchTasks = createAsyncThunk("task/fetchTasks", async (projectId) => {
    const response = await axios.get(`/task/${projectId}`);
    return response.data;
});
export const createTask = createAsyncThunk("task/createTask", async ({ formData, projectId }) => {
    const response = await axios.post(`/task/${projectId}`, formData);
    return response.data;
});
export const updateTask = createAsyncThunk("task/updateTask", async ({ formData, projectId, taskId }) => {
    const response = await axios.put(`/task/${projectId}/${taskId}`, formData);
    console.log("response.data", response.data);
    return response.data;
});
export const deleteTask = createAsyncThunk("task/deleteTask", async ({ projectId, taskId }) => {
    await axios.delete(`/task/${projectId}/${taskId}`);
    return taskId;
});




const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetching tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //creating task
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload.task);
            })
            //update task
            .addCase(updateTask.fulfilled, (state, action) => {
                console.log("Updated Task:", action.payload); // Debug the payload
                state.tasks = state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                );
            })
            
            //delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            })            

    }
});


export default taskSlice.reducer;