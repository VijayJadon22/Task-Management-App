import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk("project/fetchProjects", async () => {
    const response = await axios.get("http://localhost:5000/project");
    return response.data;
});
export const createProject = createAsyncThunk("project/createProject", async (data) => {
    const response = await axios.post("http://localhost:5000/project", data);
    return response.data;
});
export const deleteProject = createAsyncThunk("project/deleteroject", async (projectId) => {
    const response = await axios.delete(`http://localhost:5000/project/${projectId}`);
    return response.data;
});




const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetchProjects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
                state.error = null;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //createProject
            .addCase(createProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload);
            })
            //deleteProject
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter((project) => project._id !== action.payload.id);

            })
    }
});


export default projectSlice.reducer;