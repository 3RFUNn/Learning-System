const SidebarLogo = () => {
    return (
        <div className="w-full hidden md:flex md:justify-end xl:justify-start content-center items-center">
            <div className="d-inline-block py-2 md:ml-auto xl:m-0">
                <img src={"logo.png"} alt="app logo" layout="intrinsic" height={"40px"} width={"50px"} />
            </div>
        </div>
    );
};

export default SidebarLogo;
