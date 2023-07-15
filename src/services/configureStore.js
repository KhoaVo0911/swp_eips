import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import loginReducer from './login/loginSlice';
import eventReducer from './event/eventSlice';
import shopReducer from './shop/shopSlice';
import productReducer from './product/productSlice';
import accountReducer from './account/accountSlice';
import cardReducer from './card/cardSlice';
import cartReducer from './cart/cartSlice';
export const store = configureStore ({
    reducer: {
        login: loginReducer,
        event: eventReducer,
        shop: shopReducer,
        product: productReducer,
        acc: accountReducer,
        card: cardReducer,
        cart: cartReducer
    }
})
export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
