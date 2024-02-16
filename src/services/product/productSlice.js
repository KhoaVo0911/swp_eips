import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import GetProductApi, {
  GetListOrderByEventApi,
  GetListOrderByShopApi,
  GetListProductApi,
  GetListProductOfSaleApi,
  GetProductSoldApi,
  PostComboProductApi,
  PostOrderApi,
  PostProductApi,
  PostRevenueApi,
  PutProductApi,
} from "../../api/ProductApi";
import { GetAccountNotRelationApi } from "../../api/AccountApi";

const getUserfromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  ProductList: [],
  ProductListAll: [],
  ProductSold: [],
  ProductOfSale: [],
  OrderByEvent: [],
  OrderByShop: [],
  Product: {},
  Revenue: 0,
};

const authSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    clearProduct: (state, action) => {
      state.ProductList = [];
      state.ProductListAll = [];
      state.ProductSold = [];
      state.ProductOfSale = [];
      state.Product = {};
      state.Revenue = 0;
      state.OrderByEvent = [];
      state.OrderByShop = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductAsyncApi.pending, (state) => {})
      .addCase(getProductAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.ProductList = action.payload;
      })
      .addCase(getProductAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(getProductSoldAsyncApi.pending, (state) => {})
      .addCase(getProductSoldAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.ProductSold = action.payload;
      })
      .addCase(getProductSoldAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(GetListProductOfSaleAsyncApi.pending, (state) => {})
      .addCase(GetListProductOfSaleAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
        state.ProductOfSale = action.payload;
      })
      .addCase(GetListProductOfSaleAsyncApi.rejected, (state, action) => {});

    builder
      .addCase(PostComboProductAsyncApi.pending, (state) => {})
      .addCase(PostComboProductAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostComboProductAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostProductAsyncApi.pending, (state) => {})
      .addCase(PostProductAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PostProductAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PutProductAsyncApi.pending, (state) => {})
      .addCase(PutProductAsyncApi.fulfilled, (state, action) => {
        console.log("3", state, action.payload);
      })
      .addCase(PutProductAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostRevenueAsyncApi.pending, (state) => {})
      .addCase(PostRevenueAsyncApi.fulfilled, (state, action) => {
        state.Revenue = action.payload.total;
      })
      .addCase(PostRevenueAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(PostOrderAsyncApi.pending, (state) => {})
      .addCase(PostOrderAsyncApi.fulfilled, (state, action) => {})
      .addCase(PostOrderAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(getAllProductAsyncApi.pending, (state) => {})
      .addCase(getAllProductAsyncApi.fulfilled, (state, action) => {
        state.ProductListAll = action.payload;
      })
      .addCase(getAllProductAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(getOrderByEventAsyncApi.pending, (state) => {})
      .addCase(getOrderByEventAsyncApi.fulfilled, (state, action) => {
        state.OrderByEvent = action.payload;
      })
      .addCase(getOrderByEventAsyncApi.rejected, (state, action) => {});
    builder
      .addCase(getOrderByShopAsyncApi.pending, (state) => {})
      .addCase(getOrderByShopAsyncApi.fulfilled, (state, action) => {
        state.OrderByEvent = action.payload;
      })
      .addCase(getOrderByShopAsyncApi.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
export const ProductAction = authSlice.actions;

export const getProductAsyncApi = createAsyncThunk(
  "ProductReducer/getAsyncApi",
  async (id) => {
    try {
      const response = await GetProductApi(id);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);

export const getOrderByEventAsyncApi = createAsyncThunk(
  "ProductReducer/getOrderByEventAsyncApi",
  async (id) => {
    try {
      const response = await GetListOrderByEventApi(id);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);

export const getOrderByShopAsyncApi = createAsyncThunk(
  "ProductReducer/getOrderAsyncApi",
  async (id) => {
    try {
      const response = await GetListOrderByShopApi(id);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);

export const getAllProductAsyncApi = createAsyncThunk(
  "ProductReducer/getAllAsyncApi",
  async (body) => {
    try {
      const response = await GetListProductApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);

export const GetListProductOfSaleAsyncApi = createAsyncThunk(
  "ProductReducer/GetListProductOfSaleAsyncApi",
  async (id) => {
    try {
      const response = await GetListProductOfSaleApi(id);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const getProductSoldAsyncApi = createAsyncThunk(
  "ProductReducer/getSoldAsyncApi",
  async (body) => {
    try {
      const response = await GetProductSoldApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostProductAsyncApi = createAsyncThunk(
  "ProductReducer/postAsyncApi",
  async (body) => {
    try {
      const response = await PostProductApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostComboProductAsyncApi = createAsyncThunk(
  "ProductReducer/postComboProductAsyncApi",
  async (body) => {
    try {
      const response = await PostComboProductApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PutProductAsyncApi = createAsyncThunk(
  "ProductReducer/putProductAsyncApi",
  async (body) => {
    try {
      const response = await PutProductApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostRevenueAsyncApi = createAsyncThunk(
  "ProductReducer/postRevenueAsyncApi",
  async (body) => {
    try {
      const response = await PostRevenueApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
export const PostOrderAsyncApi = createAsyncThunk(
  "ProductReducer/postOrderAsyncApi",
  async (body) => {
    try {
      const response = await PostOrderApi(body);
      return response;
    } catch (error) {
      const json = error.response.data;
      const errors = json[""].errors;
      throw errors[0].errorMessage;
    }
  }
);
