const NavigationListItem = ({ className, href, icon, title, onClick, iconClassName }) => {
    return (
        <a
            className={`w-auto md:w-full ${className} justify-end flex-row-reverse flex-wrap xl:justify-start content-center items-center`}
            onClick={onClick}
            href={href}
        >
            <div className={iconClassName}>{icon}</div>
            <div className="hidden xl:block">{title}</div>
        </a>
    );
};

export default NavigationListItem;
