import {Router} from "express";

import {
    addCourseToTermHandler,
    addTermHandler,
    addUserToTermHandler,
    deleteTermHandler,
    editTermHandler,
    getCoursesPreRegistrationsForTermHandler,
    getCoursesRegistrationsForTermHandler,
    getTermHandler,
    getTermPreRegisterationCoursesHandler,
    getTermRegisterationCoursesHandler,
    getTermsHandler,
    removeCourseFromTermHandler,
    removeUserFromTermHandler,
} from "../controllers/terms.controller.js";
import {authenticateToken} from "../utils/jwt.js";

const termsRouter = Router();

termsRouter.get("/terms", authenticateToken, getTermsHandler);
termsRouter.get("/term/:id", authenticateToken, getTermHandler);
termsRouter.post("/term", authenticateToken, addTermHandler);
termsRouter.put("/term/:id", authenticateToken, editTermHandler);
termsRouter.delete("/term/:id", authenticateToken, deleteTermHandler);

termsRouter.post(
    "/term/:id/preregistration",
    authenticateToken,
    addCourseToTermHandler,
);
termsRouter.get(
    "/term/:id/preregistration_courses",
    authenticateToken,
    getTermPreRegisterationCoursesHandler,
);
termsRouter.delete(
    "/term/:id/preregistration",
    authenticateToken,
    removeCourseFromTermHandler,
);

termsRouter.post(
    "/term/:id/registration",
    authenticateToken,
    addCourseToTermHandler,
);
termsRouter.get(
    "/term/:id/registration_courses",
    authenticateToken,
    getTermRegisterationCoursesHandler,
);
termsRouter.delete(
    "/term/:id/registration",
    authenticateToken,
    removeCourseFromTermHandler,
);

termsRouter.get(
    "/term/:id/preregistrations",
    authenticateToken,
    getCoursesPreRegistrationsForTermHandler,
);

termsRouter.get(
    "/term/:id/registrations",
    authenticateToken,
    getCoursesRegistrationsForTermHandler,
);

export default (app) => {
    app.use("/", termsRouter);
};