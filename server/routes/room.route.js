import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
    getRoomsHandler,
    addStudentToRoomHandler,
    removeStudentFromRoomHandler,
    toggleActiveStatusHandler,
} from "../controllers/room.controller.js";

export const roomRouter = Router();

roomRouter.get("/rooms", authenticateToken, getRoomsHandler);
roomRouter.post("/rooms/:id/student", authenticateToken, addStudentToRoomHandler);
roomRouter.delete("/rooms/:id/student", authenticateToken, removeStudentFromRoomHandler);
roomRouter.post("/rooms/toggle-active", authenticateToken, toggleActiveStatusHandler);

export default (app) => {
    app.use("/", roomRouter);
};
