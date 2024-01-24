```
import models from "../models/index.js";

const {TermModel, CourseModel,UserModel} = models;

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
                {_id: id},
                termData,
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
            await TermModel.findOneAndRemove({_id: id}).exec();
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
            return term;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getTerms = async () => {
    try {
        const terms = await TermModel.find().populate("users").populate("courses").exec();
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

export const addUserToTerm = async (termId, userId) => {
    try {
        const term = await TermModel.findById(termId).exec();
        const user = await UserModel.findOne({id:userId}).exec();
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
            (course) => !course.equals(courseId),
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
```
above code is my action for terms so write controller for below routes
```
مشاهده لیست ترمها:
○ GET /terms
● مشاهده اطالعات یک ترم:
○ GET /tem/{ID}
● ایجاد ترم جدید:
○ POST /term
● ویرایش اطالعات یک ترم:
○ PUT /term/{ID}
● حذف یک ترم:
○ DELETE /term/{ID}
● ارائه درس ترمی برای پیشثبتنام:
○ POST /term/{ID}/preregistration
● مشاهده لیست دروس ارائهشده برای پیشثبتنام در یک ترم:
○ GET/term/{ID}/preregistration_courses
● حذف درس ترمی از لیست دروس مجاز برای پیشثبتنام:
○ DELETE /term/{ID}/preregistration
● ارائه درس ترمی برای ثبتنام:
○ POST /term/{ID}/registration
● مشاهده لیست دروس ارائهشده برای ثبتنام در یک ترم:
○ GET/term/{ID}/registration_courses
● حذف درس ترمی از لیست دروس مجاز برای ثبتنام:
○ DELETE /term/{ID}/registration
● مشاهده پیشثبتنامها برای دروس ترمی یک ترم:
○ GET /term/{ID}/preregistrations
● مشاهده پیشثبتنامها برای درس ترمی:
○ GET /course/{ID}/preregistrations
● تأیید یا رد انتخاب واحد دانشجو:
○ PUT /registration/{ID}
```
like below but just edu manager can access
```
export const getCoursesHandler = async (req, res) => {
    try {
        const courses = await getCourses();
        const user = await getUser(req?.authData.id);
        if (user?.__t === "student") {
            res.status(200)
                .json({
                    data: courses.filter((c) => user.courses.includes(c.id)),
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user?.__t === "professor") {
            res.status(200)
                .json({
                    data: courses.filter((c) => c.professorId === user.id),
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user?.__t === "edumanager") {
            res.status(200)
                .json({
                    data: courses,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user.__t === "itmanager") {
            res.status(200)
                .json({
                    data: courses,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(400)
                .json({
                    data: null,
                    status: 400,
                    error: "access denied",
                    ok: false,
                    message: "you dont have permission",
                })
                .end(() => {
                    // log
                });
        }
    } catch (error) {
        res.status(400)
            .json({
                data: null,
                status: 400,
                error: error,
                ok: false,
                message: "error in get course",
            })
            .end(() => {
                // log
            });
    }
};
```