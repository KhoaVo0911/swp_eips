import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import GetEventApi, { GetEventByIdApi, GetEventByShopApi, GetEventImgListApi, PostEventApi, PostImgEventApi, PutEventApi } from "../../api/EventApi";

const getUserfromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const initialState = {
    eventList: [],
    eventListImg: [],
    event: {},
    eventByShop: {},
    eventById: {}
};


const authSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        clearEvent: (state, action) => {
            state.eventList = [];
            state.eventListImg = [];
            state.event = {};
            state.eventByShop = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEventAsyncApi.pending, (state) => {
            })
            .addCase(getEventAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload.role)
                state.eventList = action.payload;
            })
            .addCase(getEventAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(getEventImgListAsyncApi.pending, (state) => {
            })
            .addCase(getEventImgListAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload.role)
                state.eventListImg = action.payload;
            })
            .addCase(getEventImgListAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PostEventAsyncApi.pending, (state) => {
            })
            .addCase(PostEventAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PostEventAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PostImgEventAsyncApi.pending, (state) => {
            })
            .addCase(PostImgEventAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PostImgEventAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(PutEventAsyncApi.pending, (state) => {
            })
            .addCase(PutEventAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload)
            })
            .addCase(PutEventAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(getEventByShopAsyncApi.pending, (state) => {
            })
            .addCase(getEventByShopAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload.role)
                state.eventByShop = action.payload;
            })
            .addCase(getEventByShopAsyncApi.rejected, (state, action) => {
            });
        builder
            .addCase(getEventByIdAsyncApi.pending, (state) => {
            })
            .addCase(getEventByIdAsyncApi.fulfilled, (state, action) => {
                console.log("3", state, action.payload.role)
                state.eventById = action.payload;
            })
            .addCase(getEventByIdAsyncApi.rejected, (state, action) => {
            });
    },
});

export default authSlice.reducer;
export const EventAction = authSlice.actions

export const getEventAsyncApi = createAsyncThunk(
    'eventReducer/getAsyncApi',
    async () => {
        try {
            const response = await GetEventApi();
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const getEventByShopAsyncApi = createAsyncThunk(
    'eventReducer/getByEventIdAsyncApi',
    async (id) => {
        try {
            const response = await GetEventByShopApi(id);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const getEventByIdAsyncApi = createAsyncThunk(
    'eventReducer/getByEventByIdAsyncApi',
    async (id) => {
        try {
            const response = await GetEventByIdApi(id);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const getEventImgListAsyncApi = createAsyncThunk(
    'eventReducer/getEventImgListAsyncApi',
    async (id) => {
        try {
            const response = await GetEventImgListApi(id);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PostEventAsyncApi = createAsyncThunk(
    'eventReducer/postAsyncApi',
    async (body) => {
        try {
            const response = await PostEventApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PostImgEventAsyncApi = createAsyncThunk(
    'eventReducer/postImgAsyncApi',
    async (body) => {
        try {
            const response = await PostImgEventApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);
export const PutEventAsyncApi = createAsyncThunk(
    'eventReducer/putAsyncApi',
    async (body) => {
        try {
            const response = await PutEventApi(body);
            return response;
        } catch (error) {
            const json = error.response.data;
            const errors = json[""].errors;
            throw errors[0].errorMessage;
        }
    }
);

