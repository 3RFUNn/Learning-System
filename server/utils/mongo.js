import mongoose from "mongoose";
import { seedDormitoryManager, seedItManager, seedLibManager } from "../models/user.model.js";
import { Config } from "../utils/config.js";

const { MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME, MONGO_DB_NAME } = Config;
let database_url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
let test_database_url = `mongodb://localhost:27017/test`;
console.log({ database_url });

export const connectDB = async () => {
    await mongoose
        .connect(Config.NODE_ENV === "test" && process.env.CI ? test_database_url : database_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: Config.NODE_ENV === "test" ? "test" : MONGO_DB_NAME,
        })
        .then(() => {
            console.log("Connected to MongoDB successfully");
            seedItManager();
            seedLibManager();
            seedDormitoryManager();
        })
        .catch((error) => {
            console.log("error in connect mongo => ", error);
        });
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};
