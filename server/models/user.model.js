import mongoose_client from "mongoose";
import { generatePasswordHash } from "../utils/hash.js";
import { z } from "zod";
const Schema = mongoose_client.Schema;
const options = { discriminatorKey: "kind" };
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
});

//Create Approved Course Schema

const UserModel = mongoose_client.model("user", UserSchema);

const StudentModel = UserModel.discriminator(
    "student",
    new Schema({
        level: {
            type: String,
        },
        entryYear: {
            type: Number,
        },

        studentNumber: {
            type: String,
        },

        entryTerm: {
            type: String,
        },
        gpa: {
            type: Number,
            required: true,
        },
        courses: {
            type: [String],
            default: [],
        },
        supervisor: {
            type: String,
        },
        borrowedBooks: [
            {
                book: {
                    type: mongoose_client.Schema.Types.ObjectId,
                    ref: "Book",
                },
                borrowedDate: {
                    type: Date,
                    default: Date.now,
                },
                returnDate: {
                    type: Date,
                },
            },
        ],
    }),
    options
);

const ProfessorModel = UserModel.discriminator(
    "professor",
    new Schema({
        department: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        rank: {
            type: Number,
            required: true,
        },
        courses: {
            type: [String],
            default: [],
        },
    }),
    options
);

export const InsertProfessorValidator = z.object({
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8),
    email: z.string().email(),
    mobileNumber: z.string().length(11),
    department: z.string(),
    subject: z.string(),
    rank: z.number().positive(),
    courses: z.string().array(),
});

export const EditProfessorValidator = InsertProfessorValidator.partial();

const EduManagerModel = UserModel.discriminator(
    "edumanager",
    new Schema({
        department: {
            type: String,
            required: true,
        },
    }),
    options
);

const ItManagerModel = UserModel.discriminator("itmanager", new Schema({}));

const LibManagerModel = UserModel.discriminator("libmanager", new Schema({}));

const DormitoryManagerModel = UserModel.discriminator("dormitorymanager", new Schema({}));

export const seedItManager = async () => {
    const ITMAN = await ItManagerModel.findOne({
        email: "admin@gmail.com",
    }).exec();
    if (!ITMAN) {
        const itManager = new ItManagerModel({
            firstName: "admin",
            lastName: "admin",
            password: await generatePasswordHash("AdminPass123"),
            email: "admin@gmail.com",
            mobileNumber: "09123456789",
        });
        await itManager.save();
        console.log("it man added", itManager);
    } else {
        console.log("it man exists => ", ITMAN);
    }
};

export const seedLibManager = async () => {
    const libManager = await LibManagerModel.findOne({
        email: "lib_admin@gmail.com",
    });
    if (!libManager) {
        const libManager = new LibManagerModel({
            firstName: "lib manager",
            lastName: "lib manager",
            password: await generatePasswordHash("AdminPass123"),
            email: "lib_admin@gmail.com",
            mobileNumber: "09123456798",
        });

        await libManager.save();
        console.log("Lib Manager Added", libManager);
    } else {
        console.log("Lib Manager Exists => ", libManager);
    }
};

export const seedDormitoryManager = async () => {
    const dormManager = await DormitoryManagerModel.findOne({
        email: "dorm_manager@gmail.com",
    });
    if (!dormManager) {
        const dorm_manager = new DormitoryManagerModel({
            firstName: "dorm manager",
            lastName: "dorm manager",
            password: await generatePasswordHash("AdminPass123"),
            email: "dorm_manager@gmail.com",
            mobileNumber: "09123456978",
        });
    }
};

export const USER_MODELS = {
    UserModel,
    EduManagerModel,
    ItManagerModel,
    ProfessorModel,
    StudentModel,
    LibManagerModel,
    DormitoryManagerModel,
};
