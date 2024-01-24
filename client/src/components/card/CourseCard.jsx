import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../../redux/actions/courseAction";

const CourseCard = ({ cardData, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSendToFullDataCourse = () => {
        if (type !== "student") {
            navigate(`/edumanager/course/${cardData?.id}`);
        }
    };
    const handleDeleteCourse = () => {
        dispatch(deleteCourse(cardData?.id));
    };
    return (
        <div className="w-[320px] h-[70px] rounded-md flex flex-row items-center justify-between bg-blue-500 text-white">
            <div className="flex flex-col items-center justify-start">
                {type !== "student" && (
                    <Fragment>
                        <h3>{cardData?.course}</h3>
                        <p>{cardData?.professor}</p>
                    </Fragment>
                )}
            </div>
            {type === "student" && <p>{cardData?.id}</p>}
            {type !== "student" && <div>پیش ثبت نام {cardData?.users}</div>}

            <div className="flex flex-row items-center justify-center">
                <button onClick={handleSendToFullDataCourse} className="bg-gray-700 px-2 rounded-md text-black">
                    اطلاعات کامل
                </button>
                <button onClick={handleDeleteCourse} className="bg-gray-700 mx-2 px-2 rounded-md text-black">
                    حذف
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
