import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./card/UserCard";

const userOfTerm = [
    {
        id: 1,
        firstName: "Sam smith",
    },
    {
        id: 2,
        firstName: "john weaver",
    },
    {
        id: 3,
        firstName: "Ben stock",
    },
];

const ProfessorTerms = () => {
    const navigate = useNavigate();

    const [menuRoute, setMenuRoute] = useState(0);
    const [currentTerm, setCurrentTrerm] = useState("");
    const termData = useSelector((state) => state.term);

    useEffect(() => {
        setCurrentTrerm(window.location?.pathname?.split("/")[3]);
    }, []);

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
                    <p>تعداد کل ثبت نامی ها: 3</p>
                </div>
            )}
            <div className="flex flex-row flex-wrap justify-start items-start">
                {userOfTerm?.map((user) => (
                    <UserCard cardData={user} />
                ))}
            </div>
        </div>
    );
};

export default ProfessorTerms;
