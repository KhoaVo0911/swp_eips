import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import GetShopApi, {
  GetListOrderApi,
  GetShopByUsernameApi,
  PostShopApi,
  PutShopApi,
} from "../../api/ShopApi";

const getUserfromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  shopList: [],
  Shop: {},
  shopByUsername: {},
  OrerList: [],
};

const authSlice = createSlice({
  name: "Shop",
  initialState,
  reducers: {
    clearShop: (state, action) => {
      state.shopList = [];
      state.Shop = {};
      state.shopByUsername = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopAsyncApi.pending, (state) => {})
      .addCase(getShopAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.shopList = action.payload;
      })
      .addCase(getShopAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostShopAsyncApi.pending, (state) => {})
      .addCase(PostShopAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostShopAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PutShopAsyncApi.pending, (state) => {})
      .addCase(PutShopAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PutShopAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(getShopByUsernameAsyncApi.pending, (state) => {})
      .addCase(getShopByUsernameAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.shopByUsername = action.payload;
      })
      .addCase(getShopByUsernameAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(GetListOrderAsyncApi.pending, (state) => {})
      .addCase(GetListOrderAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.OrerList = action.payload;
      })
      .addCase(GetListOrderAsyncApi.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
export const ShopAction = authSlice.actions;

export const getShopAsyncApi = createAsyncThunk(
  "ShopReducer/getAsyncApi",
  async (id) => {
    try {
      const response = await GetShopApi(id);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const getShopByUsernameAsyncApi = createAsyncThunk(
  "ShopReducer/getByUsernameAsyncApi",
  async (id) => {
    try {
      const response = await GetShopByUsernameApi(id);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostShopAsyncApi = createAsyncThunk(
  "ShopReducer/postAsyncApi",
  async (body) => {
    try {
      const response = await PostShopApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PutShopAsyncApi = createAsyncThunk(
  "ShopReducer/putAsyncApi",
  async (body) => {
    try {
      const response = await PutShopApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const GetListOrderAsyncApi = createAsyncThunk(
  "ShopReducer/getListOrderAsyncApi",
  async (body) => {
    try {
      const response = await GetListOrderApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
