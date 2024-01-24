import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewStudent, modifyStudent } from "../../../redux/actions/studentAction";

const EditStudent = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const student = useSelector((state) => state.student);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        id: "",
        email: "",
        mobileNumber: "",
        password: "",
        gpa: "",
        department: "",
        field: "",
        entryYear: "",
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
    const validForm = () => {
        if (
            formData.firstName &&
            formData.lastName &&
            formData.id &&
            formData.department &&
            formData.field &&
            formData.entryYear &&
            formData.gpa
        ) {
            return true;
        } else {
            return false;
        }
    };
    const handleSubmitNewForm = () => {
        setLoading(true);
        const authData = {
            body: formData,
            userType: userData?.data?.userType,
        };
        if (validForm()) {
            if (userData?.data?.userType) {
                dispatch(createNewStudent(authData));
                setFormData({
                    firstName: "",
                    lastName: "",
                    id: "",
                    email: "",
                    mobileNumber: "",
                    password: "",
                    gpa: "",
                    department: "",
                    field: "",
                    entryYear: "",
                });
            }
        }

        setLoading(false);
    };

    const handleSubmitEditForm = () => {
        setLoading(true);
        const authData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            id: formData.id,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            gpa: Number(formData.gpa),
            department: formData.department,
            field: formData.field,
            entryYear: Number(formData.entryYear),
            userType: userData?.data?.userType,
        };
        if (validForm()) {
            if (userData?.data?.userType) {
                dispatch(modifyStudent(authData));
            }
        }
        setFormData({
            firstName: "",
            lastName: "",
            id: "",
            email: "",
            mobileNumber: "",
            password: "",
            gpa: "",
            department: "",
            field: "",
            entryYear: "",
        });
        setLoading(false);
    };

    useEffect(() => {
        if (student.isSuccessCreate || student.isSuccessModify) {
            setStatus("موفقیت آمیز");
        }
    }, [student]);

    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-center text-lg mb-5">ثبت/تغییر اطلاعات دانشجو</h1>
            <p className="text-blue-500 font-bold text-base">{loading && "در حال انجام"}</p>
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
                    {/* student number input */}
                    <label htmlFor="id" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        شماره دانشجویی
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
                    {/* goverment id input */}
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

                    {/* goverment id input */}
                    <label htmlFor="mobileNumber" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        شماره تماس
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
                            <option value="معماری">معماری</option>
                            <option value="IT">IT</option>
                        </select>
                    </label>

                    {/* field input */}
                    <label htmlFor="field" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        رشته
                        <select
                            name="field"
                            id="field"
                            value={formData.field}
                            required
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        >
                            <option value="معماری">معماری</option>
                            <option value="IT">IT</option>
                        </select>
                    </label>

                    {/* entry year input */}
                    <label htmlFor="entryYear" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        سال ورود
                        <input
                            id="entryYear"
                            name="entryYear"
                            type="number"
                            required
                            value={formData.entryYear}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>

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

                    {/* goverment id input */}
                    <label htmlFor="gpa" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        معدل
                        <input
                            id="gpa"
                            name="gpa"
                            type="number"
                            required
                            value={formData.gpa}
                            onChange={handleChangeForm}
                            className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                        />
                    </label>
                </div>
            </form>
            <div className="flex flex-row w-full justify-center gap-2">
                <button
                    onClick={handleSubmitNewForm}
                    className="w-[150px] h-[45px] text-lg bg-primary font-semibold shadow-lg rounded-sm my-4"
                >
                    ثبت
                </button>
                <button
                    onClick={handleSubmitEditForm}
                    className="w-[150px] h-[45px] text-lg bg-white border-[2px] border-blue-900 font-semibold shadow-lg rounded-sm my-4"
                >
                    تغییر
                </button>
            </div>
        </div>
    );
};

export default EditStudent;
