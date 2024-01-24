import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { useDispatch } from "react-redux";
import { AddStudentToRoom } from "../../../redux/actions/roomAction";

export const AddToRoom = ({ room }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studentIds, setStudentIds] = useState("");

    const handleOk = (studentIds) => {
        dispatch(AddStudentToRoom(room._id, [studentIds]));
        setStudentIds("");
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setStudentIds("");
        setIsModalVisible(false);
    };

    const handleInputChange = (e) => {
        setStudentIds(e.target.value);
    };

    return (
        <div className="flex">
            <Button
                onClick={() => setIsModalVisible(true)}
                disabled={!room?.isActive || room?.capacity === room?.currentResidents.length}
            >
                اضافه کردن دانشجو
            </Button>
            <Modal
                title="اضافه کردن دانشجو"
                centered
                open={isModalVisible}
                onOk={() => handleOk(studentIds)}
                onCancel={() => handleCancel()}
                width={500}
                okButtonProps={{ className: "bg-blue-500" }}
            >
                <Input placeholder="ID دانشجو را وارد کنید" value={studentIds} onChange={handleInputChange} />
            </Modal>
        </div>
    );
};
