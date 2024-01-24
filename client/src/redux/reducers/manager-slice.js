import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    manager: {
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
    managers: [],
    isSuccessCreate: false,
    isSuccessModify: false,
    isSuccessGet: false,
    isSuccessDelete: false,
};

export const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        managerDataUpdate: (state, action) => {
            state.manager = {
                ...state.manager,
                ...action.payload,
            };
            return state;
        },
        managersDataUpdate: (state, action) => {
            state.managers = action.payload;
            return state;
        },
        managersDelete: (state, action) => {
            state.managers = state.managers?.filter((manager) => manager?.id !== action.payload);
            return state;
        },
        successCreate: (state, action) => {
            state.isSuccessCreate = true;
            return state;
        },
        successModify: (state, action) => {
            state.isSuccessModify = true;
            return state;
        },
        successGet: (state, action) => {
            state.isSuccessGet = true;
            return state;
        },
        successDelete: (state, action) => {
            state.isSuccessDelete = true;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const managerActions = managerSlice.actions;
export const managerReducer = managerSlice.reducer;
