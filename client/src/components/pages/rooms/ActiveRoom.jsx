import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { useDispatch } from "react-redux";
import { toggleRoomActive } from "../../../redux/actions/roomAction";

export const ActiveRoom = ({ id, isActive }) => {
    const dispatch = useDispatch();
    const [isRoomActive, setIsRoomActive] = useState(isActive);

    const handleSwitchChange = () => {
        dispatch(toggleRoomActive(id));
        setIsRoomActive(!isRoomActive);
    };

    useEffect(() => {
        setIsRoomActive(isActive);
    }, [isActive]);

    return (
        <div className="flex flex-col items-start">
            <Switch className="bg-gray-300" checked={isRoomActive} onChange={handleSwitchChange} />
        </div>
    );
};
