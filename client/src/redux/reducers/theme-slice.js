import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false,
};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        themeToggle: (state) => {
            state.isDark = !state.isDark;
        },
        themeSet: (state, action) => {
            state.isDark = action.payload === "dark";
        },
    },
});

// Action creators are generated for each case reducer function
export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
