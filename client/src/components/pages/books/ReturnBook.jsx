import { Button, Modal, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnBook, studentsBorrowedBooks } from "../../../redux/actions/bookAction";

export const ReturnBook = ({ book }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const students = useSelector((state) => state.book.studentsBorrowedBook);

    const handleSubmit = (value) => {
        const values = {
            studentId: value.studentId,
            bookId: book._id,
        };
        dispatch(returnBook(values));
        form.resetFields();
        setIsModalOpen(false);
    };

    useEffect(() => {
        dispatch(studentsBorrowedBooks(book._id));
    }, [isModalOpen]);

    const onReturnClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const booksAreFull = book?.availableCount === book?.totalCount;

    return (
        <div>
            <Button disabled={booksAreFull} onClick={() => onReturnClick()}>
                برگرداندن کتاب
            </Button>
            <Modal
                title="برگرداندن کتاب"
                centered
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                }}
                width={500}
                okButtonProps={{ className: "bg-blue-500" }}
                okText="تایید"
                cancelText="لغو"
            >
                <Form className="flex w-full flex-col items-center" form={form} onFinish={handleSubmit}>
                    <Form.Item className="w-full" name="studentId">
                        <Select className="w-full">
                            {students.map((student) => (
                                <Option key={student._id} value={student._id}>
                                    {`${student.firstName} ${student.lastName}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
