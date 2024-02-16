import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import GetAccountApi, {
  GetAccountNotRelationApi,
  GetShopAccountApi,
  PostAccountApi,
  PostAccountForSaleApi,
  PostShopAccountApi,
  PutAccountApi,
  postShopAccountSetApi,
} from "../../api/AccountApi";

const getUserfromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  AccountList: [],
  AccountShopList: [],
  AccountNotRelation: [],
  Account: {},
};

const authSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    clearAccount: (state, action) => {
      state.Account = {};
      state.AccountList = [];
      state.AccountNotRelation = [];
      state.AccountShopList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountAsyncApi.pending, (state) => {})
      .addCase(getAccountAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.AccountList = action.payload;
      })
      .addCase(getAccountAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(getShopAccountAsyncApi.pending, (state) => {})
      .addCase(getShopAccountAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.AccountShopList = action.payload;
      })
      .addCase(getShopAccountAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostAccountAsyncApi.pending, (state) => {})
      .addCase(PostAccountAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostAccountAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostShopAccountAsyncApi.pending, (state) => {})
      .addCase(PostShopAccountAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostShopAccountAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostAccountForSaleAsyncApi.pending, (state) => {})
      .addCase(PostAccountForSaleAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostAccountForSaleAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostShopAccountSetAsyncApi.pending, (state) => {})
      .addCase(PostShopAccountSetAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostShopAccountSetAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PutAccountAsyncApi.pending, (state) => {})
      .addCase(PutAccountAsyncApi.fulfilled, (state, action) => {})
      .addCase(PutAccountAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(GetAccountNotRelationAsyncApi.pending, (state) => {})
      .addCase(GetAccountNotRelationAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.AccountNotRelation = action.payload;
      })
      .addCase(GetAccountNotRelationAsyncApi.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
export const accountAction = authSlice.actions;

export const getAccountAsyncApi = createAsyncThunk(
  "AccountReducer/getAsyncApi",
  async () => {
    try {
      const response = await GetAccountApi();
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const getShopAccountAsyncApi = createAsyncThunk(
  "AccountReducer/getShopAccountAsyncApi",
  async () => {
    try {
      const response = await GetShopAccountApi();
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostAccountAsyncApi = createAsyncThunk(
  "AccountReducer/postAsyncApi",
  async (body) => {
    try {
      const response = await PostAccountApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostAccountForSaleAsyncApi = createAsyncThunk(
  "AccountReducer/postAccountForSaleAsyncApi",
  async (body) => {
    try {
      const response = await PostAccountForSaleApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostShopAccountAsyncApi = createAsyncThunk(
  "AccountReducer/postShopAccountAsyncApi",
  async (body) => {
    try {
      const response = await PostShopAccountApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostShopAccountSetAsyncApi = createAsyncThunk(
  "AccountReducer/postShopAccountSetAsyncApi",
  async (body) => {
    try {
      const response = await postShopAccountSetApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const GetAccountNotRelationAsyncApi = createAsyncThunk(
  "AccountReducer/getAccountNotRelatinAsyncApi",
  async () => {
    try {
      const response = await GetAccountNotRelationApi();
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PutAccountAsyncApi = createAsyncThunk(
  "AccountReducer/putAsyncApi",
  async (body) => {
    try {
      const response = await PutAccountApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
