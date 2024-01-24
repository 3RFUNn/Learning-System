import { loginUser, registerUser } from "./auth.action.js";
import { ZodError, z } from "zod";
export const registerUserHandler = async (req, res) => {
    try {
        console.log("register =>", req?.body);
        const token = await registerUser(req?.body, req?.params?.type === "true");
        if (token) {
            res.status(200)
                .setHeader("Authorization", `Bearer ${token}`)
                .json({
                    data: token,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {});
        } else {
            res.status(400)
                .json({
                    data: token,
                    status: 400,
                    error: "invalid data",
                    ok: false,
                    message: "error in register",
                })
                .end(() => {});
        }
    } catch (error) {
        console.log("error =>", error);
        res.status(400).json({
            data: null,
            status: 400,
            error: error,
            ok: false,
            message: "error in register",
        });
    }
};

export const loginUserHandler = async (req, res) => {
    try {
        const validatedData = z.object({ id: z.string(), password: z.string().min(8) }).parse(req.body);

        console.log(validatedData.id);
        console.log(validatedData.password);
        const token = await loginUser(validatedData.id, validatedData.password);
        console.log(token);
        if (token) {
            res.setHeader("Authorization", `Bearer ${token}`)
                .status(200)
                .json({
                    data: token,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {});
            return;
        } else {
            res.status(400)
                .json({
                    data: token,
                    status: 400,
                    error: "invalid data",
                    ok: true,
                    message: "error in login",
                })
                .end(() => {});
            return;
        }
    } catch (error) {
        console.log("error => ", error);
        res.status(400)
            .json({
                data: null,
                status: 400,
                error: error,
                ok: true,
                message: error instanceof ZodError ? error.issues[0].message : "error in login",
            })
            .end(() => {});
        return;
    }
};
