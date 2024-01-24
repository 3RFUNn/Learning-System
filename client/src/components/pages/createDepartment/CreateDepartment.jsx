import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewDepartment } from "../../../redux/actions/managerAction";

const CreateDepartment = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        fields: "",
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
    const handleCreateDepartment = () => {
        dispatch(createNewDepartment(formData));
    };
    return (
        <div className="w-full flex flex-col items-center">
            <form className="w-full px-5 flex flex-col md:flex-row md:justify-around items-center md:items-start">
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

                <label htmlFor="fields" className="flex flex-col min-w-[215px] min-h-[30px] mb-3">
                    رشته ها
                    <input
                        id="fields"
                        name="fields"
                        type="text"
                        required
                        value={formData.fields}
                        onChange={handleChangeForm}
                        className="border-[1px] border-gray-300 py-1 px-2 rounded-sm"
                    />
                </label>
            </form>
            <button onClick={handleCreateDepartment} className="w-[150px] h-[45px] text-lg bg-primary rounded-sm my-4">
                ثبت تغییرات
            </button>
        </div>
    );
};

export default CreateDepartment;
