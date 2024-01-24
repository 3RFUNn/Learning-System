import React from "react";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../../redux/actions/studentAction";
import user from "../../assets/image/user.jpg";
import { deleteManager } from "../../redux/actions/managerAction";
import { deleteProfessor } from "../../redux/actions/professorAction";

const UserCard = (props) => {
    const dispatch = useDispatch();
    const handleDeleteUser = (e) => {
        e.preventDefault();
        if (props.type === "student") {
            dispatch(deleteStudent(props?.cardData?.id));
        }
        if (props.type === "manager") {
            dispatch(deleteManager(props?.cardData?.id));
        }
        if (props.type === "professor") {
            dispatch(deleteProfessor(props?.cardData?.id));
        }
    };

    return (
        <div className="w-[200px] min-w-[200px] h-[50px] min-h-[50px] border-[1px] rounded-md bg-blue-500 text-black flex flex-row justify-between items-center p-2 m-2 shadow-lg">
            <div className="flex flex-row items-center ">
                <img
                    className="border-[1px] border-white w-[35px] h-[35px] rounded-[50%]"
                    alt={props?.cardData?.firstName}
                    src={props?.cardData?.image || user}
                />
                <p className="pr-2 font-semibold">{props?.cardData?.firstName}</p>
            </div>
            <button onClick={handleDeleteUser} className="text-red-900 border-[1px] border-red-900 px-1 rounded-lg">
                حذف
            </button>
        </div>
    );
};

export default UserCard;
