import { Outlet } from "react-router-dom";
import DefaultMainLayout from "./main/main-layout";
import { useSelector } from "react-redux";

const DefaultLayout = ({ userType }) => {
    const loggedInData = useSelector((state) => state.user);
    return (
        <div>
            <DefaultMainLayout userType={userType}>
                <Outlet />
            </DefaultMainLayout>
        </div>
    );
};

export default DefaultLayout;
