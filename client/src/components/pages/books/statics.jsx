import { BorrowBook } from "./BorrowBooks";
import { ReturnBook } from "./ReturnBook";

export const booksColumns = [
    {
        title: "نام کتاب",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "نام نویسنده",
        dataIndex: "author",
        key: "author",
    },
    {
        title: "سال انتشار",
        dataIndex: "publishYear",
        key: "publishYear",
    },
    {
        title: "رده بندی کنگره",
        dataIndex: "classification",
        key: "classification",
    },
    {
        title: "تعداد کل",
        dataIndex: "totalCount",
        key: "totalCount",
    },
    {
        title: "تعداد موجود",
        dataIndex: "availableCount",
        key: "availableCount",
    },
    {
        title: "قرض دادن کتاب",
        dataIndex: "_id",
        key: "_id",
        render: (_, book) => <BorrowBook book={book} />,
    },
    {
        title: "برگرداندن کتاب",
        dataIndex: "_id",
        key: "_id",
        render: (_, book) => <ReturnBook book={book} />,
    },
];

export const borrowedBooksColumns = [
    {
        title: "نام کتاب",
        dataIndex: ["book", "name"],
        key: "name",
    },
    {
        title: "نویسنده",
        dataIndex: ["book", "author"],
        key: "author",
    },
    {
        title: "سال انتشار",
        dataIndex: ["book", "publishYear"],
        key: "publishYear",
    },
    {
        title: "دسته بندی",
        dataIndex: ["book", "classification"],
        key: "classification",
    },
    {
        title: "تعداد کل",
        dataIndex: ["book", "totalCount"],
        key: "totalCount",
    },
    {
        title: "تاریخ امانت گیری",
        dataIndex: "borrowedDate",
        key: "borrowedDate",
    },
    {
        title: "تاریخ بازگشت",
        dataIndex: "returnDate",
        key: "returnDate",
    },
];
