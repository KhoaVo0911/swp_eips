import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import GetCardApi, { Post50CardApi, PostCardApi, PostSearchCardApi, PutCardApi, PutDepositCardApi, PutWithdrawCardApi } from "../../api/CardApi";

const getUserfromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const initialState = {
    CardList: [],
    SearchCardList: {},
    Card: {}
};


const authSlice = createSlice({
    name: 'Card',
    initialState,
    reducers: {
        clearCard: (state, action) => {
            state.Card = {};
            state.SearchCardList = {};
            state.CardList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCardAsyncApi.pending, (state) => {
            })
            .addCase(getCardAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload.role)
                state.CardList = action.payload;
            })
            .addCase(getCardAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PostSearchCardAsyncApi.pending, (state) => {
            })
            .addCase(PostSearchCardAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
                state.SearchCardList = action.payload;
            })
            .addCase(PostSearchCardAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PostCardAsyncApi.pending, (state) => {
            })
            .addCase(PostCardAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PostCardAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PostCard50AsyncApi.pending, (state) => {
            })
            .addCase(PostCard50AsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PostCard50AsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PutCardAsyncApi.pending, (state) => {
            })
            .addCase(PutCardAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PutCardAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PutDepositAsyncApi.pending, (state) => {
            })
            .addCase(PutDepositAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PutDepositAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PutWithdrawAsyncApi.pending, (state) => {
            })
            .addCase(PutWithdrawAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PutWithdrawAsyncApi.rejected, (state, action) => {
            });
    },
});

export default authSlice.reducer;
export const CardAction = authSlice.actions

export const getCardAsyncApi = createAsyncThunk(
    'CardReducer/getAsyncApi',
    async (id) => {
        try {
            const response = await GetCardApi(id);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PostSearchCardAsyncApi = createAsyncThunk(
    'CardReducer/postSearchAsyncApi',
    async (search) => {
        try {
            const response = await PostSearchCardApi(search);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PostCardAsyncApi = createAsyncThunk(
    'CardReducer/postAsyncApi',
    async (body) => {
        try {
            const response = await PostCardApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PostCard50AsyncApi = createAsyncThunk(
    'CardReducer/post50AsyncApi',
    async (body) => {
        try {
            const response = await Post50CardApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PutCardAsyncApi = createAsyncThunk(
    'CardReducer/putAsyncApi',
    async (body) => {
        try {
            const response = await PutCardApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PutDepositAsyncApi = createAsyncThunk(
    'CardReducer/putDepositAsyncApi',
    async (body) => {
        try {
            const response = await PutDepositCardApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PutWithdrawAsyncApi = createAsyncThunk(
    'CardReducer/putWithdrawAsyncApi',
    async (body) => {
        try {
            const response = await PutWithdrawCardApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);

