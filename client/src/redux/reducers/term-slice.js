import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    term: {
        id: "6480cd8baad52d113e6a648c",
        name: "Fall 1402",
        courses: [
            {
                id: "آمار و احتمال مهندسی",
            },
        ],
        users: [],
        unit: 0,
    },
    terms: [],
    isSuccessCreate: false,
    isSuccessModify: false,
    isSuccessGet: false,
    isSuccessDelete: false,
};

export const termSlice = createSlice({
    name: "term",
    initialState,
    reducers: {
        termDataUpdate: (state, action) => {
            state.term = {
                ...state.term,
                ...action.payload,
            };
            return state;
        },
        termsDataUpdate: (state, action) => {
            state.terms = action.payload;
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
export const termActions = termSlice.actions;
export const termReducer = termSlice.reducer;
