import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    student: {
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
    students: [],
    isSuccessCreate: false,
    isSuccessModify: false,
    isSuccessGet: false,
    isSuccessDelete: false,
    error: false,
    paginationData: {
        page: 1,
        limit: 10,
    },
};

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        fetchStudents: (state, action) => {
            state.students = action.payload.students;
            state.paginationData = action.payload.pagination;
            return state;
        },
        setPagination: (state, action) => {
            state.paginationData = { ...state.paginationData, ...action.payload };
            return state;
        },

        studentDataUpdate: (state, action) => {
            console.log(action.payload.data);
            state.student = {
                ...state.student,
                ...action.payload.data,
            };
            return state;
        },
        studentsDataUpdate: (state, action) => {
            state.students = action.payload;
            return state;
        },
        studentsDelete: (state, action) => {
            state.students = state.students.filter((student) => student?.id !== action.payload);
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
        error: (state, action) => {
            state.error = true;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const studentActions = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
