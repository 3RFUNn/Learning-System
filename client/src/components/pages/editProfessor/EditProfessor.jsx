import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProfessor, modifyProfessor } from "../../../redux/actions/professorAction";

const EditProfessor = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const professor = useSelector((state) => state.professor);
    const [status, setStatus] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        id: "",
        email: "",
        mobileNumber: "",
        password: "",
        department: "IT",
        subject: "",
        rank: "",
    });

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setStatus("");
        setFormData((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    };

    const handleEditProfessor = () => {
        const authData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            id: formData.id,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            rank: Number(formData.rank),
            department: formData.department,
            subject: formData.subject,
            userType: userData?.data?.userType,
        };
        dispatch(modifyProfessor(authData));
    };
    const handleAddProfessor = () => {
        const authData = {
            body: formData,
            userType: userData?.data?.userType?.userType,
        };
        dispatch(createNewProfessor(authData));
    };

    useEffect(() => {
        if (professor.isSuccessCreate || professor.isSuccessModify) {
            setStatus("موفقیت آمیز");
        }
    }, [professor]);
    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-center text-lg mb-5">ثبت/تغییر اطلاعات استاد</h1>
            <p className="text-blue-500 font-bold text-base">{status}</p>
            <form className="w-full px-5 flex flex-col md:flex-row md:justify-around items-center md:items-start">
                <div className="flex flex-col items-center">
                    {/* firstname input */}
                    <label htmlFor="firstName" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        نام
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                    {/* lastname input */}
                    <label htmlFor="lastName" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        نام خانوادگی
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                    {/* professorNumber input */}
                    <label htmlFor="id" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        شماره پرسنلی
                        <input
                            id="id"
                            name="id"
                            type="text"
                            required
                            value={formData.id}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                    <label htmlFor="password" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        رمز عبور
                        <input
                            id="password"
                            name="password"
                            type="text"
                            required
                            value={formData.password}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="mobileNumber" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        شماره تلفن
                        <input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="text"
                            required
                            value={formData.mobileNumber}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                </div>

                <div className="flex flex-col items-center">
                    {/* department input */}
                    <label htmlFor="department" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        دانشکده
                        <select
                            name="department"
                            id="department"
                            value={formData.department}
                            required
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        >
                            <option value="IT">IT</option>
                        </select>
                    </label>

                    {/* entryy year input */}
                    <label htmlFor="email" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        ایمیل
                        <input
                            id="email"
                            name="email"
                            type="text"
                            required
                            value={formData.email}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="rank" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        سطح
                        <input
                            id="rank"
                            name="rank"
                            type="text"
                            required
                            value={formData.rank}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

                    <label htmlFor="subject" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        عنوان
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                </div>
            </form>
            <button onClick={handleAddProfessor} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                ثبت
            </button>
            <button onClick={handleEditProfessor} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                تغییر
            </button>
        </div>
    );
};

export default EditProfessor;
