import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyTerm } from "../../../redux/actions/termAction";

const EditTerm = () => {
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [name, setName] = useState("");
    const [newUsers, setNewUsers] = useState("");
    const [newCourses, setNewCourses] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeCourses = (e) => {
        setNewCourses(e.target.value);
    };

    const handleChangeUsers = (e) => {
        setNewUsers(e.target.value);
    };

    const handleAddUserToList = () => {
        setUsers((prevValue) => {
            return [...prevValue, newUsers];
        });

        setNewUsers("");
    };

    const handleAddCourseToList = () => {
        setCourses((prevValue) => {
            return [...prevValue, newCourses];
        });

        setNewCourses("");
    };

    const handleSubmitTerm = () => {
        const authData = {
            users: users,
            courses: courses,
            name: name,
        };

        dispatch(modifyTerm(authData));
    };
    return (
        <div className="flex w-[100vw] flex-col items-center">
            <div className="border-b-[1px] border-gray-500 w-full p-5">ویرایش اطلاعات ترم پاییز 1401</div>
            <form className="flex flex-col items-start py-5 px-5 w-full">
                <label htmlFor="name" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                    نام ترم
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={handleChangeName}
                        className="border-[1px] border-gray-300 py-1 px-2 rounded-sm w-full"
                    />
                </label>

                <div className="flex flex-row items-center">
                    <label htmlFor="courses" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        لیست دروس
                        <input
                            id="courses"
                            name="courses"
                            type="text"
                            required
                            onChange={handleChangeCourses}
                            className="border-[1px] border-gray-300 py-2 px-2 rounded-sm"
                        />
                    </label>

                    <button
                        onClick={handleAddCourseToList}
                        className="w-[80px] h-[40px] text-lg bg-primary rounded-sm mr-2"
                    >
                        افزودن
                    </button>
                    <label htmlFor="file" className="bg-black text-white px-2 h-[40px] flex items-center mr-2">
                        آپلود اکسل
                        <input className="hidden" type="file" name="file" accept=".excel" />
                    </label>
                </div>

                <div className="flex flex-row items-center">
                    <label htmlFor="users" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        لیست دانشجویان
                        <input
                            id="users"
                            name="users"
                            type="text"
                            required
                            onChange={handleChangeUsers}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <button
                        onClick={handleAddUserToList}
                        className="w-[80px] h-[40px] text-lg bg-primary rounded-sm mr-2"
                    >
                        افزودن
                    </button>
                    <label htmlFor="file" className="bg-black text-white px-2 h-[40px] flex items-center mr-2">
                        آپلود اکسل
                        <input className="hidden" type="file" name="file" accept=".excel" />
                    </label>
                </div>
            </form>

            <button onClick={handleSubmitTerm} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                ثبت تغییرات
            </button>
        </div>
    );
};

export default EditTerm;
