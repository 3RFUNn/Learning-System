import {Router} from "express";
import {
    loginUserHandler,
    registerUserHandler,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/login", loginUserHandler);
// authRouter.post("/register", registerUserHandler);
// authRouter.post("/register/:type", registerUserHandler);

export default (app) => {
    app.use("/", authRouter);
};
