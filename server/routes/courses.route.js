import {Router} from "express";
import {
    addCourseHandler,
    addStudentToCourseHandler,
    deleteCourseHandler,
    getCourseHandler,
    getCoursesHandler,
    removeStudentFromCourseHandler,
    editCourseHandler,
    addCoursePreRegistrationHandler,
    deleteCoursePreRegistrationHandler,
    addCourseRegistrationHandler,
    deleteCourseRegistrationHandler,
    acceptCourseRegistrationHandler,
    getCoursePreRegistrationsHandler,
    getCourseRegistrationsHandler,
    getCoursePreRegistrationHandler,
    getCourseRegistrationHandler,
    addOneCourseRegistrationHandler,
    deleteOneCourseRegistrationHandler,
    addOneCoursePreRegistrationHandler,
    deleteOneCoursePreRegistrationHandler,
    getCoursePreRegistrationsForTermHandler,
    getCourseRegistrationsForTermHandler
} from "../controllers/courses.controller.js";
import {authenticateToken} from "../utils/jwt.js";
import { getTermRegisterationCoursesHandler } from "../controllers/terms.controller.js";

const courseRouter = Router();

courseRouter.get("/course/:id", authenticateToken, getCourseHandler);
courseRouter.get("/courses", authenticateToken, getCoursesHandler);
courseRouter.post("/course/:isTerm", authenticateToken, addCourseHandler);
courseRouter.put("/course/:id", authenticateToken, editCourseHandler);
courseRouter.delete("/course/:id", authenticateToken, deleteCourseHandler);

courseRouter.post(
    "/course/:id/student",
    authenticateToken,
    addStudentToCourseHandler,
);

courseRouter.delete(
    "/course/:id/student",
    authenticateToken,
    removeStudentFromCourseHandler,
);

courseRouter.get(
    "/course/:id/registrations",
    authenticateToken,
    getTermRegisterationCoursesHandler,
);

courseRouter.post(
    "/course/preregister/:id",
    authenticateToken,
    addOneCoursePreRegistrationHandler,
);

courseRouter.delete(
    "/course/preregister/:id",
    authenticateToken,
    deleteOneCoursePreRegistrationHandler,
);

courseRouter.post(
    "/course/register/:id",
    authenticateToken,
    addOneCourseRegistrationHandler,
);

courseRouter.delete(
    "/course/register/:id",
    authenticateToken,
    deleteOneCourseRegistrationHandler,
);

courseRouter.put(
    "/registration/:id",
    authenticateToken,
    acceptCourseRegistrationHandler,
);

courseRouter.get(
    "/course/:id/preregistrations",
    authenticateToken,
    getCoursePreRegistrationsHandler,
);

courseRouter.get(
    "/course/:id/registrations",
    authenticateToken,
    getCourseRegistrationsHandler,
);

courseRouter.get(
    "/course/:id/preregistration",
    authenticateToken,
    getCoursePreRegistrationHandler,
);

courseRouter.get(
    "/course/:id/registration",
    authenticateToken,
    getCourseRegistrationHandler,
);

export default (app) => {
    app.use("/",courseRouter);
};
