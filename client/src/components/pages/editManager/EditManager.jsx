import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewManager, modifyManager } from "../../../redux/actions/managerAction";

const EditManager = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const manager = useSelector((state) => state.manager);
    const [status, setStatus] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        id: "",
        govermantId: "",
        password: "",
        department: "IT",
        mobileNumber: "",
        email: "",
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

    const handleEditManager = () => {
        dispatch(modifyManager(formData));
    };
    const handleNewManager = () => {
        const authData = {
            body: formData,
            userType: user?.data?.userType?.userType,
        };
        dispatch(createNewManager(authData));
    };

    useEffect(() => {
        if (manager.isSuccessCreate || manager.isSuccessModify) {
            setStatus("موفقیت آمیز");
        }
    }, [manager]);
    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-center text-lg mb-5">ثبت/تغییر اطلاعات مدیر آموزشی</h1>
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
                    {/* goverment id input */}
                    <label htmlFor="govermantId" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                        شماره ملی
                        <input
                            id="govermantId"
                            name="govermantId"
                            type="text"
                            required
                            value={formData.govermantId}
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

                    {/* TA input */}
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
            </form>
            <button onClick={handleNewManager} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                ثبت
            </button>
            <button onClick={handleEditManager} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                تغییر
            </button>
        </div>
    );
};

export default EditManager;
