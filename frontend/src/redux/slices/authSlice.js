import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios.js";

export const login = createAsyncThunk("auth/login", async (formData) => {
    const response = await axios.post("/auth/login", formData);
    return response.data;
});
export const signup = createAsyncThunk("auth/signup", async (formData) => {
    const response = await axios.post("/auth/signup", formData);
    return response.data;
});
export const logout = createAsyncThunk("auth/logout", async (formData) => {
    const response = await axios.post("/auth/logout", formData);
    return response.data;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
    const response = await axios.get("/auth/getProfile");
    return response.data;

})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
    },
    reducers: {
        // logout: (state) => {
        //     state.user=
        // }
    },
    extraReducers: (builder) => {
        builder
            //login user
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //signup user
            .addCase(signup.pending, (state) => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
    }
});


export default authSlice.reducer;