import React, { useState } from "react";
import { Button, Table, Modal, Form, Input, Select, Checkbox } from "antd";
import { booksColumns } from "./statics";
import { useDispatch, useSelector } from "react-redux";
import { addBook, searchBetweenBooks } from "../../../redux/actions/bookAction";

const { Option } = Select;

export const Books = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [available, setAvailable] = useState(true);
    const [form] = Form.useForm();
    const allBooksData = useSelector((state) => state.book.books);

    const handleSubmit = (values) => {
        dispatch(addBook(values));
        setIsModalOpen(false);
    };

    const handleSearch = (values) => {
        const searchCriteria = {
            [values.searchSection]: values.searchValue,
            available: values.available === true ? true : undefined,
        };
        dispatch(searchBetweenBooks(searchCriteria));
    };

    return (
        <div className="text-black flex flex-col p-5 -mt-10">
            <div className="flex w-full">
                <Form className="flex gap-2 w-full" form={form} onFinish={handleSearch}>
                    <Form.Item name="searchSection">
                        <Select style={{ width: 135 }}>
                            <Option value="name">بر اساس نام</Option>
                            <Option value="author">بر اساس نویسنده</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="searchValue">
                        <Input placeholder="کتاب مورد نظر را جست و جو کنید" className="w-80 rounded-e-none" />
                    </Form.Item>
                    <Form.Item name="available" label="موجود" valuePropName="checked">
                        <Checkbox name="available" />
                    </Form.Item>
                    <Button
                        type="primary"
                        className="bg-blue-500 hover:opacity-95 text-white font-bold m-0"
                        htmlType="submit"
                    >
                        Search
                    </Button>
                </Form>
                <Button className="w-56" onClick={() => setIsModalOpen(!isModalOpen)}>
                    افزودن کتاب
                </Button>
            </div>
            <Table columns={booksColumns} dataSource={allBooksData} scroll={{ x: 400 }} />
            <Modal
                title="اضافه کردن کتاب"
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
                    <Form.Item className="w-full" name="name" rules={[{ required: true }]}>
                        <Input min={0} placeholder="نام کتاب" />
                    </Form.Item>
                    <Form.Item className="w-full" name="author" rules={[{ required: true }]}>
                        <Input min={0} placeholder="نام نویسنده" />
                    </Form.Item>
                    <Form.Item className="w-full" name="publishYear" rules={[{ required: true }]}>
                        <Input type="number" min={0} placeholder="سال انتشار" />
                    </Form.Item>
                    <Form.Item className="w-full" name="classification" rules={[{ required: true }]}>
                        <Input min={0} placeholder="دسته بندی" />
                    </Form.Item>
                    <Form.Item className="w-full" name="totalCount" rules={[{ required: true }]}>
                        <Input type="number" min={0} placeholder="تعداد کتاب ها" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
