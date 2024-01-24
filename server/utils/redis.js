import {createClient} from "redis";

export const redisClient = createClient({
    host: "127.0.0.1",
    port: 6379,
});

const redisConnect = async () => {
    try {
        redisClient.on("connect", (err) => {
            console.log("Client connected to Redis...");
        });
        redisClient.on("ready", (err) => {
            console.log("Redis ready to use");
        });
        redisClient.on("error", (err) => {
            console.error("Redis Client", err);
        });
        redisClient.on("end", () => {
            console.log("Redis disconnected successfully");
        });
        await redisClient.connect();
    } catch (error) {
        console.log("error in connect to redis");
    }
};

// redisConnect();

export const redisSet = async (key, value) => {
    return await redisClient.set(key, value);
};

export const redisDelete = async (key) => {
    return await redisClient.del(key);
};

export const redisGet = async (key) => {
    return await redisClient.get(key);
};

export const redisSetExpireTime = async (key, time) => {
    await redisClient.expire(key, +time);
};

export const redisSetToken = async (id, token, time) => {
    await redisSet(id, token);
    await redisSetExpireTime(id, time);
};

export const redisGetToken = async (id) => {
    return await redisGet(id);
};
