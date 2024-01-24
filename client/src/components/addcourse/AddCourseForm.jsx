import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewCourse } from "../../redux/actions/courseAction";

const AddCourseForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        classTime: "",
        examTime: "",
        examLocation: "",
        professorName: "",
        professorId: "",
        capacity: 0,
        term: "",
        students: [],
    });

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    };

    const handleCreateNewCourse = () => {
        const authData = {
            ...formData,
            userType: "edumanager",
        };
        dispatch(createNewCourse(authData));
    };
    return (
        <div className="w-[100dvw] h-[100dvh] flex flex-col items-center bg-gray-100">
            <div className="w-full border-b-[1px] border-gray-600 p-5 text-lg">افزودن درس جدید</div>

            <h1 className="text-center text-lg mb-5">ثبت/تغییر درس</h1>
            <form className="w-full px-5 flex flex-col md:flex-row md:justify-around items-center md:items-start">
                <div className="flex flex-col items-center">
                    <label htmlFor="name" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        نام
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="classTime" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        تاریخ و ساعت برگزاری کلاس
                        <input
                            id="classTime"
                            name="classTime"
                            type="text"
                            required
                            value={formData.classTime}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="examTime" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        ساعت امتحان
                        <input
                            id="examTime"
                            name="examTime"
                            type="text"
                            required
                            value={formData.examTime}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="examLocation" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        تاریخ و امتحان
                        <input
                            id="examLocation"
                            name="examLocation"
                            type="text"
                            required
                            value={formData.examLocation}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                </div>

                <div className="flex flex-col items-center">
                    <label htmlFor="professorName" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        نام استاد
                        <input
                            id="professorName"
                            name="professorName"
                            type="text"
                            required
                            value={formData.professorName}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="professorId" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        شماره پرسنلی استاد
                        <input
                            id="professorId"
                            name="professorId"
                            type="text"
                            required
                            value={formData.professorId}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="capacity" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        ظرفیت
                        <input
                            id="capacity"
                            name="capacity"
                            type="number"
                            required
                            value={formData.capacity}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="term" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        ترم
                        <input
                            id="term"
                            name="term"
                            type="text"
                            required
                            value={formData.term}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                </div>
            </form>

            <button onClick={handleCreateNewCourse} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                ثبت تغییرات
            </button>
        </div>
    );
};

export default AddCourseForm;
