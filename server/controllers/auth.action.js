import models from "../models/index.js";
import { comparePasswordHash, generatePasswordHash } from "../utils/hash.js";
import { generateAccessToken } from "../utils/jwt.js";
import { validateUser } from "../utils/validator.js";
import mongoose from "mongoose";
const { UserModel, EduManagerModel, ItManagerModel, ProfessorModel, StudentModel } = models;

export const loginUser = async (id = "", password = "") => {
    try {
        console.log("login =>", id, password);

        let userQuery = {};

        if (mongoose.isValidObjectId(id)) {
            userQuery._id = id;
        } else {
            userQuery = {
                $or: [
                    {
                        email: id,
                    },
                    {
                        studentNumber: {
                            $exists: true,
                            $eq: id,
                        },
                    },
                ],
            };
        }

        const user = await UserModel.findOne();
        console.log("in " + user);
        if (!(await comparePasswordHash(user.password, password))) return null;
        const token = generateAccessToken({
            id: user._id,
            email: user.email,
            userType: user.__t,
        });
        return token;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const registerUser = async (registerData, type = "") => {
    try {
        // Validate Email and Password
        if (validateUser(registerData)) {
            // Check if account already exists
            const existingUser = await UserModel.findOne({
                id: registerData.id,
            });
            if (!existingUser) {
                // Create user
                let model;
                switch (type) {
                    case "student":
                        model = StudentModel;
                        break;
                    case "professor":
                        model = ProfessorModel;
                        break;
                    case "edumanager":
                        model = EduManagerModel;
                        break;
                    case "itmanager":
                        model = ItManagerModel;
                        break;
                    default:
                        model = UserModel;
                        break;
                }
                const newUser = new model({
                    ...registerData,
                    password: await generatePasswordHash(registerData.password),
                });
                await newUser.save();
                const token = generateAccessToken({
                    id: newUser.id,
                    email: newUser.email,
                    userType: newUser.__t,
                });
                return token;
            }
        }
        return null;
    } catch (error) {
        console.log("error => ", error);
        return null;
    }
};
