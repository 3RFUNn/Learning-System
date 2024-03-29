import NavigationListItem from "./navigation-list-item";
import { ROUTES } from "./navigation-routes";

const NavigationList = () => {
    return (
        <div className="w-full h-auto">
            <nav className="w-full h-14 md:h-auto flex flex-row flex-wrap justify-evenly md:justify-center items-center content-center bg-secondary">
                {ROUTES.map((route, index) => (
                    <NavigationListItem key={index} {...route} />
                ))}
            </nav>
        </div>
    );
};

export default NavigationList;
