import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");

const initialState = {
    data: {
        firstName: "",
        lastName: "",
        id: "",
        password: "",
        email: "",
        mobileNumber: "",
        level: "",
        entryYear: "",
        entryTerm: "",
        gpa: "",
        courses: [],
        supervisor: "",
        department: "",
        subject: "",
        rank: "",
    },
    isLoggedIn: token ? true : false,
    token: token ? token : null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDataUpdate: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            try {
                state.data = {
                    ...state.data,
                    ...action.payload,
                };
            } catch (error) {
                console.log(error);
            }
            return state;
        },
        userLogin: (state, action) => {
            state.isLoggedIn = true;
            return state;
        },
        userLogout: (state, action) => {
            state.isLoggedIn = false;
        },
    },
});

export const extractTokenData = () => {
    return (dispatch) => {
        let getDataFromToken = jwtDecode(token);
        dispatch(userActions.userDataUpdate(getDataFromToken));
        // return getDataFromToken;
    };
};

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
