import models from "../models/index.js";

const { TermModel, CourseModel, UserModel } = models;

export const addTerm = async (termData) => {
    try {
        const term = new TermModel(termData);
        await term.save();
        return term;
    } catch (error) {
        return null;
    }
};

export const editTerm = async (id, termData) => {
    try {
        if (id.length > 0) {
            const result = await TermModel.findOneAndUpdate(
                { _id: id },
                termData,
                {
                    fields: Object.keys(termData),
                }
            ).exec();
            return result;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteTerm = async (id) => {
    try {
        if (id.length > 0) {
            await TermModel.findOneAndRemove({ _id: id }).exec();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const getTerm = async (id) => {
    try {
        if (id.length > 0) {
            const term = await TermModel.findById(id)
                .populate("users")
                .populate("courses")
                .exec();
            console.log(term);
            return term;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getTerms = async () => {
    try {
        const terms = await TermModel.find()
            .populate([
                {
                    path: "courses",
                    model: CourseModel,
                },
                {
                    path: "users",
                    model: UserModel,
                },
            ])
            .exec();

        return terms;
    } catch (error) {
        return [];
    }
};

export const addCourseToTerm = async (termId, courseId) => {
    try {
        const term = await TermModel.findById(termId).exec();
        const course = await CourseModel.findById(courseId).exec();
        if (!term || !course) {
            return null;
        }
        term.courses.push(course._id);
        await term.save();
        return term;
    } catch (error) {
        return null;
    }
};

export const addCoursesToTerm = async (termId, courseIds) => {
    try {
        const term = await TermModel.findById(termId).exec();
        const courses = (await CourseModel.find({}).exec()).filter((c) =>
            courseIds.includes(c.id)
        );
        if (!term) {
            return null;
        }
        term.courses = [...term.courses, ...courses.map((c) => c.id)];
        await term.save();
        return term;
    } catch (error) {
        return null;
    }
};

export const addUserToTerm = async (termId, userId) => {
    try {
        const term = await TermModel.findById(termId).exec();
        const user = await UserModel.findOne({ id: userId }).exec();
        if (!term || !user) {
            return null;
        }
        term.users.push(user._id);
        await term.save();
        return term;
    } catch (error) {
        return null;
    }
};

export const removeCourseFromTerm = async (termId, courseId) => {
    try {
        const term = await TermModel.findById(termId).exec();
        if (!term) {
            return null;
        }
        term.courses = term.courses.filter(
            (course) => !course.equals(courseId)
        );
        await term.save();
        return term;
    } catch (error) {
        return null;
    }
};

export const removeUserFromTerm = async (termId, userId) => {
    try {
        const term = await TermModel.findById(termId).exec();
        if (!term) {
            return null;
        }
        term.users = term.users.filter((id) => !id.equals(userId));
        await term.save();
        return term;
    } catch (error) {
        return null;
    }
};
