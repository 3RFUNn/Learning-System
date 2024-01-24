import mongoose_client from "mongoose";

const Schema = mongoose_client.Schema;

export const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
    classification: {
        type: String,
        required: true,
    },
    totalCount: {
        type: Number,
        required: true,
        min: 0,
    },
    availableCount: {
        type: Number,
        required: true,
        min: 0,
    },

    borrowedBy: [
        {
            type: mongoose_client.Schema.Types.ObjectId,
            ref: "user", // Assuming your user model is named 'User'
        },
    ],
});

export const BookModel = mongoose_client.model("Book", bookSchema);
