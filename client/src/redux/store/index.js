import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/user-slice";
import { themeReducer } from "../reducers/theme-slice";
import { studentReducer } from "../reducers/student-slice";
import { professorReducer } from "../reducers/professor-slice";
import { managerReducer } from "../reducers/manager-slice";
import { courseReducer } from "../reducers/course-slice";
import { termReducer } from "../reducers/term-slice";
import { roomReducer } from "../reducers/room-slice";
import { bookReducer } from "../reducers/book-slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        student: studentReducer,
        professor: professorReducer,
        manager: managerReducer,
        course: courseReducer,
        term: termReducer,
        room: roomReducer,
        book: bookReducer,
    },
});

export const userSelector = (state = store.getState()) => state.user;
export const themeSelector = (state = store.getState()) => state.theme;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
