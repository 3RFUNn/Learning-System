import {
    addCourse,
    deleteCourse,
    getCourse,
    getCourses,
    editCourse,
    addCoursePreRegistration,
    addCourseRegistration,
    deleteCoursePreRegistration,
    deleteCourseRegistration,
    editCoursePreRegistration,
    editCourseRegistration,
    getCoursePreRegistration,
    getCoursePreRegistrations,
    getCoursePreRegistrationsForTerm,
    getCourseRegistration,
    getCourseRegistrations,
    getCourseRegistrationsForTerm,
    acceptCourseRegistration,
    addOneCoursePreRegistration,
    addOneCourseRegistration,
    deleteOneCoursePreRegistration,
    deleteOneCourseRegistration,
} from "./courses.action.js";
import {
    getStudent,
    getStudents,
    getUser,
    editStudent,
    getProfessor,
} from "./users.action.js";

export const getCourseHandler = async (req, res) => {
    try {
        // const user = await getUser(req?.authData.id);
        const user = req?.authData;
        const course = await getCourse(req?.params?.id);
        if (
            user?.userType === "student" &&
            course.students?.includes(user?.id)
        ) {
            const isOk = course !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: course,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (
            user?.userType === "professor" &&
            course.professor?.id === user?.id
        ) {
            res.status(200)
                .json({
                    data: course,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user?.userType === "edumanager") {
            res.status(200)
                .json({
                    data: course,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user.userType === "itmanager") {
            res.status(200)
                .json({
                    data: course,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
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
            res.status(403)
                .json({
                    data: null,
                    status: 403,
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

export const editCourseHandler = async (req, res) => {
    try {
        // const user = await getUser(req?.authData.id);
        const user = req?.authData;
        if (user?.userType === "edumanager") {
            const updatedCourse = await editCourse(req?.params?.id, req?.body);
            const isOk = updatedCourse !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: updatedCourse,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "",
                })
                .end(() => {
                    // log
                });
            
        } else if (user.userType === "itmanager") {
            const updatedCourse = await editCourse(req?.params?.id, req?.body);
            res.status(updatedCourse !== null ? 200 : 400)
                .json({
                    data: updatedCourse,
                    status: updatedCourse !== null ? 200 : 400,
                    error: null,
                    ok: updatedCourse !== null,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
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
                message: "error in updating course",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteCourseHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "edumanager") {
            const ok = await deleteCourse(req?.params?.id);
            res.status(ok?200:400)
                .json({
                    data: ok,
                    status: ok?200:400,
                    error: null,
                    ok: ok,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user.userType === "itmanager") {
            const ok = await deleteCourse(req?.params?.id);
            res.status(200)
                .json({
                    data: ok,
                    status: 200,
                    error: null,
                    ok: ok,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(400)
                .json({
                    data: false,
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
                data: false,
                status: 400,
                error: error,
                ok: false,
                message: "error in deleting course",
            })
            .end(() => {
                // log
            });
    }
};

export const addCourseHandler = async (req, res) => {
    try {
        // const user = await getUser(req?.authData.id);
        const user = req?.authData;
        if (user?.userType === "edumanager") {
            const course = await addCourse(
                req?.body,
                req?.params?.isTerm === "true",
            );
            const isOk = course !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: course,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else if (user.userType === "itmanager") {
            const course = await addCourse(req?.body, !!req?.params?.isTerm);
            const isOk = course !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: course,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
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

export const addStudentToCourseHandler = async (req, res) => {
    try {
        // const user = await getUser(req?.authData.id);
        const user = req?.authData;
        if (user?.userType === "edumanager") {
            const course = await getCourse(req?.body?.courseId);
            const student = await getStudent(req?.body?.studentId);
            const updatedCourse = await editCourse(course.id, {
                ...course,
                students: [...course.students, student.id],
            });
            const updatedStudent = await editStudent(student.id, {
                ...student,
                courses: [...student.courses, course.id],
            });
            res.status(200)
                .json({
                    data: {
                        course: updatedCourse,
                        student: updatedStudent,
                    },
                    status: 200,
                    error: null,
                    ok: true,
                    message: "student added",
                })
                .end(() => {
                    // log
                });
        } else if (user.userType === "itmanager") {
            const course = await getCourse(req?.body?.courseId);
            const student = await getStudent(req?.body?.studentId);
            const updatedCourse = await editCourse(course.id, {
                ...course,
                students: [...course.students, student.id],
            });
            const updatedStudent = await editStudent(student.id, {
                ...student,
                courses: [...student.courses, course.id],
            });
            res.status(200)
                .json({
                    data: {
                        course: updatedCourse,
                        student: updatedStudent,
                    },
                    status: 200,
                    error: null,
                    ok: true,
                    message: "student added",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
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

export const removeStudentFromCourseHandler = async (req, res) => {
    try {
        // const user = await getUser(req?.authData.id);
        const user = req?.authData;
        if (user?.userType === "edumanager") {
            const course = await getCourse(req?.body?.courseId);
            const student = await getStudent(req?.body?.studentId);
            const updatedCourse = await editCourse(course.id, {
                ...course,
                students: course.students.filter((stid) => stid !== student.id),
            });
            const updatedStudent = await editStudent(student.id, {
                ...student,
                courses: student.courses.filter((cid) => cid !== course.id),
            });
            res.status(200)
                .json({
                    data: {
                        course: updatedCourse,
                        student: updatedStudent,
                    },
                    status: 200,
                    error: null,
                    ok: true,
                    message: "student added",
                })
                .end(() => {
                    // log
                });
        } else if (user.userType === "itmanager") {
            const course = await getCourse(req?.body?.courseId);
            const student = await getStudent(req?.body?.studentId);
            const updatedCourse = await editCourse(course.id, {
                ...course,
                students: course.students.filter((stid) => stid !== student.id),
            });
            const updatedStudent = await editStudent(student.id, {
                ...student,
                courses: student.courses.filter((cid) => cid !== course.id),
            });
            res.status(200)
                .json({
                    data: {
                        course: updatedCourse,
                        student: updatedStudent,
                    },
                    status: 200,
                    error: null,
                    ok: true,
                    message: "student added",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
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

export const addCoursePreRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const preRegistration = await addCoursePreRegistration(req.body);
            const isOk = preRegistration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: preRegistration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "Course pre-registration added successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can add course pre-registrations",
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
                message: "Error in adding course pre-registration",
            })
            .end(() => {
                // log
            });
    }
};

export const addOneCoursePreRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const preRegistration = await addOneCoursePreRegistration(
                user.id,
                req.params.id,
                req.body.termId,
            );
            const isOk = preRegistration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: preRegistration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "Course pre-registration added successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can add course pre-registrations",
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
                message: "Error in adding course pre-registration",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteCoursePreRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const preRegistration = await deleteCoursePreRegistration(
                req.params.id,
            );
            const isOk = preRegistration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: preRegistration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "Course pre-registration deleted successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message:
                        "Only students can delete course pre-registrations",
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
                message: "Error in deleting course pre-registration",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteOneCoursePreRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const preRegistration = await deleteOneCoursePreRegistration(
                user.id,
                req.params.id,
                req.body.termId,
            );
            const isOk = preRegistration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: preRegistration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "Course pre-registration deleted successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message:
                        "Only students can delete course pre-registrations",
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
                message: "Error in deleting course pre-registration",
            })
            .end(() => {
                // log
            });
    }
};

export const editCoursePreRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const preRegistration = await editCoursePreRegistration(
                req.params.id,
                req.body,
            );
            res.status(200)
                .json({
                    data: preRegistration,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "Course pre-registration edited successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can edit course pre-registrations",
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
                message: "Error in editing course pre-registration",
            })
            .end(() => {
                // log
            });
    }
};

export const getCoursePreRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const preRegistration = await getCoursePreRegistration(
                req.params.id,
            );
            const isOk = preRegistration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: preRegistration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course pre-registrations",
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
                message: "Error in getting course pre-registration",
            })
            .end(() => {
                // log
            });
    }
};

export const getCoursePreRegistrationsHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            const preRegistrations = await getCoursePreRegistrations(
                req.params.id,
            );
            res.status(200)
                .json({
                    data: preRegistrations.slice(
                        page * limit,
                        (page + 1) * limit,
                    ),
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course pre-registrations",
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
                message: "Error in getting course pre-registrations",
            })
            .end(() => {
                // log
            });
    }
};

// Handlers for course registration actions

export const addCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const registration = await addCourseRegistration(req.body);
            const isOk = registration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "Course registration added successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can add course registrations",
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
                message: "Error in adding course registration",
            })
            .end(() => {
                // log
            });
    }
};

export const addOneCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const registration = await addOneCourseRegistration(
                user.id,
                req.params.id,
                req.body.termId,
            );
            const isOk = registration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "Course registration added successfully",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can add course registrations",
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
                message: "Error in adding course registration",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const registration = await deleteCourseRegistration(req.params.id);
            const isOk = registration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: isOk ?"Course registration deleted successfully" :"bad request",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can delete course registrations",
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
                message: "Error in deleting course registration",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteOneCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const registration = await deleteOneCourseRegistration(
                user.id,
                req.params.id,
                req.body.termId,
            );
            const isOk = registration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: isOk?"Course registration deleted successfully":"",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can delete course registrations",
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
                message: "Error in deleting course registration",
            })
            .end(() => {
                // log
            });
    }
};

export const editCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const registration = await editCourseRegistration(
                req.params.id,
                req.body,
            );
            const isOk = registration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: isOk ? "Course registration edited successfully" : "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can edit course registrations",
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
                message: "Error in editing course registration",
            })
            .end(() => {
                // log
            });
    }
};

export const getCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const registration = await getCourseRegistration(req.params.id);
            const isOk = registration !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registration,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course registrations",
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
                message: "Error in getting course registration",
            })
            .end(() => {
                // log
            });
    }
};

