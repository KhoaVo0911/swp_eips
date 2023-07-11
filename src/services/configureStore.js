import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/loginSlice';

export const store = configureStore ({
    reducer: {
        login: loginReducer,
    }
})