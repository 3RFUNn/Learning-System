import { models } from "../models/index.js";
import mongoose from "mongoose";
const resUnauthorized = (res) => {
    res.status(403).json({
        data: null,
        status: 403,
        error: "access denied",
        ok: false,
        message: "you don't have permission",
    });
};

const resNotFound = (res, name) => {
    res.status(404).json({
        data: null,
        status: 404,
        error: name + " not found",
        ok: false,
        message: name + " not found with the provided ID",
    });
};

const resInternalServerError = (res) => {
    res.status(500).json({
        data: null,
        status: 500,
        ok: false,
        message: "Internal Server Error",
    });
};

const resBadRequest = (res) => {
    res.status(400).json({
        data: null,
        status: 400,
        ok: false,
        message: "Bad Request",
    });
};

export const getRoomsHandler = async (req, res) => {
    try {
        const { roomNumber, capacity, isActive, sortBy, sortOrder, page = 1, pageSize = 10 } = req.query;

        let query = {};

        if (roomNumber) {
            query.roomNumber = roomNumber;
        }

        if (capacity) {
            query.capacity = capacity;
        }

        if (isActive !== undefined) {
            query.isActive = isActive === "true";
        }

        const sortOptions = {};

        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
        }

        const rooms = await models.RoomModel.find(query)
            .sort(sortOptions)
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize))
            .populate("currentResidents")
            .exec();

        const totalCount = await models.RoomModel.countDocuments(query);

        const totalPages = Math.ceil(totalCount / pageSize);

        res.status(200).json({
            data: rooms,
            status: 200,
            error: null,
            ok: true,
            message: "",
            pagination: {
                page: Number(page),
                pageSize: Number(pageSize),
                totalCount,
                totalPages,
            },
        });
    } catch (error) {
        console.error(error);
        resInternalServerError(res);
    }
};

export const addStudentToRoomHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentIds } = req.body;

        // Your existing logic to validate user access

        if (studentIds.length === 0) return res.sendStatus(400);

        const room = await models.RoomModel.findById(id).populate("currentResidents").exec();

        if (!room) {
            resNotFound(res, "Room");
            return;
        }

        if (room.currentResidents.map((_) => _.studentNumber).includes(studentIds[0])) return resBadRequest(res);

        const students = await models.StudentModel.find({
            studentNumber: { $in: studentIds },
        }).exec();

        if (students.length === 0) resBadRequest(res);

        if (!students) {
            resNotFound(res, "Student");
            return;
        }

        // Add residents to the room
        room.currentResidents = [...room.currentResidents, ...students];
        await room.save();

        res.status(200).json({
            data: room,
            status: 200,
            error: null,
            ok: true,
            message: "Residents added to room successfully",
        });
    } catch (error) {
        console.error(error);
        resInternalServerError(res);
    }
};

export const removeStudentFromRoomHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId } = req.query;

        // Your existing logic to validate user access

        if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(studentId)) resBadRequest(res);

        const room = await models.RoomModel.findById(id).populate("currentResidents").exec();

        if (!room) {
            resNotFound(res, "Room");
            return;
        }

        // Remove student from the room
        room.currentResidents = room.currentResidents.filter((resident) => {
            console.log(resident._id.toString(), studentId);
            return resident._id.toString() !== studentId;
        });

        await room.save();

        res.status(200).json({
            data: room,
            status: 200,
            error: null,
            ok: true,
            message: "Student removed from room successfully",
        });
    } catch (error) {
        console.error(error);
        resInternalServerError(res);
    }
};

export const toggleActiveStatusHandler = async (req, res) => {
    const accessAllowedTo = ["itmanager", "dormitorymanager"]; // You may need to update this based on your application's requirements

    try {
        const { roomId } = req.body;
        const user = req?.authData;

        if (!accessAllowedTo.includes(user?.userType)) resUnauthorized(res);

        const room = await models.RoomModel.findById(roomId);

        if (!room) resNotFound(res, "Room");

        room.isActive = !room.isActive;

        await room.save();

        res.status(200).json({
            data: room,
            status: 200,
            error: null,
            ok: true,
            message: "Room successfully deactivated",
        });
    } catch (error) {
        console.error(error);
        resInternalServerError(res);
    }
};
