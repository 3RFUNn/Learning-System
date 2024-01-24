import { EditProfessorValidator, InsertProfessorValidator } from "../models/user.model.js";
import {
    addEDUManager,
    addITManager,
    addProfessor,
    addStudent,
    deleteEDUManager,
    deleteITManager,
    deleteProfessor,
    deleteStudent,
    editEDUManager,
    editITManager,
    editProfessor,
    editStudent,
    getEDUManager,
    getEDUManagers,
    getITManager,
    getITManagers,
    getProfessor,
    getProfessors,
    getStudent,
    getStudents,
} from "./users.action.js";
import { ZodError } from "zod";
export const getStudentsHandler = async (req, res) => {
    try {
        if (!(req?.authData?.userType === "itmanager" || req.authData?.userType === "edumanager")) {
            res.status(403).json({
                data: null,
                status: 403,
                error: "access denied",
                ok: false,
                message: "you dont have permission",
            });
        }

        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);
        const { students, totalCount } = await getStudents(page, limit);

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            data: students,
            status: 200,
            error: null,
            ok: true,
            message: "",
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalCount,
                totalPages,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400)
            .json({
                data: null,
                status: 400,
                error: error,
                ok: false,
                message: "error in get students",
            })
            .end(() => {
                // log
            });
    }
};

export const getStudentHandler = async (req, res) => {
    try {
        if (!(req?.authData?.userType === "itmanager" || req.authData?.userType === "edumanager")) {
            res.status(403).json({
                data: null,
                status: 403,
                error: "access denied",
                ok: false,
                message: "you dont have permission",
            });
        }
        const student = await getStudent(req?.params?.id);
        console.log(student);
        res.status(200).json({
            data: student,
            status: 200,
            error: null,
            ok: true,
            message: "",
        });
    } catch (error) {
        res.status(400).json({
            data: null,
            status: 400,
            error: error,
            ok: false,
            message: "error in get student",
        });
    }
};

export const getProfessorHandler = async (req, res) => {
    try {
        if (!(req.authData?.userType === "itmanager" || req.authData?.userType === "edumanager")) {
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
        const professor = await getProfessor(req?.params?.id);

        console.log(professor);

        res.status(200).json({
            data: professor,
            status: 200,
            error: null,
            ok: true,
            message: "",
        });
    } catch (error) {
        res.status(400)
            .json({
                data: null,
                status: 400,
                error: error,
                ok: false,
                message: "error in get professors",
            })
            .end(() => {
                // log
            });
    }
};

export const getProfessorsHandler = async (req, res) => {
    try {
        if (req.authData?.userType === "itmanager" || req.authData?.userType === "edumanager") {
            const page = Number(req?.query?.page ?? 1);
            const limit = Number(req?.query?.limit ?? 10);
            const professors = await getProfessors(page, limit);
            res.status(200)
                .json({
                    data: professors,
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
                    message: "error in get student",
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
                message: "error in get professors",
            })
            .end(() => {
                // log
            });
    }
};

export const getITManagerHandler = async (req, res) => {
    try {
        const itManager = await getITManager(req?.params?.id);
        if (req?.authData?.id === itManager.id) {
            res.status(200)
                .json({
                    data: itManager,
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
                message: "error in get IT managers",
            })
            .end(() => {
                // log
            });
    }
};

export const getITManagersHandler = async (req, res) => {
    try {
        const itManagers = await getITManagers();
        if (req?.authData?.id === itManagers.id || req?.authData?.userType === "itmanager") {
            res.status(200)
                .json({
                    data: itManagers,
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
                message: "error in get IT managers",
            })
            .end(() => {
                // log
            });
    }
};

export const getEDUManagersHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const eduManagers = await getEDUManagers();
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            res.status(200)
                .json({
                    data: eduManagers.slice(page * limit, (page + 1) * limit),
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
                message: "error in get EDU Managers",
            })
            .end(() => {
                // log
            });
    }
};

export const addProfessorHandler = async (req, res) => {
    try {
        console.log("in add professor => ", req.body, req.authData);
        if (req?.authData?.userType !== "itmanager") {
            res.status(403).json({
                data: null,
                status: 403,
                error: "access denied",
                ok: false,
                message: "you dont have permission",
            });
        }

        const validatedData = InsertProfessorValidator.parse(req.body);

        const professorAdded = await addProfessor(validatedData);
        if (!professorAdded) throw new Error();
        console.log("bodyyy" + req.body);
        res.status(200)
            .json({
                data: professorAdded,
                status: 200,
                error: null,
                ok: true,
                message: "",
            })
            .end(() => {
                // log
            });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            data: null,
            status: 400,
            error: error,
            ok: false,
            message: error instanceof ZodError ? error.issues[0].message : "error in adding professor",
        });
    }
};

