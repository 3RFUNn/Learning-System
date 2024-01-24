import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "../../../redux/actions/register/LoginAction";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedInSuccess = useSelector((state) => state.user);

    const [registerForm, setRegisterForm] = useState({
        id: "",
        password: "",
    });
    const [error, setError] = useState("");

    /* func for handle change of username and password iuputs */
    const changeInputHandler = (event) => {
        const { name, value } = event.target;
        setRegisterForm((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    };

    const validityCheckForm = () => {
        /* check username */
        if (!registerForm.id || registerForm.id.length < 4) {
            // send notif
            return false;
        }
        /* check password */
        if (!registerForm.password || registerForm.password.length < 4) {
            // send notif
            return false;
        }
        return true;
    };

    const submitRegisterForm = (e) => {
        e.preventDefault();
        toast.loading("در حال احراز هویت لطفا صبور باشید", {
            duration: 2000,
        });
        if (validityCheckForm()) {
            const res = dispatch(submitLogin(registerForm));
            if (res.type === "error") {
                setError(res?.txt);
            }
        } else {
            toast.error("اطلاعات ورودی نامعتبر است", {
                duration: 1000,
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (isLoggedInSuccess?.isLoggedIn && isLoggedInSuccess?.data?.userType && token) {
            toast.success("ورود با موفقیت انجام شد. در حال انتقال", {
                duration: 2000,
            });
            setTimeout(() => {
                if (isLoggedInSuccess?.data?.userType === "itmanager") {
                    window.location.replace("/admin/");
                }
                if (isLoggedInSuccess?.data?.userType === "edumanager") {
                    navigate("/edumanager/");
                }
                if (isLoggedInSuccess?.data?.userType === "student") {
                    navigate("/student/");
                }
                if (isLoggedInSuccess?.data?.userType === "professor") {
                    navigate("/professor/");
                }
            }, 2000);
        }
    }, [isLoggedInSuccess, navigate]);

    return (
        <div className="flex w-full h-full flex-col-reverse lg:flex-row-reverse">
            <Toaster position="top-center" reverseOrder={false} />
            {/* box for form */}
            <div className="bg-light-primary h-[50vh] lg:h-[100vh] lg:w-[50vw]">
                <form className="h-full flex flex-col items-center justify-center">
                    {/* username input */}
                    <input
                        className="w-[250px] border-[1px] border-dark rounded-md px-4 py-2 text-lg"
                        type="text"
                        name="id"
                        id="id"
                        placeholder="نام کاربری"
                        min={4}
                        required
                        value={registerForm.id}
                        onChange={changeInputHandler}
                    />
                    {/* password input */}
                    <input
                        className="w-[250px] border-[1px] border-dark rounded-md px-4 py-2 my-2 text-lg"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="رمز عبور"
                        min={4}
                        required
                        value={registerForm.password}
                        onChange={changeInputHandler}
                    />
                    {/* btn for send register request */}
                    <button
                        className="w-[250px] h-[45px] bg-dark text-white text-xl rounded-md my-4 "
                        type="submit"
                        onClick={submitRegisterForm}
                    >
                        ورود
                    </button>
                </form>
            </div>

            {/* box for introduce or show some text */}
            <div className="h-[50vh] lg:h-[100vh] w-full lg:w-[50vw] bg-register-intro-sm lg:bg-register-intro-lg flex items-center justify-center">
                {error ? <p>{error}</p> : <h1 className="text-3xl">خوش آمدید</h1>}
            </div>
        </div>
    );
};

export default Login;
