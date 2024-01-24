import React, { useState } from "react";
import PreRigesterCourses from "../../preRigesterCourses/PreRigesterCourses";

const AddTerm = () => {
    const [menuRoute, setMenuRoute] = useState(0);
    return (
        <div className="w-[100dvw] h-[100dvh] flex flex-col items-center">
            {/* handle courses for terms */}
            {menuRoute === 0 && (
                <div className="w-full h-full flex flex-row items-center justify-center">
                    <div
                        onClick={() => setMenuRoute(1)}
                        className="w-[180px] h-[100px] cursor-pointer bg-slate-400 mx-2 rounded-2xl text-lg flex items-center justify-center"
                    >
                        دروس ثبت نامی
                    </div>
                    <div
                        onClick={() => setMenuRoute(2)}
                        className="w-[180px] h-[100px] cursor-pointer bg-slate-400 mx-2 rounded-2xl text-lg flex items-center justify-center"
                    >
                        دروس پیش ثبت نامی
                    </div>
                </div>
            )}

            {/* show content */}
            {menuRoute === 2 && <PreRigesterCourses />}
        </div>
    );
};

export default AddTerm;
