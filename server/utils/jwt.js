import jwt from "jsonwebtoken";
// import {redisGetToken} from "./redis.js";
import { Config } from "../utils/config.js";
export const authenticateToken = (req, res, next) => {
    const route = req.path;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, Config.JWT_SECRET, (err, authData) => {
        if (err) {
            console.log({ err });

            res.status(403).json({
                data: null,
                error: err,
                message: "token authentication error",
                ok: false,
            });
            return;
        } else if (authData.userType !== "itmanager" && route.startsWith("/admin/")) {
            res.status(403).json({
                data: null,
                error: "access denied",
                message: "you don't have required permissions",
                ok: false,
            });
            return;
        }
        req.authData = authData;
        next();
    });
};

export const TOKEN_EXPIRE_TIME_DAYS = 30;

export const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, Config.JWT_SECRET, {
            expiresIn: `${TOKEN_EXPIRE_TIME_DAYS} days`,
        });
        console.log("token => ", token, Config.JWT_SECRET);
        return token;
    } catch (error) {
        console.error(error);
    }
};