export const getCourseRegistrationsHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "student") {
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            const registrations = await getCourseRegistrations(req.params.id);
            res.status(200)
                .json({
                    data: registrations.slice(page * limit, (page + 1) * limit),
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course registrations",
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
                message: "Error in getting course registrations",
            })
            .end(() => {
                // log
            });
    }
};

export const acceptCourseRegistrationHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "edumanager" || user?.userType === "professor") {
            const registrations = await acceptCourseRegistration(req.id);
            const isOk = registrations !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registrations,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: isOk ? "" : "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course registrations",
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
                message: "Error in getting course registrations",
            })
            .end(() => {
                // log
            });
    }
};

export const getCourseRegistrationsForTermHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "professor") {
            const registrations = await getCourseRegistrations(req.params.id);
            const isOk = registrations !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registrations,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: isOk ? "" : "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course registrations",
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
                message: "Error in getting course registrations",
            })
            .end(() => {
                // log
            });
    }
};

export const getCoursePreRegistrationsForTermHandler = async (req, res) => {
    try {
        const user = req?.authData;
        if (user?.userType === "professor") {
            const registrations = await getCoursePreRegistrations(
                req.params.id,
            );
            const isOk = registrations !== null;
            res.status(isOk ? 200 : 400)
                .json({
                    data: registrations,
                    status: isOk ? 200 : 400,
                    error: null,
                    ok: isOk,
                    message: isOk ? "" : "",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: "access denied",
                    ok: false,
                    message: "Only students can get course registrations",
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
                message: "Error in getting course registrations",
            })
            .end(() => {
                // log
            });
    }
};
