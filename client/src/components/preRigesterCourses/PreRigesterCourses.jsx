import React from "react";
import { useSelector } from "react-redux";
import CourseCard from "../card/CourseCard";
import { useNavigate } from "react-router-dom";

const PreRigesterCourses = ({ userType, setMenuRoute, forr }) => {
    const navigate = useNavigate();
    const course = useSelector((state) => state.course);
    const term = useSelector((state) => state.term);

    const handleSendToAddCoursePage = () => {
        if (userType === "edumanager") {
            navigate("/edumanager/course");
        }
    };

    return (
        <div className="w-[100dvw] h-[100dvh] flex flex-col  text-lg bg-gray-300">
            <div className="flex flex-row items-center justify-between p-4 border-b-[1px] border-gray-600">
                {userType === "student" && forr === "preRegister" && <p>مشاهده پیش ثبت نام ها {term?.term?.name}</p>}

                {userType === "student" && forr === "preRegisterCourse" ? (
                    <p>دروس پیش ثبت نامی ترم {term?.term?.name}</p>
                ) : (
                    userType === "edumanager" && <p>دروس پیش ثبت نامی ترم </p>
                )}

                {userType !== "student" && <button onClick={handleSendToAddCoursePage}>+افزودن درس</button>}
                <button
                    className="border-[1px] border-gray-500 h-[35px] px-4 rounded-md"
                    onClick={() => setMenuRoute(0)}
                >
                    بازگشت
                </button>
            </div>

            <div className="flex flex-row-reverse items-center justify-between px-5 py-4 w-full">
                {/* downlaod excel file */}
                {userType !== "student" && (
                    <div className="flex flex-row-reverse">
                        <button className="bg-primary px-2 py-1 rounded-sm  cursor-pointer">دانلود اکسل</button>
                        <p className="mx-4">بیشترین تعداد ثبت نامی</p>
                        <p className="mx-4">کمترین تعداد ثبت نامی</p>
                    </div>
                )}

                <form>
                    <input
                        className="w-[200px] py-1 px-2  rounded-sm bg-transparent border-primary border-[1px]"
                        type="text"
                        name="searchName"
                        placeholder={`جست و جو بر اساس درس`}
                    />
                </form>
            </div>

            {/* result items */}
            <div className="py-2 px-4 min-h-[380px]">
                {/* show students list */}
                {userType === "edumanager" &&
                    course?.courses?.map((item) => <CourseCard key={item?.id} type="term" cardData={item} />)}

                {userType === "student" &&
                    term?.term?.courses?.map((item) => <CourseCard key={item?.id} type="student" cardData={item} />)}
            </div>
            <p className="w-[100px]  text-center mx-auto cursor-pointer">مشاهده بیشتر</p>
        </div>
    );
};

export default PreRigesterCourses;
