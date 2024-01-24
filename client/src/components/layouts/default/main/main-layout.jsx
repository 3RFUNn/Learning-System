import { useLocation } from "react-router-dom";
import { getContainerClassName, getSidebarClassName } from "./functions";
import Sidebar from "./sidebar/sidebar";
import Itmanager from "../../../pages/itmanager/Itmanager";
import Student from "../../../pages/student/Student";
import { useEffect, useState } from "react";
import EduManager from "../../../pages/edumanager/EduManager";
import { useDispatch, useSelector } from "react-redux";
import { getManagersList } from "../../../../redux/actions/managerAction";
import { getProfessorList } from "../../../../redux/actions/professorAction";
import { Toaster, toast } from "react-hot-toast";
import { getTermsList } from "../../../../redux/actions/termAction";
import Professor from "../../../pages/professor/Professor";
import { Drawer, Grid } from "antd";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../../../redux/actions/register/LoginAction";
var initialRequest = true;

const DefaultMainLayout = ({ userType }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const studentsData = useSelector((state) => state.student);
    const user = useSelector((state) => state.user);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [menuRoute, setMenuRoute] = useState(1); //for admin page
    const screen = Grid.useBreakpoint();
    useEffect(() => {
        if (initialRequest) {
            const authData = {
                userType: user?.data?.userType,
                page: 0,
                limit: 10,
            };
            if (user.data.userType === "itmanager") {
                dispatch(getManagersList(authData)); // call api to get list of managers
                dispatch(getProfessorList(authData)); // call api to get list of professors
            } else if (user.data.userType === "edumanager") {
                dispatch(getTermsList(authData));
                dispatch(getProfessorList(authData)); // call api to get list of professors
            }
        }

        return () => {
            initialRequest = false;
        };
    }, [dispatch, user]);

    useEffect(() => {
        if (!studentsData?.students?.length) {
            toast.loading("در حال دریافت اطلاعات. لطفا صبور باشید", {
                duration: 3000,
            });
        }
        if (studentsData?.error) {
            toast.error("خطا در دریافت اطلاعات لطفا صحفه را رفرش کنید", {
                duration: 2000,
            });
        }
    }, [studentsData]);

    const handleLogout = () => {
        dispatch(Logout());
        navigate("/login");
    };
    return (
        <>
            <header className="w-full h-14 bg-blue-900 flex justify-center content-center items-center">
                <div className="w-full h-full flex flex-row justify-between items-center px-8">
                    <div className="flex flex-row items-center">
                        {userType === "student" && (
                            <img
                                alt={"name"}
                                src={user}
                                className="w-[50px] h-[50px] border-[1px] border-black rounded-[50%]"
                            />
                        )}
                        {!screen.lg && (
                            <button onClick={() => setIsDrawerOpen(true)}>
                                <MdMenu size={24} className="text-white" />
                            </button>
                        )}
                        <h1 className="px-5 uppercase font-bold text-lg md:text-xl text-white">{userType}</h1>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-[50px] h-[50px] rounded-md text-lg md:text-xl font-medium text-white"
                    >
                        خروج
                    </button>
                </div>
            </header>
            <main>
                <Toaster position="top-center" reverseOrder={false} />
                <section className="w-full flex flex-row justify-evenly flex-nowrap items-start relative min-h-screen p-0 m-0 text-light">
                    {screen.lg ? (
                        <aside
                            className={`w-full bg-gray-100 ${getSidebarClassName(
                                location.pathname,
                            )} fixed bottom-0 z-10 left-0 md:sticky md:top-0 border-r-[1px] border-secondary`}
                        >
                            <Sidebar userType={userType} setMenuRoute={setMenuRoute} />
                        </aside>
                    ) : (
                        <>
                            <Drawer
                                open={isDrawerOpen}
                                styles={{
                                    body: {
                                        padding: "0",
                                    },
                                }}
                                classNames={{
                                    body: "bg-gray-100",
                                    header: "bg-gray-100",
                                }}
                                onClose={() => setIsDrawerOpen(false)}
                                title="منو"
                            >
                                <Sidebar
                                    onClose={() => setIsDrawerOpen(false)}
                                    userType={userType}
                                    setMenuRoute={setMenuRoute}
                                />
                            </Drawer>
                        </>
                    )}
                    <section
                        className={`w-full ${getContainerClassName(
                            location.pathname,
                        )} flex justify-center custom-scrollbar items-center bg-white`}
                    >
                        {userType === "itmanager" ? (
                            <Itmanager menuRoute={menuRoute} />
                        ) : userType === "student" ? (
                            <Student menuRoute={menuRoute} />
                        ) : userType === "edumanager" ? (
                            <EduManager menuRoute={menuRoute} />
                        ) : userType === "professor" ? (
                            <Professor menuRoute={menuRoute} />
                        ) : null}
                    </section>
                </section>
            </main>
        </>
    );
};

export default DefaultMainLayout;
