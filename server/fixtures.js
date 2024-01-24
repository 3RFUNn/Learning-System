import { generatePasswordHash } from "./utils/hash.js";
import { connectDB, disconnectDB } from "./utils/mongo.js";
import mongoose_client from "mongoose";
import roomsMockData from "./mock/rooms.json" assert { type: "json" };
import studentsMockData from "./mock/students.json" assert { type: "json" };
import booksMockData from "./mock/book.json" assert { type: "json" };
// can be async or not

import { models } from "./models/index.js"; // Update with the actual path

const { ItManagerModel, StudentModel, RoomModel, BookModel, UserModel } = models;

export const itManagerData = {
    _id: new mongoose_client.Types.ObjectId(),
    firstName: "it manager",
    lastName: "it manager",
    password: await generatePasswordHash("test_password"),
    mobileNumber: "0916123654987",
    email: "itmanager@gmail.com",
    __t: "itmanager",
};

export const setupGlobalFixtures = async () => {
    console.info("Setting up global fixtures");
    await connectDB();
    try {
        const itManagerFixture = new ItManagerModel(itManagerData);
        await ItManagerModel.create(itManagerFixture);

        await RoomModel.insertMany(roomsMockData).then(() => console.log("Inserted rooms mock data successfully\n"));
        await StudentModel.insertMany(studentsMockData).then(() =>
            console.log("Inserted students mock data successfully\n")
        );
        await BookModel.insertMany(booksMockData).then(() => console.log("Inserted books mock data successfully\n"));
    } catch (error) {
        console.error(error);
        await StudentModel.deleteMany().then(() => console.log("Deleted students mock data successfully\n"));
        await RoomModel.deleteMany().then(() => console.log("Deleted rooms mock data successfully\n"));
        await BookModel.deleteMany().then(() => console.log("Deleted books mock data successfully\n"));
        await UserModel.deleteMany().then(() => console.log("Deleted users mock data successfully\n"));
        process.exit(1);
    }
};

export const teardownGlobalFixtures = async () => {
    console.info("Tear down global fixtures");
    try {
        await StudentModel.deleteMany().then(() => console.log("Deleted students mock data successfully\n"));
        await RoomModel.deleteMany().then(() => console.log("Deleted rooms mock data successfully\n"));
        await BookModel.deleteMany().then(() => console.log("Deleted books mock data successfully\n"));
        await UserModel.deleteMany().then(() => console.log("Deleted users mock data successfully\n"));
        await disconnectDB();
    } catch (error) {
        console.log(error);
    }
};
