import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("task/fetchTasks", async (projectId) => {
    const response = await axios.get(`http://localhost:5000/task/${projectId}`);
    return response.data;
});
export const createTask = createAsyncThunk("task/createTask", async ({ data, projectId }) => {
    const response = await axios.post(`http://localhost:5000/task/${projectId}`, data);
    return response.data;
});
export const updateTask = createAsyncThunk("task/updateTask", async ({ data, projectId, taskId }) => {
    const response = await axios.post(`http://localhost:5000/task/${projectId}/${taskId}`, data);
    return response.data;
});
export const deleteTask = createAsyncThunk("task/deleteTask", async ({ projectId, taskId }) => {
    await axios.post(`http://localhost:5000/task/${projectId}/${taskId}`);
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
                state.tasks = state.tasks.map((task) => {
                    task.id === action.payload._id ? action.payload : task;
                })
            })
            //delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload);
            })

    }
});


export default taskSlice.reducer;