import { BookModel } from "../models/book.model.js";
import { models } from "../models/index.js";
import mongoose from "mongoose";
const resUnauthorized = (res) => {
    res.status(403).json({
        data: null,
        status: 403,
        error: "access denied",
        ok: false,
        message: "you don't have permission",
    });
};

const resNotFound = (res, name) => {
    res.status(404).json({
        data: null,
        status: 404,
        error: name + " not found",
        ok: false,
        message: name + " not found with the provided ID",
    });
};

const resInternalServerError = (res) => {
    res.status(500).json({
        data: null,
        status: 500,
        ok: false,
        message: "Error in retrieving books",
    });
};

export const getBorrowedBooksHandler = async (req, res) => {
    const accessAllowedTo = ["itmanager", "student", "libmanager"];
    try {
        const user = req?.authData;

        if (!accessAllowedTo.includes(user.userType)) resUnauthorized(res);

        const student = await models.StudentModel.findOne({
            studentId: user.userId,
        }).populate("borrowedBooks.book");

        if (!student) resNotFound(res, "Student");

        const borrowedBooks = student.borrowedBooks.map(({ book, borrowedDate, returnDate }) => ({
            book,
            borrowedDate,
            returnDate,
        }));

        res.status(200).json({
            data: borrowedBooks,
            status: 200,
            error: null,
            ok: true,
            message: "",
        });
    } catch (error) {
        resInternalServerError(res);
    }
};

export const borrowBookHandler = async (req, res) => {
    const accessAllowedTo = ["itmanager", "libmanager"];
    try {
        const { studentId, bookId } = req.body;
        const user = req?.authData;

        if (!accessAllowedTo.includes(user?.userType)) resUnauthorized(res);

        let studentQuery = {};

        if (mongoose.isValidObjectId(studentId)) {
            studentQuery = {
                _id: studentId,
            };
        } else {
            studentQuery = {
                studentNumber: studentId,
            };
        }

        const student = await models.StudentModel.findOne(studentQuery).populate("borrowedBooks.book").exec();

        console.log({ student, bb: student.borrowedBooks });

        if (!student) {
            resNotFound(res, "Student");
            return;
        }

        if (student.borrowedBooks?.find((_) => _._id.toString() === bookId) !== undefined) {
            res.status(401).json({
                status: 401,
                error: "Already Borrowed",
            });
            return;
        }

        const book = await models.BookModel.findById(bookId);

        if (!book) {
            resNotFound(res, "Book");
            return;
        }
        // Check if the book is available
        if (book.availableCount <= 0) {
            res.status(400).json({
                data: null,
                status: 400,
                error: "Book not available",
                ok: false,
                message: "The requested book is not available for borrowing",
            });
            return;
        }

        const oneMonthMs = 30 * 24 * 60 * 60 * 1000;

        console.log(student, book);

        const borrowedBook = {
            book: book._id,
            borrowedDate: new Date(),
            returnDate: new Date(new Date().getTime() + oneMonthMs),
        };

        student.borrowedBooks = [...(student?.borrowedBooks || []), book];
        await student.save();

        book.availableCount--;
        book.borrowedBy = [...(book?.borrowedBy || []), student._id];
        await book.save();

        res.status(200).json({
            data: borrowedBook,
            status: 200,
            error: null,
            ok: true,
            message: "Book successfully borrowed",
        });
    } catch (error) {
        console.error(error);
        resInternalServerError(res);
    }
};

export const searchAndFilterBooksHandler = async (req, res) => {
    try {
        const { name, author, available, page, pageSize } = req.query;

        let query = {};
        if (name) {
            query.name = new RegExp(name, "i");
        }
        if (author) {
            query.author = new RegExp(author, "i");
        }
        if (available !== undefined && available !== null) {
            query.availableCount = available ? { $gt: 0 } : 0;
        }
        const totalCount = await models.BookModel.countDocuments(query);

        const skip = (page - 1) * pageSize;
        const books = await models.BookModel.find(query).skip(skip).limit(pageSize).exec();

        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({
            data: books,
            status: 200,
            error: null,
            ok: true,
            message: "",
            pagination: {
                page: Number(page),
                pageSize: Number(pageSize),
                totalCount,
                totalPages,
            },
        });
    } catch (error) {
        console.log(error);
        resInternalServerError(res);
    }
};

