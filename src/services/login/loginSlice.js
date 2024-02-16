import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from "../../api/LoginApi";
import { useNavigate } from "react-router-dom";

const getUserfromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncApi.pending, (state) => {})
      .addCase(loginAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload.role);
        state.user = action.payload;
      })
      .addCase(loginAsyncApi.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;

export const loginAsyncApi = createAsyncThunk(
  "loginReducer/loginAsyncApi",
  async (user) => {
    try {
      const response = await loginApi(user.username, user.password);

      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
