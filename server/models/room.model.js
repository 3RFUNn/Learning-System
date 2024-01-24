import mongoose_client from "mongoose";
import mongoose from "mongoose";
const roomSchema = new mongoose_client.Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    currentResidents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "student", // Assuming your student model is named 'Student'
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
});

export const RoomModel = mongoose.model("Room", roomSchema);
