import axios from "axios";
import { baseUri } from "../../configs/globals";
import { bookActions } from "../reducers/book-slice";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

const headers = { authorization: "Bearer " + token };

export const getBooks = () => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}books/all`, { headers });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(bookActions.getAllBooks(data?.data?.data));
            }
        } catch (error) {
            toast.error("خطا در دریافت کتاب ها");
        }
    };
};

export const getBorrowedBooks = () => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}books/borrowed`, { headers });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(bookActions.getBorrowedBooks(data?.data?.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const borrowBook = (body) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}books/borrow`, body, { headers });
            return response;
        };

        try {
            const data = await request();
            toast.success("کتاب با موفقیت به امانت سپرده شد");
            if (data?.data) {
                dispatch(bookActions.borrowBook({ bookId: body.bookId }));
            }
        } catch (error) {
            toast.error("خطا در ثبت امانت");
        }
    };
};

export const addBook = (values) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}books/add`, values, { headers });
            return response;
        };

        try {
            const data = await request();
            toast.success("کتاب با موفقیت اضافه شد");
            if (data?.data) {
                dispatch(bookActions.addNewBook(data?.data?.data));
            }
        } catch (error) {
            toast.error("خطا در اضافه کردن کتاب");
        }
    };
};

export const studentsBorrowedBooks = (bookId) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}books/${bookId}/students`, { headers });
            return response;
        };

        try {
            const data = await request();
            if (data?.data?.data) {
                dispatch(bookActions.studentsBorrowedBook(data?.data?.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const returnBook = (values) => {
    return async (dispatch) => {
        const request = async () => {
            return await axios.post(`${baseUri}books/return`, values, { headers });
        };

        try {
            const data = await request();
            toast.success("کتاب با موفقیت بازگردانده شد");
            if (data?.status === 200) {
                dispatch(bookActions.returnBook(values));
            }
        } catch (error) {
            toast.error("خطا در بازگرداندن کتاب");
        }
    };
};

export const searchBetweenBooks = (values) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}books/search`, {
                headers,
                params: values,
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(bookActions.getAllBooks(data?.data?.data));
            }
        } catch (error) {
            toast.error("خطا هنگام دریافت کتاب ها");
        }
    };
};
