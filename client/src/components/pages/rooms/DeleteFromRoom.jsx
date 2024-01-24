import React, { useState } from "react";
import { Button, Modal, Select, Form } from "antd";
import { useDispatch } from "react-redux";
import { DeleteStudentFromRoom } from "../../../redux/actions/roomAction";

export const DeleteFromRoom = ({ room }) => {
    const roomId = room._id;
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleOk = (value) => {
        const values = {
            id: roomId,
            studentId: value,
        };
        dispatch(DeleteStudentFromRoom(values));
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div className="flex">
            <Button
                onClick={() => setIsModalVisible(true)}
                disabled={!room?.isActive || room?.currentResidents.length === 0}
            >
                حذف دانشجو
            </Button>
            <Modal
                title="حذف کردن دانشجو"
                centered
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={() => handleCancel()}
                width={500}
                okButtonProps={{ style: { background: "red" } }}
            >
                <Form className="flex w-full flex-col items-center" form={form} onFinish={handleOk}>
                    <Form.Item className="w-full" name="studentId">
                        <Select className="w-full">
                            {room.currentResidents.map((student) => (
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
