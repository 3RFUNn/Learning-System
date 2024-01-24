import React, { useState } from "react";
import { Table, Modal, Input, Button, Form, Select } from "antd";
import { AddToRoom } from "./AddToRoom";
import { ActiveRoom } from "./ActiveRoom";
import { DeleteFromRoom } from "./DeleteFromRoom";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, searchBetweenRooms } from "../../../redux/actions/roomAction";

const columns = [
    {
        title: "شماره اتاق",
        dataIndex: "roomNumber",
        key: "roomNumber",
    },
    {
        title: "ظرفیت",
        dataIndex: "capacity",
        key: "capacity",
    },
    {
        title: "دانشجوی های اتاق",
        dataIndex: "currentResidents",
        key: "currentResidents",
        render: (currentResidents) => (
            <div className="flex flex-wrap gap-5">
                {currentResidents.map((resident, index) => (
                    <span key={index}>
                        {resident.firstName} {resident.lastName}
                        {index !== currentResidents.length - 1 && " | "}
                    </span>
                ))}
            </div>
        ),
    },
    {
        title: "فعال",
        dataIndex: ["isActive", "_id"],
        render: (_, { isActive, _id }) => <ActiveRoom isActive={isActive} id={_id} />,
    },
    {
        title: "اضافه کردن دانشجو",
        dataIndex: "_id",
        key: "_id",
        render: (_, room) => <AddToRoom room={room} />,
    },
    {
        title: "حذف دانشجو",
        dataIndex: "_id",
        key: "_id",
        render: (_, room) => <DeleteFromRoom room={room} />,
    },
];

export const AllRooms = () => {
    const [userSearch, setUserSearch] = useState({});
    const [isUserSearched, setIsUserSearched] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortOption, setSortOption] = useState("none");
    const dispatch = useDispatch();
    const roomsData = useSelector((state) => state.room.rooms);
    const roomPagination = useSelector((state) => state.room.pagination);
    const [form] = Form.useForm();

    const paginationConfig = {
        total: roomPagination.totalPages * roomPagination.pageSize,
        current: roomPagination.page,
        showSizeChanger: true,
        onChange: (page, pageSize) => {
            const pages = {
                pageSize: pageSize,
                page: page,
            };
            isUserSearched ? handleSearch(userSearch, pages) : dispatch(getRooms({ ...form.values, ...pages }));
        },
    };

    const handleSearch = async (values, pages) => {
        const params = {
            ...values,
            ...pages,
        };
        dispatch(searchBetweenRooms(params));
        setUserSearch(values);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="text-black p-5 -mt-10 flex flex-col gap-4">
            <div>
                <Button
                    onClick={() => {
                        setIsModalVisible(true);
                    }}
                >
                    جست و جوی اتاق ها
                </Button>
                <Modal
                    title="فیلتر"
                    centered
                    open={isModalVisible}
                    onOk={() => {
                        form.submit();
                        setIsUserSearched(true);
                    }}
                    onCancel={() => handleCancel()}
                    width={500}
                    okButtonProps={{ className: "bg-blue-500" }}
                >
                    <Form form={form} onFinish={handleSearch}>
                        <Form.Item name="roomNumber">
                            <Input min={0} placeholder="شماره ی واحد" />
                        </Form.Item>
                        <Form.Item name="capacity">
                            <Input min={0} placeholder="ظرفیت کل" />
                        </Form.Item>
                        <Form.Item name="isActive">
                            <Select defaultValue={undefined} placeholder="فعال یا غیر فعال">
                                <Option value={undefined}>هیچکدام</Option>
                                <Option value={true}>فعال</Option>
                                <Option value={false}>غیر فعال</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="sortBy" label="مرتب سازی بر اساس">
                            <Select
                                defaultValue={undefined}
                                onChange={(value) => setSortOption(value)}
                                placeholder="مرتب سازی"
                            >
                                <Option value={undefined}>هیچکدام</Option>
                                <Option value="capacity">ظرفیت</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="sortOrder" label="ترتیب">
                            <Select disabled={sortOption === "none"} defaultValue="asc">
                                <Option value="desc">بیشترین</Option>
                                <Option value="asc">کمترین</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
            <Table
                pagination={{
                    ...paginationConfig,
                    style: { justifyContent: "left", direction: "ltr" },
                }}
                columns={columns}
                dataSource={roomsData}
                scroll={{ x: 400 }}
            />
        </div>
    );
};
