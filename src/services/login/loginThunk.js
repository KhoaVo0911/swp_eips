
import axiosClient from "../../api/axiosClient";


export const LoginOwnerThunk = async ( thunkAPI) => {

    try {
        const res = await axiosClient.post(`/demo/api/v1/general/login`);
        console.log(res);
        // localStorage.setItem('accessToken', res.token);
        // localStorage.setItem('refeshToken', res.user.refreshToken);
        const userLocalStorage = {
            // username: res.user.username,
            // password: res.user.password,
        };
        
        if(res){
            localStorage.setItem('userInfo', JSON.stringify(res));
            window.location.replace('/')
        }
        return res;
    }
    catch (error) {
        console.log('login error thunk: ', error);
        const message = await error.data.message;
        return thunkAPI.rejectWithValue(message);
    }
};
