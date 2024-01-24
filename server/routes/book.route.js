import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
    addBookHandler,
    borrowBookHandler,
    getAllBooksHandler,
    getBookBorrowersHandler,
    getBorrowedBooksHandler,
    returnBookHandler,
    searchAndFilterBooksHandler,
} from "../controllers/book.controller.js";

export const bookRouter = Router();

bookRouter.get("/books/borrowed", authenticateToken, getBorrowedBooksHandler);
bookRouter.get("/books/all", authenticateToken, getAllBooksHandler);
bookRouter.get("/books/search", authenticateToken, searchAndFilterBooksHandler);
bookRouter.post("/books/borrow", authenticateToken, borrowBookHandler);
bookRouter.post("/books/return", authenticateToken, returnBookHandler);
bookRouter.post("/books/add", authenticateToken, addBookHandler);
bookRouter.get("/books/:bookId/students", authenticateToken, getBookBorrowersHandler);
export default (app) => {
    app.use("/", bookRouter);
};
