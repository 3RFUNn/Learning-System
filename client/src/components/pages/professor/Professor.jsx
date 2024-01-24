import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTermsList } from "../../../redux/actions/termAction";

const Professor = ({ menuRoute }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const term = useSelector((state) => state.term);

    const handleSendToTermPage = (id) => {
        navigate(`term/${id}`);
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        const data = {
            token: token,
        };
        dispatch(getTermsList(data));
    }, [dispatch, token]);

    return (
        <div className=" w-full h-full">
            <div className="w-full text-black border-b-[1px] border-gray-400 px-3 py-5">مشاهده لیست ترم ها</div>
            <div className="py-2 px-4 flex flex-row flex-wrap ">
                {/* show students list */}
                {menuRoute === 1 &&
                    term?.terms?.map((item) => (
                        <div
                            className="w-[200px] h-[50px] m-2 bg-blue-500 text-black rounded-md flex items-center px-3 cursor-pointer"
                            key={item?._id}
                            onClick={() => handleSendToTermPage(item?._id)}
                        >
                            {item?.name}
                        </div>
                    ))}
            </div>
            <p className="w-[100px] text-center mx-auto cursor-pointer">مشاهده بیشتر</p>
        </div>
    );
};

export default Professor;
