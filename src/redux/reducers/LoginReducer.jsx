import { Login } from "../constants";

let initialvalue = {
    LoginModel: [],
};

export const LoginReducer = (value = initialvalue, action) => {
    console.log(action,"");
    switch (action?.type) {
        case Login.REQUEST:
            return { value: action?.payload };
        case Login.SUCCESS:
            return { value: action?.payload };
        case Login.ERROR:
            return { value: action?.payload };
        default:
            return value;
    }
};
