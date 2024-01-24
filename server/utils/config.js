import dotenv from "dotenv";

dotenv.config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME, JWT_SECRET, NODE_ENV, HASHSALT } =
    process.env;

export const Config = {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB_NAME,
    JWT_SECRET,
    NODE_ENV,
    HASHSALT,
};
