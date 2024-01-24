import mongoose_client from "mongoose";
const Schema = mongoose_client.Schema;

const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const DepartmentModel = mongoose_client.model("term", DepartmentSchema);

export const DEPARTMENT_MODELS = {
    DepartmentModel,
};
