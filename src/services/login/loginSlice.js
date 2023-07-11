import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginOwnerThunk } from "./loginThunk";

const getUserfromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null;
const initialState = {
    user: '',
    message:'',
    isLoading: false,
    isError: false,
    isSuccess: false,
};

export const LoginOwner = createAsyncThunk('/', LoginOwnerThunk);

const authSlice = createSlice ({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(LoginOwner.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(LoginOwner.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user = action.payload?.user;
            state.message = 'success';
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        })
        .addCase(LoginOwner.rejected, (state, action) => {
            state.message = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        });
    },
});

export default authSlice.reducer;