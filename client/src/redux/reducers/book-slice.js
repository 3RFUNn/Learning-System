import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    borrowedBooks: [],
    studentsBorrowedBook: [],
};

export const booksSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        getAllBooks: (state, action) => {
            state.books = action.payload;
            return state;
        },
        getBorrowedBooks: (state, action) => {
            state.borrowedBooks = action.payload;
            return state;
        },
        borrowBook: (state, action) => {
            state.books = state.books.map((book) => {
                if (book._id !== action.payload.bookId) return book;
                else {
                    book.availableCount -= 1;
                    return book;
                }
            });
            return state;
        },

        returnBook: (state, action) => {
            state.books = state.books.map((book) => {
                if (book._id !== action.payload.bookId) return book;
                console.log(book);
                book.availableCount += 1;
                return book;
            });
            state.studentsBorrowedBook = state.studentsBorrowedBook.filter((s) => s._id !== action.payload.studentId);
            return state;
        },

        addNewBook: (state, action) => {
            state.books.push(action.payload);
            return state;
        },
        studentsBorrowedBook: (state, action) => {
            state.studentsBorrowedBook = action.payload;
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const bookActions = booksSlice.actions;
export const bookReducer = booksSlice.reducer;
