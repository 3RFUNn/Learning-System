import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layouts/default/layout";
import Login from "./components/pages/login/Login";
import ItmanagerProfile from "./components/pages/itmanager/ItmanagerProfile";
import EditTerm from "./components/pages/editTerm/EditTerm";
import AddTerm from "./components/pages/addTerm/AddTerm";
import AddCourseForm from "./components/addcourse/AddCourseForm";
import RegisterdCourses from "./components/pages/registerdCourses/RegisterdCourses";
import StudentTerms from "./components/studentTerms/StudentTerms";
import { Suspense, useState } from "react";
import ProfessorTerm from "./components/ProfessorTerm";
import "./index.css";
import { Toaster } from "react-hot-toast";

function App() {
    const [hasPermission, setHasPermission] = useState(true);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/admin",
            element: hasPermission ? <DefaultLayout userType="itmanager" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/admin/profile/",
            element: hasPermission ? <ItmanagerProfile /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/student",
            element: hasPermission ? <DefaultLayout userType="student" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/student/term/:id",
            element: hasPermission ? <StudentTerms userType="student" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/edumanager",
            element: hasPermission ? <DefaultLayout userType="edumanager" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/edumanager/term/:id",
            element: hasPermission ? <EditTerm userType="edumanager" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/edumanager/term",
            element: hasPermission ? <AddTerm userType="edumanager" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/edumanager/course",
            element: hasPermission ? <AddCourseForm userType="edumanager" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/edumanager/course/:id",
            element: hasPermission ? <RegisterdCourses userType="edumanager" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/professor",
            element: hasPermission ? <DefaultLayout userType="professor" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/professor/term/:id",
            element: hasPermission ? <ProfessorTerm userType="professor" /> : <Navigate to="/login" />,
            errorElement: <div></div>,
        },
        {
            path: "/login",
            element: <Login />,
            errorElement: <div></div>,
        },
    ]);

    return (
        <>
            <Suspense fallback={<h1>laoding...</h1>}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                    <Toaster />
                </Provider>
            </Suspense>
        </>
    );
}

export default App;
