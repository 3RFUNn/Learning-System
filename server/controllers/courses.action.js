import models from "../models/index.js";
import {addUserToTerm} from "./terms.action.js";
import {editStudent, getStudent, getStudents, getUser} from "./users.action.js";

const {
    CourseModel,
    TermCourseModel,
    CoursePreRegistrationModel,
    CourseRegistrationModel,
} = models;

export const addCourse = async (courseData, isTerm = false) => {
    try {
        console.log("course data => ", courseData, isTerm);
        if (courseData?.name?.length > 0) {
            if (isTerm) {
                const course = new TermCourseModel(courseData);
                await course.save();
                return course;
            }
            const course = new CourseModel(courseData);
            course.save();
            return course;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getCourse = async (id) => {
    try {
        if (id?.length > 0) {
            const course = await CourseModel.findOne({id}).exec();
            return course;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const editCourse = async (id, courseData) => {
    try {
        if (courseData?._id?.length > 0) {
            const course = await CourseModel.findOneAndUpdate(
                {id},
                courseData,
            ).exec();
            return course;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteCourse = async (id) => {
    try {
        if (id?.length > 0) {
            await CourseModel.findOneAndDelete({id}).exec();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const getCourses = async (t) => {
    try {
        if (t) {
            const courses = await CourseModel.find({__t: t}).exec();
            return courses;
        }
        const courses = await CourseModel.find({}).exec();
        return courses;
    } catch (error) {
        return [];
    }
};

export const addCourseRegistration = async (courseRegistrationData) => {
    try {
        if (courseRegistrationData?.student?.length > 0) {
            const courseRegistration = new CourseRegistrationModel(
                courseRegistrationData,
            );
            await courseRegistration.save();
            return courseRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const addOneCourseRegistration = async (studentId, courseId, termId) => {
    try {
        const student = await getUser(studentId);
        const course = await getCourse(courseId);
        const registration = await getCourseRegistrationByTermAndStudent(
            termId,
            studentId,
        );
        if (!registration && student && course) {
            const courseRegistration = new CourseRegistrationModel({
                courses: [course.id],
                student: student.id,
                term: termId,
            });
            await courseRegistration.save();
            return courseRegistration;
        } else if (registration && student && course) {
            if (registration) {
                registration.courses.push(courseId);
                await registration.save();
                return registration;
            }
            return null;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCourseRegistrationByTermAndStudent = async (
    termId,
    studentId,
) => {
    try {
        if (termId?.length > 0 && studentId?.length > 0) {
            const courseRegistration = await CourseRegistrationModel.findOne({
                term: termId,
                student: studentId,
            }).exec();
            return courseRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const addOneCoursePreRegistration = async (
    studentId,
    courseId,
    termId,
) => {
    try {
        const student = await getUser(studentId);
        const course = await getCourse(courseId);
        const registration = await getCoursePreRegistrationByTermAndStudent(
            termId,
            studentId,
        );
        console.log("pre => ", registration, student, course);
        if (!registration && student && course) {
            const courseRegistration = new CoursePreRegistrationModel({
                courses: [course.id],
                student: student.id,
                term: termId,
            });
            await courseRegistration.save();
            return courseRegistration;
        } else if (registration && student && course) {
            if (registration) {
                registration.courses.push(courseId);
                await registration.save();
                return registration;
            }
            return null;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCoursePreRegistrationByTermAndStudent = async (
    termId,
    studentId,
) => {
    try {
        if (termId?.length > 0) {
            const courseRegistration = await CoursePreRegistrationModel.findOne(
                {
                    term: termId,
                    student: studentId,
                },
            ).exec();
            return courseRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCourseRegistration = async (id) => {
    try {
        if (id?.length > 0) {
            const courseRegistration = await CourseRegistrationModel.findOne({
                id,
            }).exec();
            return courseRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCourseRegistrations = async (id) => {
    try {
        if (id?.length > 0) {
            const courseRegistrations = await CourseRegistrationModel.find(
                {},
            ).exec();
            return courseRegistrations;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const acceptCourseRegistration = async (id) => {
    try {
        if (id?.length > 0) {
            const courseRegistration = await CourseRegistrationModel.findById(
                id,
            ).exec();
            const student = await getStudent(courseRegistration.student);
            const courses = await getCourses("termcourse");
            if (student && courseRegistration && courses?.length > 0) {
                const studentCourses = courses.filter((c) =>
                    courseRegistration.courses.includes(c.id),
                );
                const updates = [];
                for (const studentCourse of studentCourses) {
                    if (!studentCourse.students.includes(student.id)) {
                        updates.push(
                            editCourse(studentCourse.id, {
                                students: [
                                    ...studentCourse.students,
                                    student.id,
                                ],
                            }),
                        );
                    }
                }
                const results = await Promise.all(updates);
                const new_courses = [...student.courses];
                courseRegistration.courses.forEach((course) => {
                    !new_courses.includes(course) && new_courses.push(course);
                });
                await editStudent(student.id, {
                    courses: new_courses,
                });
                await addUserToTerm(courseRegistration.term, student.id);
                return results;
            }
            return null;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const editCourseRegistration = async (id, courseRegistrationData) => {
    try {
        if (courseRegistrationData?.student?.length > 0) {
            const courseRegistration =
                await CourseRegistrationModel.findOneAndUpdate(
                    {id},
                    courseRegistrationData,
                ).exec();
            return courseRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteCourseRegistration = async (id) => {
    try {
        if (id?.length > 0) {
            await CourseRegistrationModel.findOneAndDelete({id}).exec();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const deleteOneCourseRegistration = async (
    studentId,
    courseId,
    termId,
) => {
    try {
        const student = await getUser(studentId);
        const course = await getCourse(courseId);
        const registration = await getCourseRegistrationByTermAndStudent(
            termId,
            studentId,
        );
        if (registration && student && course) {
            registration.courses = registration.courses.filter(
                (c) => c !== courseId,
            );
            await registration.save();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const deleteOneCoursePreRegistration = async (
    studentId,
    courseId,
    termId,
) => {
    try {
        const student = await getUser(studentId);
        const course = await getCourse(courseId);
        const preRegistration = await getCoursePreRegistrationByTermAndStudent(
            termId,
            studentId,
        );
        if (preRegistration && student && course) {
            preRegistration.courses = preRegistration.courses.filter(
                (c) => c !== courseId,
            );
            await preRegistration.save();
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export const addCoursePreRegistration = async (coursePreRegistrationData) => {
    try {
        if (
            coursePreRegistrationData?.courseId?.length > 0 &&
            coursePreRegistrationData?.studentId?.length > 0
        ) {
            const coursePreRegistration = new CoursePreRegistrationModel(
                coursePreRegistrationData,
            );
            await coursePreRegistration.save();
            return coursePreRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCoursePreRegistration = async (id) => {
    try {
        if (id?.length > 0) {
            const coursePreRegistration =
                await CoursePreRegistrationModel.findOne({id}).exec();
            return coursePreRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const editCoursePreRegistration = async (
    id,
    coursePreRegistrationData,
) => {
    try {
        if (coursePreRegistrationData?._id?.length > 0) {
            const coursePreRegistration =
                await CoursePreRegistrationModel.findOneAndUpdate(
                    {id},
                    coursePreRegistrationData,
                ).exec();
            return coursePreRegistration;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const deleteCoursePreRegistration = async (id) => {
    try {
        if (id?.length > 0) {
            await CoursePreRegistrationModel.findOneAndDelete({id}).exec();
            return true;
        }
        return false;
    } catch (error) {
        returnfalse;
    }
};

export const getCoursePreRegistrations = async (id) => {
    try {
        if (id?.length > 0) {
            const coursePreRegistrations =
                await CoursePreRegistrationModel.find({}).exec();
            return coursePreRegistrations;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCoursePreRegistrationsForTerm = async (courseId, termId) => {
    try {
        if (courseId?.length > 0) {
            const coursePreRegistrations =
                await CoursePreRegistrationModel.find({term: termId}).exec();
            const selectedStudents = coursePreRegistrations
                .filter((pr) => pr.courses.includes(courseId))
                .map((pr) => pr.student);
            const students = await getStudents();
            return students.filter((student) =>
                selectedStudents.includes(student.id),
            );
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCoursesPreRegistrationsForTerm = async (termId) => {
    try {
        if (termId?.length > 0) {
            const coursesPreRegistrations =
                await CoursePreRegistrationModel.find({term: termId}).exec();
            return coursesPreRegistrations;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCoursesRegistrationsForTerm = async (termId) => {
    try {
        if (termId?.length > 0) {
            const coursesRegistrations = await CourseRegistrationModel.find({
                term: termId,
            }).exec();
            return coursesRegistrations;
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getCourseRegistrationsForTerm = async (courseId, termId) => {
    try {
        if (courseId?.length > 0) {
            const courseRegistrations = await CourseRegistrationModel.find({
                term: termId,
            }).exec();
            const selectedStudents = courseRegistrations
                .filter((pr) => pr.courses.includes(courseId))
                .map((pr) => pr.student);
            const students = await getStudents();
            return students.filter((student) =>
                selectedStudents.includes(student.id),
            );
        }
        return null;
    } catch (error) {
        return null;
    }
};
