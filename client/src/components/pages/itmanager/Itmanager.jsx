import React, { useEffect, useState } from "react";
import UserCard from "../../card/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { getManagersList } from "../../../redux/actions/managerAction";
import { getProfessorList } from "../../../redux/actions/professorAction";
import { extractTokenData } from "../../../redux/reducers/user-slice";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getRooms } from "../../../redux/actions/roomAction";
import { AllRooms } from "../rooms/AllRooms";
import { Books } from "../books/books";
import { getBooks, getBorrowedBooks } from "../../../redux/actions/bookAction";
import { StudentsTable } from "../student/StudentsTable";
import { getStudent } from "../../../redux/actions/studentAction";

const Itmanager = ({ menuRoute }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const managersData = useSelector((state) => state.manager);
    const professorsData = useSelector((state) => state.professor);
    const user = useSelector((state) => state.user);

    const [file, setFile] = useState();
    const [managerName, setManagerName] = useState("");
    const [professorName, setProfessorName] = useState("");

    useEffect(() => {
        dispatch(getRooms());
    }, []);

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    useEffect(() => {
        dispatch(getBorrowedBooks());
    }, []);

    useEffect(() => {
        dispatch(getStudent());
    }, []);

    useEffect(() => {
        if (user.token) {
            dispatch(extractTokenData());
        }
    }, [dispatch, user.token]);

    const handleSearchProfessor = (e) => {
        e.preventDefault();

        const authData = {
            userType: user?.data?.userType,
            name: professorName,
        };
        dispatch(getProfessorList(authData));
    };

    const handleSearchManager = (e) => {
        e.preventDefault();

        const authData = {
            userType: user?.data?.userType,
            firstName: managerName,
        };
        dispatch(getManagersList(authData));
    };

    const handleClickAddBtn = () => {
        navigate("/admin/profile/");
    };

    return (
        <div className="w-full bg-gray-100 h-full">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full flex flex-row items-center justify-between h-[60px] px-3 border-b-[1px] bg-gray-100 border-r-none sm:border-r-[1px] border-gray-200">
                {/* route address */}
                <p className="text-black">
                    {(() => {
                        switch (menuRoute) {
                            case 1:
                                return "مشاهده لیست دانشجویان";
                            case 2:
                                return "مشاهده لیست اساتید";
                            case 3:
                                return "مشاهده لیست مدیران";
                            case 4:
                                return "مشاهده لیست کتاب ها";
                            case 5:
                                return "مشاهده لیست اتاق ها";
                        }
                    })()}
                </p>
                <button
                    onClick={handleClickAddBtn}
                    className="font-medium  text-blue-800 border-[1px] border-blue-800 rounded-xl px-2 shadow-lg"
                >
                    {"پنل مدیریت"}
                </button>
            </div>

            {/* content of lists */}
            <section className="bg-white h-full">
                {/* list topbar actions */}
                <div className="pb-2 pt-2 h-full">
                    {menuRoute === 2 ? (
                        <div className="flex flex-row-reverse items-center justify-between p-2 w-full">
                            {/* upload excel file */}
                            <label htmlFor="file" className="bg-primary px-3 py-1 rounded-xl shadow-lg  cursor-pointer">
                                آپلود اکسل
                                <input className="hidden" id="file" type="file" name="file" />
                            </label>
                            {/* search by name */}

                            <form onSubmit={handleSearchProfessor}>
                                <input
                                    className="w-[180px] text-gray-800 py-1 px-2  rounded-sm bg-transparent border-primary border-[1px] shadow-md"
                                    type="text"
                                    name="searchName"
                                    placeholder={`جست و جو بر اساس نام استاد`}
                                    value={professorName}
                                    onChange={(e) => setProfessorName(e.target.value)}
                                />
                            </form>
                        </div>
                    ) : menuRoute === 3 ? (
                        <div className="flex flex-row-reverse items-center justify-between p-2 w-full">
                            {/* upload excel file */}
                            <label
                                htmlFor="file"
                                className="bg-primary text-white px-3 shadow-lg py-1 rounded-xl  cursor-pointer"
                            >
                                آپلود اکسل
                                <input
                                    className="hidden"
                                    id="file"
                                    type="file"
                                    name="file"
                                    accept=".excel"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            {/* search by name */}
                            <form onSubmit={handleSearchManager}>
                                <input
                                    className="w-[180px] text-gray-800 py-1 px-2 shadow-md  rounded-sm bg-transparent border-primary border-[1px]"
                                    type="text"
                                    name="searchName"
                                    placeholder={`جست و جو بر اساس نام مدیر`}
                                    value={managerName}
                                    onChange={(e) => setManagerName(e.target.value)}
                                />
                            </form>
                        </div>
                    ) : null}
                </div>
                {/* result items */}
                <div className="py-2 px-4  flex flex-row flex-wrap justify-start items-start bg-white">
                    {/* professor list */}
                    {menuRoute === 2 &&
                        professorsData?.professors?.map((item) => (
                            <UserCard type="professor" key={item?.id} cardData={item} />
                        ))}

                    {/* manager list */}
                    {menuRoute === 3 &&
                        managersData?.managers?.map((item) => (
                            <UserCard type="manager" key={item?.id} cardData={item} />
                        ))}
                </div>
                {(() => {
                    switch (menuRoute) {
                        case 1:
                            return (
                                <div className="p-4">
                                    <StudentsTable />
                                </div>
                            );
                        case 2:
                            return (
                                <p className="w-[100px]  text-center mx-auto cursor-pointer text-blue-300">
                                    مشاهده بیشتر
                                </p>
                            );
                        case 3:
                            return (
                                <p className="w-[100px]  text-center mx-auto cursor-pointer text-blue-300">
                                    مشاهده بیشتر
                                </p>
                            );
                        case 4:
                            return <Books />;
                        case 5:
                            return <AllRooms />;
                    }
                })()}
            </section>
        </div>
    );
};

export default Itmanager;
