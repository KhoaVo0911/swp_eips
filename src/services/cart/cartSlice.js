import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
//productModel bao gồm các thuộc tính từ Api trả về
//có thể dùng type hoặc interface ( interface có thể mở rộng cao hơn so với type)

const initialState = {
  arrCart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  //thêm dữ liệu content vào reducer
  reducers: {
    clearToCart: (state, action) => {
      state.arrCart = [];
    },
    addTocart: (state, action) => {
      const exist = state.arrCart.find((item) => item.id === action.payload.id);
      const objIndex = state.arrCart.findIndex(
        (obj) => obj.id == action.payload.id
      );

      if (exist) {
        if (exist.quantity && action.payload.quantity)
          exist.quantity += action.payload.quantity;
        console.log("ngu vc", action.payload, exist.quantity);
        state.arrCart[objIndex].quantity = exist.quantity;
      } else {
        state.arrCart.push(action.payload);
      }
    },
    delteteTocart: (state, action) => {
      state.arrCart = state.arrCart.filter(
        (item) => item.id != action.payload.id
      );
    },
    increaseQuantityTocart: (state, action) => {
      const exist = state.arrCart.find((item) => item.id === action.payload.id);
      const objIndex = state.arrCart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (exist) state.arrCart[objIndex].quantity = exist.quantity + 1;
    },
    decreaseQuantityTocart: (state, action) => {
      const exist = state.arrCart.find((item) => item.id === action.payload.id);
      const objIndex = state.arrCart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (exist) state.arrCart[objIndex].quantity = exist.quantity - 1;
    },
    changeQuantityTocart: (state, action) => {
      console.log(
        "ngu 1",
        Number.isNaN(action.payload.quantity),
        typeof action.payload.quantity
      );
      const exist = state.arrCart.find((item) => item.id === action.payload.id);
      const objIndex = state.arrCart.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (exist)
        state.arrCart[objIndex].quantity =
          Number.isNaN(action.payload.quantity) == false
            ? action.payload.quantity
            : 1;
    },
  },

  extraReducers(builder) {
    // cách 2 createAction
  },
});

export const cartAction = cartReducer.actions;

export default cartReducer.reducer;
