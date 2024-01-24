import { useSelector } from "react-redux";
import { baseImagesUrl } from "../../../../../../configs/globals";
import { userSelector } from "../../../../../../redux/store";

const SidebarAccount = () => {
    const user = useSelector(userSelector);
    return (
        <div className="hidden md:flex justify-end items-center md:justify-start h-auto max-h-12 rounded-md">
            <img
                alt={(user?.firstName || "") + " " + (user?.lastName || "avatar")}
                src={"avatar.png"}
                width={40}
                height={40}
            />
        </div>
    );
};

export default SidebarAccount;
