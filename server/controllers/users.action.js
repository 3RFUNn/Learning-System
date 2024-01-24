import models from "../models/index.js";
import { generatePasswordHash } from "../utils/hash.js";

const { EduManagerModel, ItManagerModel, ProfessorModel, StudentModel, UserModel } = models;

export const addProfessor = async (professorData) => {
    try {
        console.log("professor data:", professorData);
        const professor = new ProfessorModel({
            ...professorData,
            password: await generatePasswordHash(professorData.password),
        });
        await professor.save();
        return professor;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const editProfessor = async (id, professorData) => {
    try {
        if (id.length > 0) {
            const result = await ProfessorModel.findByIdAndUpdate(id, professorData).exec();
            return result;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteProfessor = async (id) => {
    try {
        if (id.length > 0) {
            await ProfessorModel.findByIdAndRemove(id).exec();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const getProfessor = async (id) => {
    try {
        if (id.length > 0) {
            const professor = await ProfessorModel.findById(id).exec();
            return professor;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getProfessors = async (page, limit) => {
    try {
        const professors = await ProfessorModel.find(
            {
                __t: "professor",
            },
            null,
            { skip: (page - 1) * limit, limit }
        ).exec();
        console.log({ professors });
        return professors;
    } catch (error) {
        return [];
    }
};

export const addStudent = async (studentData) => {
    try {
        if (studentData?.firstName.length > 0) {
            const student = new StudentModel({
                ...studentData,
                password: await generatePasswordHash(studentData.password),
            });
            await student.save();
            console.log("nnnnnnn" + student);
            return student;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const editStudent = async (_id, studentData) => {
    try {
        if (_id.length > 0) {
            const result = await StudentModel.findOneAndUpdate({ _id }, studentData).exec();
            return result;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteStudent = async (_id) => {
    try {
        if (_id.length > 0) {
            const res = await StudentModel.findByIdAndDelete(_id).exec();
            console.log(res);
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const getStudent = async (_id) => {
    try {
        if (_id.length > 0) {
            const student = await StudentModel.findOne({
                _id,
                __t: "student",
            }).exec();
            return student;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getStudentSupervisor = async (id) => {
    try {
        if (id.length > 0) {
            const student = await StudentModel.findOne({
                id,
                __t: "student",
            }).exec();
            const supervisor = await getProfessor(student.supervisor);
            return supervisor;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getStudents = async (page, limit) => {
    try {
        const students = await StudentModel.find({ __t: "student" }, "-password", {
            skip: (page - 1) * limit,
            limit,
        }).exec();

        console.log(students);

        const totalCount = await StudentModel.countDocuments().exec();

        return { students, totalCount };
    } catch (error) {
        return { students: [], totalCount: 0 };
    }
};

export const addITManager = async (managerData) => {
    try {
        if (managerData?.firstName?.length > 0) {
            const manager = new ItManagerModel({
                ...managerData,
                password: await generatePasswordHash(managerData.password),
            });
            await manager.save();
            return manager;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const editITManager = async (id, managerData) => {
    try {
        if (id.length > 0) {
            const result = await ItManagerModel.findOneAndUpdate({ id, __t: "itmanager" }, managerData).exec();
            return result;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteITManager = async (id) => {
    try {
        if (id.length > 0) {
            await ItManagerModel.findOneAndRemove({
                id,
                __t: "itmanager",
            }).exec();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const getITManager = async (id) => {
    try {
        if (id.length > 0) {
            const manager = await ItManagerModel.findOne({
                id,
                __t: "itmanager",
            }).exec();
            return manager;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getITManagers = async () => {
    try {
        const managers = await ItManagerModel.find({ __t: "itmanager" }).exec();
        return managers;
    } catch (error) {
        return [];
    }
};

export const addEDUManager = async (managerData) => {
    try {
        if (managerData?.firstName?.length > 0) {
            const manager = new EduManagerModel({
                ...managerData,
                password: await generatePasswordHash(managerData.password),
            });
            manager.save();
            return manager;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const editEDUManager = async (_id, managerData) => {
    try {
        if (_id.length > 0) {
            const result = await EduManagerModel.findOneAndUpdate({ _id, __t: "edumanager" }, managerData).exec();
            return result;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteEDUManager = async (_id) => {
    try {
        if (_id.length > 0) {
            await EduManagerModel.findOneAndRemove({
                _id,
                __t: "edumanager",
            }).exec();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const getEDUManager = async (_id) => {
    try {
        if (_id.length > 0) {
            const manager = await EduManagerModel.findOne({
                _id,
                __t: "edumanager",
            }).exec();
            return manager;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getEDUManagers = async () => {
    try {
        const managers = await EduManagerModel.find({
            __t: "edumanager",
        }).exec();
        return managers;
    } catch (error) {
        return [];
    }
};

export const getUser = async (id) => {
    try {
        const user = await UserModel.findOne({ id }).exec();
        return user;
    } catch (error) {
        return null;
    }
};
