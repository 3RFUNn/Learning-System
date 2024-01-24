import mongoose_client from "mongoose";
const Schema = mongoose_client.Schema;
const options = {discriminatorKey: "kind"};

const CourseSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    prerequisite: {
        type: [String],
        required: true,
    },
    coPrerequisite: {
        type: [String],
        required: true,
    },
    unit: {
        type: Number,
        required: true,
    },
});

const CourseModel = mongoose_client.model("course", CourseSchema);

const TermCourseModel = CourseModel.discriminator(
    "termcourse",
    new Schema({
        classTime: {
            type: String,
        },
        examTime: {
            type: String,
        },
        examLocation: {
            type: String,
        },
        professorName: {
            type: String,
        },
        professorId: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
        },
        term: {
            type: String,
        },
        students: {
            type: [String],
            default: [],
        },
    }),
    options,
);

const CourseRegistrationSchema = new Schema({
    term: {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
        required: true,
        default: [],
    },
    student: {
        type: String,
        required: true,
    },
});

const CourseRegistrationModel = mongoose_client.model(
    "courseregistration",
    CourseRegistrationSchema,
);

const CoursePreRegistrationSchema = new Schema({
    term: {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
        required: true,
        default: [],
    },
    student: {
        type: String,
        required: true,
    },
});

const CoursePreRegistrationModel = mongoose_client.model(
    "coursepreregistration",
    CoursePreRegistrationSchema,
);

export const COURSE_MODELS = {
    CourseSchema,
    CourseModel,
    TermCourseModel,
    CourseRegistrationModel,
    CoursePreRegistrationModel,
};