export const getAllBooksHandler = async (req, res) => {
    try {
        const { pageSize = 10, page = 1 } = req.query;

        const totalCount = await models.BookModel.countDocuments();

        const totalPages = Math.ceil(totalCount / pageSize);

        const skip = (page - 1) * pageSize;

        const books = await models.BookModel.find().populate("borrowedBy").skip(skip).limit(pageSize).exec();

        res.status(200).json({
            data: books,
            status: 200,
            error: null,
            ok: true,
            message: "",
            pagination: {
                page: Number(page),
                pageSize: Number(pageSize),
                totalCount,
                totalPages,
            },
        });
    } catch (error) {
        resInternalServerError(res);
    }
};

export const getBookBorrowersHandler = async (req, res) => {
    const accessAllowedTo = ["itmanager", "libmanager"];
    const user = req?.authData;

    if (!accessAllowedTo.includes(user?.userType)) resUnauthorized(res);

    try {
        const { bookId } = req.params;

        // Use populate to get book details along with borrower information
        const book = await BookModel.findById(bookId).populate("borrowedBy").exec();

        if (!book) resNotFound(res, "Book");

        console.log(book);

        // Extract user details from the borrowers
        const borrowers = book?.borrowedBy || [];

        res.status(200).json({
            data: borrowers,
            status: 200,
            error: null,
            ok: true,
            message: "",
        });
    } catch (error) {
        console.log(error);
        resInternalServerError(res);
    }
};

export const returnBookHandler = async (req, res) => {
    const accessAllowedTo = ["itmanager", "libmanager"];
    try {
        const { studentId, bookId } = req.body; // Assuming the request body contains studentId and bookId
        const user = req?.authData;

        if (!accessAllowedTo.includes(user?.userType)) return resUnauthorized(res);

        // Find the student
        const student = await models.StudentModel.findById(studentId).populate("borrowedBooks.book").exec();
        const book = await models.BookModel.findById(bookId).populate("borrowedBy").exec();

        console.log(student.borrowedBooks);

        if (!student) return resNotFound(res, "Student");
        if (!book) return resNotFound(res, "Book");

        // Find the borrowed book in student's array
        const borrowedBookIndex = student.borrowedBooks.findIndex((b) => b._id.toString() === bookId);

        if (borrowedBookIndex === -1) return resNotFound(res, "Borrowed Book");

        student.borrowedBooks = student.borrowedBooks.filter((_, idx) => idx !== borrowedBookIndex);

        await student.save();

        // Update available count of the book
        console.log(book);
        book.availableCount++;
        book.borrowedBy = book.borrowedBy.filter((u) => u._id.toString() !== studentId);

        await book.save();

        res.status(200).json({
            data: student.borrowedBooks[borrowedBookIndex],
            status: 200,
            error: null,
            ok: true,
            message: "Book successfully returned",
        });
    } catch (error) {
        console.log(error);
        resInternalServerError(res);
    }
};

export const addBookHandler = async (req, res) => {
    const accessAllowedTo = ["libmanager", "itmanager"];
    try {
        const { name, author, publishYear, classification, totalCount } = req.body; // Assuming the request body contains these properties
        const user = req?.authData;

        if (!accessAllowedTo.includes(user?.userType)) resUnauthorized(res);

        // Create a new book
        const newBook = new models.BookModel({
            name,
            author,
            publishYear,
            classification,
            totalCount,
            availableCount: totalCount,
        });

        await newBook.save();

        res.status(200).json({
            data: newBook,
            status: 200,
            error: null,
            ok: true,
            message: "Book successfully added",
        });
    } catch (error) {
        resInternalServerError(res);
    }
};
