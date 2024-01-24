import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    professor: {
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
    professors: [],
    isSuccessCreate: false,
    isSuccessModify: false,
    isSuccessGet: false,
    isSuccessDelete: false,
};

export const professorSlice = createSlice({
    name: "professor",
    initialState,
    reducers: {
        professorDataUpdate: (state, action) => {
            state.professor = {
                ...state.professor,
                ...action.payload?.data,
            };
            return state;
        },
        professorsDataUpdate: (state, action) => {
            state.professors = action.payload;
            return state;
        },
        professorsDelete: (state, action) => {
            state.professors = state.professors.filter((professor) => professor?.id !== action.payload);
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
export const professorActions = professorSlice.actions;
export const professorReducer = professorSlice.reducer;
