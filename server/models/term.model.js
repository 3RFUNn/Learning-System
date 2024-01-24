import mongoose_client from "mongoose";
const Schema = mongoose_client.Schema;

const TermSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    courses: {
        type: [{ type: Schema.Types.ObjectId, ref: "course" }],
        required: true,
        default: [],
    },
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: "user" }],
        required: true,
        default: [],
    },
});

const TermModel = mongoose_client.model("terms", TermSchema);

export const TERM_MODELS = {
    TermModel,
};
