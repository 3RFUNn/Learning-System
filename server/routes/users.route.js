import {Router} from "express";
import {
    getStudentHandler,
    addEDUManagerHandler,
    addITManagerHandler,
    addProfessorHandler,
    addStudentHandler,
    deleteITManagerHandler,
    deleteProfessorHandler,
    deleteStudentHandler,
    editITManagerHandler,
    editProfessorHandler,
    editStudentHandler,
    getEDUManagersHandler,
    getITManagerHandler,
    getITManagersHandler,
    getProfessorHandler,
    getProfessorsHandler,
    editEDUManagerHandler,
    deleteEDUManagerHandler,
    getEDUManagerHandler,
    getStudentsHandler,
    addProfessorsHandler,
    addStudentsHandler,
    addEDUManagersHandler,
} from "../controllers/users.controller.js";
import {authenticateToken} from "../utils/jwt.js";

const usersRouter = Router();

usersRouter.get("/admin/students", authenticateToken, getStudentsHandler);
usersRouter.post("/admin/Professor", authenticateToken, addProfessorHandler);
usersRouter.post("/admin/Professors", authenticateToken, addProfessorsHandler);
usersRouter.put(
    "/admin/Professor/:id",
    authenticateToken,
    editProfessorHandler,
);
usersRouter.delete(
    "/admin/Professor/:id",
    authenticateToken,
    deleteProfessorHandler,
);
usersRouter.get("/admin/Professors", authenticateToken, getProfessorsHandler);
usersRouter.get("/admin/Professor/:id", authenticateToken, getProfessorHandler);

usersRouter.post("/admin/student", authenticateToken, addStudentHandler);
usersRouter.post("/admin/students", authenticateToken, addStudentsHandler);
usersRouter.put("/admin/student/:id", authenticateToken, editStudentHandler);
usersRouter.delete(
    "/admin/student/:id",
    authenticateToken,
    deleteStudentHandler,
);
usersRouter.get("/admin/student", authenticateToken, getStudentHandler);
usersRouter.get("/admin/student/:id", authenticateToken, getStudentHandler);

usersRouter.post("/admin/manager", authenticateToken, addEDUManagerHandler);
usersRouter.post("/admin/managers", authenticateToken, addEDUManagersHandler);
usersRouter.put("/admin/manager/:id", authenticateToken, editEDUManagerHandler);
usersRouter.delete(
    "/admin/manager/:id",
    authenticateToken,
    deleteEDUManagerHandler,
);
usersRouter.get("/admin/managers", authenticateToken, getEDUManagersHandler);
usersRouter.get("/admin/manager/:id", authenticateToken, getEDUManagerHandler);

usersRouter.get("/students", authenticateToken, getStudentsHandler);
usersRouter.get("/student/:id", authenticateToken, getStudentHandler);
usersRouter.get("/Professors", authenticateToken, getProfessorsHandler);
usersRouter.get("/Professor/:id", authenticateToken, getProfessorHandler);

usersRouter.put("/student/:id", authenticateToken, editStudentHandler);

export default (app) => {
    app.use("/", usersRouter);
};
