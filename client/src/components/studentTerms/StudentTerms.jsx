import React, { useEffect, useState } from "react";
import PreRigesterCourses from "../preRigesterCourses/PreRigesterCourses";
import { useDispatch, useSelector } from "react-redux";
import { getTerm } from "../../redux/actions/termAction";
import RegisterdCourses from "../pages/registerdCourses/RegisterdCourses";
import { useNavigate } from "react-router-dom";

const StudentTerms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuRoute, setMenuRoute] = useState(0);
    const [currentTerm, setCurrentTrerm] = useState("");
    const termData = useSelector((state) => state.term);

    useEffect(() => {
        setCurrentTrerm(window.location?.pathname?.split("/")[3]);
    }, []);

    useEffect(() => {
        if (currentTerm) {
            const authData = {
                id: currentTerm,
            };
            dispatch(getTerm(authData));
        }
    }, [currentTerm, dispatch]);

    const handleGetTermInformation = () => {
        if (currentTerm) {
            dispatch(getTerm(currentTerm));
        }
    };

    return (
        <div className=" w-[100dvw] h-[100dvh] bg-gray-100">
            {menuRoute === 0 && (
                <div className="w-full flex flex-row items-center justify-between border-b-[1px] border-gray-400 px-3 py-5">
                    <div className="flex flex-row items-center">
                        <button
                            onClick={() => navigate("/student")}
                            className="bg-black text-white px-2 py-1 rounded-md ml-2"
                        >
                            بازگشت
                        </button>
                        <p>{termData?.term?.name || "پاییز 1402"}</p>
                    </div>

                    <button onClick={handleGetTermInformation}>مشاهده اطلاعات ترم</button>
                </div>
            )}

            {menuRoute === 0 && (
                <div className=" w-full flex flex-col items-center">
                    <div className="flex flex-row mx-5">
                        <div
                            onClick={() => setMenuRoute(1)}
                            className="bg-gray-700 text-white h-[100px] w-[190px] m-3 cursor-pointer flex items-center justify-center text-center rounded-2xl"
                        >
                            مشاهده پیش ثبت نام ها
                        </div>
                        <div
                            onClick={() => setMenuRoute(2)}
                            className="bg-gray-700 text-white h-[100px] w-[190px] m-3 cursor-pointer flex items-center justify-center text-center rounded-2xl"
                        >
                            مشاهده لیست دروس ارایه شده برای پیش ثبت نام
                        </div>
                    </div>

                    <div className="flex flex-row mx-5">
                        <div
                            onClick={() => setMenuRoute(3)}
                            className="bg-gray-700 text-white h-[100px] w-[190px] m-3 cursor-pointer flex items-center justify-center text-center rounded-2xl"
                        >
                            مشاهده درس های ثبت نام شده
                        </div>
                        <div
                            onClick={() => setMenuRoute(4)}
                            className="bg-gray-700 text-white h-[100px] w-[190px] m-3 cursor-pointer flex items-center justify-center text-center rounded-2xl"
                        >
                            مشاهده لیست دروس ارایه شده برای ثبت نام
                        </div>
                    </div>
                </div>
            )}

            {/* show content */}
            {menuRoute === 1 && (
                <PreRigesterCourses setMenuRoute={setMenuRoute} forr="preRegister" userType="student" />
            )}
            {menuRoute === 2 && (
                <PreRigesterCourses setMenuRoute={setMenuRoute} forr="preRegisterCourse" userType="student" />
            )}
            {menuRoute === 3 && <RegisterdCourses setMenuRoute={setMenuRoute} forr="register" userType="student" />}
            {menuRoute === 4 && (
                <RegisterdCourses setMenuRoute={setMenuRoute} forr="registerCourse" userType="student" />
            )}
        </div>
    );
};

export default StudentTerms;
