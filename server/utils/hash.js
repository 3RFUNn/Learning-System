import crypto from "crypto";
import { Config } from "./config.js";

export const generatePasswordHash = async (password) => {
    return crypto.createHash("sha256", Config.HASHSALT).update(password).digest("hex");
};

export const comparePasswordHash = async (hash, password) => {
    return hash === crypto.createHash("sha256", Config.HASHSALT).update(password).digest("hex");
};
