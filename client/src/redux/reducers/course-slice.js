import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course: {
        id: "",
        name: "",
        prerequisite: [],
        coPrerequisite: [],
        unit: 0,
    },
    courses: [],
    isSuccessCreate: false,
    isSuccessModify: false,
    isSuccessGet: false,
    isSuccessDelete: false,
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        courseDataUpdate: (state, action) => {
            state.course = {
                ...state.course,
                ...action.payload,
            };
            return state;
        },
        coursesDataUpdate: (state, action) => {
            state.courses = [...state.course, ...action.payload];
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
export const courseActions = courseSlice.actions;
export const courseReducer = courseSlice.reducer;
