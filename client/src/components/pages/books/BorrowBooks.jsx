import { Button, Modal, Form, Input } from "antd";
import React, { useState } from "react";
import { borrowBook } from "../../../redux/actions/bookAction";
import { useDispatch } from "react-redux";

export const BorrowBook = ({ book }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const handleSubmit = async (values) => {
        console.log(values);
        dispatch(borrowBook({ bookId: book?._id, studentId: values.studentId }));
        setIsModalOpen(false);
        form.resetFields();
    };

    const booksAreFull = !book?.availableCount === !book?.totalCount;

    return (
        <div>
            <Button disabled={!booksAreFull} onClick={() => setIsModalOpen(!isModalOpen)}>
                قرض دادن کتاب
            </Button>
            <Modal
                title="قرض دادن کتاب"
                centered
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={() => setIsModalOpen(false)}
                width={500}
                okButtonProps={{ className: "bg-blue-500" }}
                okText="تایید"
                cancelText="لغو"
            >
                <Form className="flex w-full flex-col items-center" form={form} onFinish={handleSubmit}>
                    <Form.Item className="w-full" name="studentId" rules={[{ required: true }]}>
                        <Input min={0} placeholder="ID دانشجو" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
