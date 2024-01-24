import { useDispatch } from "react-redux";
import { getManagersList } from "../../../../../redux/actions/managerAction";
import { getProfessorList } from "../../../../../redux/actions/professorAction";
import { getTermsList } from "../../../../../redux/actions/termAction";
import jwtDecode from "jwt-decode";

export const adminMenu = [
    {
        type: "itmanager",
        commandNumber: 1,
        title: "مشاهده لیست دانشجویان",
    },
    {
        type: "itmanager",
        commandNumber: 2,
        title: "مشاهده لیست اساتید",
    },
    {
        type: "itmanager",
        commandNumber: 3,
        title: "مشاهده لیست مدیران",
    },
    {
        type: "itmanager",
        commandNumber: 4,
        title: "مشاهده لیست کتاب ها",
    },
    {
        type: "itmanager",
        commandNumber: 5,
        title: "مشاهده لیست اتاق ها",
    },
];
export const eduManagerMenu = [
    {
        type: "manager",
        commandNumber: 1,
        title: "مشاهده لیست ترم ها",
    },
    {
        type: "manager",
        commandNumber: 2,
        title: "مشاهده لیست دانشجویان",
    },
    {
        type: "manager",
        commandNumber: 3,
        title: "مشاهده لیست اساتید",
    },
];
export const studentsMenu = [
    {
        type: "student",
        commandNumber: 1,
        title: "مشاهده لیست ترم ها",
    },
];

export const professorsMenu = [
    {
        type: "professor",
        commandNumber: 1,
        title: "مشاهده لیست ترم ها",
    },
];

export const bookkeeper = [
    {
        type: "bookkeeper",
        commandNumber: 1,
        title: "مشاهده لیست کتاب ها",
    },
];

export const libraryManager = [
    {
        type: "libraryManager",
        commandNumber: 1,
        title: "مشاهده لیست اتاق ها",
    },
];

const Sidebar = ({ userType, setMenuRoute, onClose = () => {} }) => {
    const dispatch = useDispatch();

    const handleUpdateItManagerLists = () => {
        const authData = {
            userType: "itmanager",
            page: 0,
            limit: 10,
        };
        dispatch(getManagersList(authData)); // call api to get list of managers
        dispatch(getProfessorList(authData)); // call api to get list of professors
    };

    const UpdateEduManagerLists = () => {
        const token = localStorage.getItem("token");
        const authData = {
            userType: "edumanager",
            page: 0,
            limit: 10,
            token: token,
        };
        dispatch(getTermsList(authData));
        dispatch(getProfessorList(authData)); // call api to get list of professors
    };

    const UpdateStudentLists = () => {
        const token = localStorage.getItem("token");
        const { id } = jwtDecode(token);

        const authData = {
            userType: "student",
            id: id,
            token: token,
        };
        if (id) {
            dispatch(getTermsList(authData));
        }
    };

    const UpdateProfessorsLists = () => {
        const token = localStorage.getItem("token");
        const { id } = jwtDecode(token);

        const authData = {
            userType: "professor",
            id: id,
            token: token,
        };
        if (id) {
            dispatch(getTermsList(authData));
        }
    };
    return (
        <div className="w-full flex justify-center items-center bg-gray-100 text-blue-800">
            <div className="w-full min-h-0 md:min-h-screen p-2 flex flex-row flex-wrap justify-center content-between items-center">
                <div className="flex flex-col w-full">
                    {userType === "itmanager" &&
                        adminMenu?.map((item, i) => (
                            <li
                                className="list-none text-base my-2 cursor-pointer border-b-[1px] border-gray-300"
                                key={i}
                                onClick={() => (
                                    setMenuRoute(item.commandNumber), handleUpdateItManagerLists(), onClose()
                                )}
                            >
                                {item.title}
                            </li>
                        ))}

                    {userType === "student" &&
                        studentsMenu?.map((item, i) => (
                            <li
                                className="list-none text-base my-2 cursor-pointer"
                                key={i}
                                onClick={(() => setMenuRoute(item.commandNumber), UpdateStudentLists(), onClose())}
                            >
                                {item.title}
                            </li>
                        ))}

                    {userType === "professor" &&
                        professorsMenu?.map((item, i) => (
                            <li
                                className="list-none text-base my-2 cursor-pointer"
                                key={i}
                                onClick={(() => setMenuRoute(item.commandNumber), UpdateProfessorsLists(), onClose())}
                            >
                                {item.title}
                            </li>
                        ))}

                    {userType === "edumanager" &&
                        eduManagerMenu?.map((item, i) => (
                            <li
                                className="list-none text-base my-2 cursor-pointer"
                                key={i}
                                onClick={() => (setMenuRoute(item.commandNumber), UpdateEduManagerLists(), onClose())}
                            >
                                {item.title}
                            </li>
                        ))}

                    {userType === "edumanager" &&
                        eduManagerMenu?.map((item, i) => (
                            <li
                                className="list-none text-base my-2 cursor-pointer"
                                key={i}
                                onClick={() => (setMenuRoute(item.commandNumber), UpdateEduManagerLists())}
                            >
                                {item.title}
                            </li>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