export const addProfessorsHandler = async (req, res) => {
    try {
        console.log("in add professor => ", req.body, req.authData);
        if (req?.authData?.userType === "itmanager") {
            const professors = [];
            for (const professor of req.body) {
                professors.push(await addProfessor(professor));
            }
            const results = await Promise.all(professors);
            res.status(200)
                .json({
                    data: results,
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
                message: "error in adding professor",
            })
            .end(() => {
                // log
            });
    }
};

export const editProfessorHandler = async (req, res) => {
    try {
        if (!(req?.authData?.userType === "professor" || req?.authData?.userType === "itmanager" || !req?.params?.id)) {
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
        const validatedData = EditProfessorValidator.parse(req.body);
        const professorEdited = await editProfessor(req?.params?.id, validatedData);
        res.status(200)
            .json({
                data: professorEdited,
                status: 200,
                error: null,
                ok: true,
                message: "",
            })
            .end(() => {
                // log
            });
    } catch (error) {
        res.status(400).json({
            data: null,
            status: 400,
            error: error,
            ok: false,
            message: "error in editing professor",
        });
    }
};

export const deleteProfessorHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const professorDeleted = await deleteProfessor(req?.params?.id);
            res.status(200)
                .json({
                    data: professorDeleted,
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
                message: "error in deleting professor",
            })
            .end(() => {
                // log
            });
    }
};

export const addStudentHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const studentAdded = await addStudent(req.body);

            res.status(200)
                .json({
                    data: studentAdded,
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
                message: "error in adding student",
            })
            .end(() => {
                // log
            });
    }
};

export const addStudentsHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const students = [];
            for (const student of req.body) {
                students.push(await addProfessor(student));
            }
            const results = await Promise.all(students);
            res.status(200)
                .json({
                    data: results,
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
                message: "error in adding student",
            })
            .end(() => {
                // log
            });
    }
};

export const editStudentHandler = async (req, res) => {
    try {
        if (!(req?.authData?.userType === "itmanager")) {
            res.status(403).json({
                data: null,
                status: 403,
                error: "access denied",
                ok: false,
                message: "you dont have permission",
            });
        }
        const studentEdited = await editStudent(req?.params?.id, req.body);
        res.status(200).json({
            data: studentEdited,
            status: 200,
            error: null,
            ok: true,
            message: "",
        });
    } catch (error) {
        res.status(400)
            .json({
                data: null,
                status: 400,
                error: error,
                ok: false,
                message: "error in editing student",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteStudentHandler = async (req, res) => {
    try {
        if (!(req?.authData?.userType === "itmanager")) {
            res.status(403).json({
                data: null,
                status: 403,
                error: "access denied",
                ok: false,
                message: "you dont have permission",
            });
        }
        const studentDeleted = await deleteStudent(req?.params?.id);
        res.status(200).json({
            data: studentDeleted,
            status: 200,
            error: null,
            ok: true,
            message: "",
        });
    } catch (error) {
        res.status(400).json({
            data: null,
            status: 400,
            error: error,
            ok: false,
            message: "error in deleting student",
        });
    }
};

export const addITManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const ITManagerAdded = await addITManager(req.body);
            res.status(200)
                .json({
                    data: ITManagerAdded,
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
                message: "error in adding IT manager",
            })
            .end(() => {
                // log
            });
    }
};

export const editITManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.id === req?.params?.id && req?.authData?.userType === "itmanager") {
            const ITManagerEdited = await editITManager(req?.params?.id, req.body);
            res.status(200)
                .json({
                    data: ITManagerEdited,
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
                message: "error in editing IT Manager",
            })
            .end(() => {
                // log
            });
    }
};

export const editEDUManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.id === req?.params?.id || req?.authData?.userType === "itmanager") {
            const eduManagerEdited = await editEDUManager(req?.params?.id, req?.body);
            res.status(200)
                .json({
                    data: eduManagerEdited,
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
                message: "error in editing EDU Manager",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteITManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const ITManagerDeleted = await deleteITManager(req?.params?.id);
            res.status(200)
                .json({
                    data: ITManagerDeleted,
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
                message: "error in deleting IT manager",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteEDUManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const eduManagerDeleted = await deleteEDUManager(req?.params?.id);
            res.status(200)
                .json({
                    data: eduManagerDeleted,
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
                message: "error in deleting EDU manager",
            })
            .end(() => {
                // log
            });
    }
};

export const addEDUManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const EDUManagerAdded = await addEDUManager(req.body);
            res.status(200)
                .json({
                    data: EDUManagerAdded,
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
                message: "error in adding EDU manager",
            })
            .end(() => {
                // log
            });
    }
};

export const addEDUManagersHandler = async (req, res) => {
    try {
        if (req?.authData?.userType === "itmanager") {
            const eduManagers = [];
            for (const eduManager of req.body) {
                eduManagers.push(await addProfessor(eduManager));
            }
            const results = await Promise.all(eduManagers);
            res.status(200)
                .json({
                    data: results,
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
                message: "error in adding EDU manager",
            })
            .end(() => {
                // log
            });
    }
};

export const getEDUManagerHandler = async (req, res) => {
    try {
        if (req?.authData?.id === req?.params?.id || req?.authData?.userType === "itmanager") {
            const eduManager = await getEDUManager(req?.params?.id);
            res.status(200)
                .json({
                    data: eduManager,
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
                message: "error in get EDU manager",
            })
            .end(() => {
                // log
            });
    }
};
