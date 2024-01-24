import React, { useEffect, useState } from "react";
import EditStudent from "../editStudent/EditStudent";
import EditProfessor from "../editProfessor/EditProfessor";
import EditManager from "../editManager/EditManager";
import CreateDepartment from "../createDepartment/CreateDepartment";
import { extractTokenData } from "../../../redux/reducers/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ItmanagerProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const [menuRoute, setMenuRoute] = useState(0); // if 0 show empty page on main section
    useEffect(() => {
        if (user.token) {
            dispatch(extractTokenData());
        }
    }, [dispatch, user.token]);

    const handleReturn = () => {
        navigate("/admin");
        document.location.reload();
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-[100dvh]  text-lg">
            {/* side bar for edit route */}
            <aside className="min-w-[200px] h-[250px] md:h-full  bg-gray-200">
                <ul className="flex flex-col items-center sm:items-start px-4 py-2 flex-wrap w-full">
                    <li
                        onClick={() => setMenuRoute(1)}
                        className=" text-lg my-2 cursor-pointer text-blue-700 list-disc mr-1 border-b-[1px] border-gray-300 w-full"
                    >
                        ثبت/تغییر اطلاعات دانشجو
                    </li>
                    <li
                        onClick={() => setMenuRoute(2)}
                        className=" text-lg my-2 cursor-pointer text-blue-700 list-disc mr-1 border-b-[1px] border-gray-300 w-full"
                    >
                        ثبت/تغییر اطلاعات استاد
                    </li>
                    <li
                        onClick={() => setMenuRoute(3)}
                        className=" text-lg my-2 cursor-pointer text-blue-700 list-disc mr-1 border-b-[1px] border-gray-300 w-full"
                    >
                        ثبت/تغییر اطلاعات مدیر آموزش
                    </li>
                    <li
                        onClick={() => setMenuRoute(4)}
                        className=" text-lg my-2 cursor-pointer text-blue-700 list-disc mr-1 border-b-[1px] border-gray-300 w-full"
                    >
                        ایجاد دانشکده
                    </li>
                    <li
                        onClick={handleReturn}
                        className=" text-lg my-2 cursor-pointer text-blue-700 list-disc mr-1 border-b-[1px] border-gray-300 w-full"
                    >
                        خانه
                    </li>
                </ul>
            </aside>
            {/* main edit form */}
            <main className="w-full py-4">
                {menuRoute === 0 && <h1 className=" text-center ">برای ایجاد تغییرات گزینه مورد نطر را انتخاب کنید</h1>}
                {menuRoute !== 0 && (
                    <button onClick={() => setMenuRoute(0)} className="bg-gray-400 text-white px-2 py-1 rounded-l-md">
                        بازگشت
                    </button>
                )}

                {/* edit student ==>1 */}
                {menuRoute === 1 && <EditStudent />}
                {/* edit professor ==>2 */}
                {menuRoute === 2 && <EditProfessor />}
                {/* edit manager ==>3 */}
                {menuRoute === 3 && <EditManager />}
                {/* create departman ==>4 */}
                {menuRoute === 4 && <CreateDepartment />}
            </main>
        </div>
    );
};

export default ItmanagerProfile;
