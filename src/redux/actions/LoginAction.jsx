import axios from "axios";
import { Login } from "../constants";
import { baseURL } from "../../Interceptor/Interceptor";

const ngrok = "https://6da5-2405-201-e059-b805-e5d0-6c8c-c766-33be.ngrok-free.app";
console.log(ngrok);
export const LoginAction = (payload) => async (dispatch) => {
    dispatch({
        type: Login.LOADING,
        payload: { loading: true },
    });

    try {

        const {data} = await axios.post(`${ngrok}/api/v1/login`, payload);


        localStorage.setItem("TOKEN", data && data.data.token);
        // console.log(data, "res");
        await dispatch({
            type: Login.SUCCESS,
            payload: { loading: false, data: data },
        });
        // window.location.href = "/";
        
    } catch (err) {
        await dispatch({
            type: Login.ERROR,
            payload: { loading: false, data: {} },
        });
    }
};
