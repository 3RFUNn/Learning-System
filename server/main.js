import express from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./swagger.json" assert { type: "json" };
import addUserRouter from "./routes/users.route.js";
import addAuthRouter from "./routes/auth.route.js";
import addCourseRouter from "./routes/courses.route.js";
import addTermRouter from "./routes/terms.route.js";
import addBookRouter from "./routes/book.route.js";
import addRoomRouter from "./routes/room.route.js";
import "./utils/mongo.js";
import { connectDB } from "./utils/mongo.js";
dotenv.config({ path: "./.env" });

const main = async () => {
    await connectDB();
    const app = express();
    app.use(cors({ origin: "*" }));
    app.use(morgan("tiny"));
    app.use(express.json());
    app.use(express.static(path.join(".", "public")));
    addAuthRouter(app);
    addUserRouter(app);
    addCourseRouter(app);
    addTermRouter(app);
    addBookRouter(app);
    addRoomRouter(app);
    app.use(
        "/docs",
        swaggerUI.serve,
        swaggerUI.setup({
            ...swaggerDoc,
            host: process.env.NODE_ENV === "production" ? "45.149.76.227:4000" : "localhost:4000",
        })
    );
    app.listen(process.env.PORT || 4000, () => {
        console.log(`port => ${process.env.PORT || 4000}`);
    });
};

main();
