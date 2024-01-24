import axios from "axios";
import { userActions } from "../../reducers/user-slice";
import jwtDecode from "jwt-decode";
import { baseUri } from "../../../configs/globals";
console.log(baseUri);
/* create async thunk for login request */
export const submitLogin = (user) => {
    return async (dispatch) => {
        const request = async () => {
            if (user?.id && user?.password) {
                const res = await axios.post(`${baseUri}login`, user);
                return res;
            }
        };
        try {
            const { data } = await request();
            if (data && data?.data) {
                localStorage.setItem("token", data?.data);
                const userPublicData = jwtDecode(data?.data);
                userPublicData && dispatch(userActions.userDataUpdate(userPublicData));
                userPublicData && dispatch(userActions.userLogin());
                return "ورود موفق";
            } else {
                // dispatch error
            }
        } catch (error) {
            const errorMsg = {
                type: "error",
                txt: "ورود ناموفق",
                content: error,
            };
            return errorMsg;
        }
    };
};

export const getDataFromTokenAfterReload = () => {
    return (dispatch) => {
        dispatch(userActions.userDataUpdate());
    };
};

export const Logout = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        dispatch(userActions.userLogout());
    };
};
