import {
    getCoursesPreRegistrationsForTerm,
    getCoursesRegistrationsForTerm,
} from "./courses.action.js";
import {
    addTerm,
    editTerm,
    deleteTerm,
    getTerm,
    getTerms,
    addCourseToTerm,
    addUserToTerm,
    removeCourseFromTerm,
    removeUserFromTerm,
    addCoursesToTerm,
} from "./terms.action.js";
import { getUser } from "./users.action.js";

export const getTermsHandler = async (req, res) => {
    try {
        if (req?.authData?.id?.length) {
            const terms = await getTerms();
            console.log("terms => ", terms);
            res.status(200)
                .json({
                    data: terms,
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
                    error: error,
                    ok: false,
                    message: "error in get terms",
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
                message: "error in get terms",
            })
            .end(() => {
                // log
            });
    }
};

export const getTermPreRegisterationCoursesHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            const term = await getTerm(req.params.id);
            res.status(200)
                .json({
                    data: term.courses
                        .filter(
                            (course) =>
                                course.__t === "course" || course.__t === ""
                        )
                        .slice(page * limit, (page + 1) * limit),
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
                    error: error,
                    ok: false,
                    message: "error in get terms",
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
                message: "error in get terms",
            })
            .end(() => {
                // log
            });
    }
};

export const getTermRegisterationCoursesHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            const term = await getTerm(req.params.id);
            res.status(200)
                .json({
                    data: term.courses
                        .filter((course) => course.__t === "termcourse")
                        .slice(page * limit, (page + 1) * limit),
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
                    error: error,
                    ok: false,
                    message: "error in get terms",
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
                message: "error in get terms",
            })
            .end(() => {
                // log
            });
    }
};

export const getTermHandler = async (req, res) => {
    try {
        const term = await getTerm(req?.params?.id);

        if (!term) {
            res.status(404)
                .json({
                    data: null,
                    status: 404,
                    error: "not found",
                    ok: false,
                    message: "term not found",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(200)
                .json({
                    data: term,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "",
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
                message: "error in get term",
            })
            .end(() => {
                // log
            });
    }
};

export const addTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const termData = req.body;
            const term = await addTerm(termData);
            if (!term) {
                res.status(400)
                    .json({
                        data: null,
                        status: 400,
                        error: "bad request",
                        ok: false,
                        message: "could not add term",
                    })
                    .end(() => {
                        // log
                    });
            } else {
                res.status(201)
                    .json({
                        data: term,
                        status: 201,
                        error: null,
                        ok: true,
                        message: "term added successfully",
                    })
                    .end(() => {
                        // log
                    });
            }
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: error,
                    ok: false,
                    message: "premission denied (only edu manager can access)",
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
                message: "error in adding term",
            })
            .end(() => {
                // log
            });
    }
};

export const editTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const termData = req.body;
            const result = await editTerm(req.params.id, termData);
            if (!result) {
                res.status(404)
                    .json({
                        data: null,
                        status: 404,
                        error: "not found",
                        ok: false,
                        message: "term not found",
                    })
                    .end(() => {
                        // log
                    });
            } else {
                res.status(200)
                    .json({
                        data: result,
                        status: 200,
                        error: null,
                        ok: true,
                        message: "term updated successfully",
                    })
                    .end(() => {
                        // log
                    });
            }
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: error,
                    ok: false,
                    message: "premission denied (only edu manager can access)",
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
                message: "error in updating term",
            })
            .end(() => {
                // log
            });
    }
};

export const deleteTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const result = await deleteTerm(req.params.id);
            if (!result) {
                res.status(404)
                    .json({
                        data: null,
                        status: 404,
                        error: "not found",
                        ok: false,
                        message: "term not found",
                    })
                    .end(() => {
                        // log
                    });
            } else {
                res.status(200)
                    .json({
                        data: null,
                        status: 200,
                        error: null,
                        ok: true,
                        message: "term deleted successfully",
                    })
                    .end(() => {
                        // log
                    });
            }
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: error,
                    ok: false,
                    message: "premission denied (only edu manager can access)",
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
                message: "error in deleting term",
            })
            .end(() => {
                // log
            });
    }
};

export const addCourseToTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user.__t === "edumanager") {
            const result = await addCourseToTerm(
                req.params.id,
                req.body.courseId
            );
            if (!result) {
                res.status(404)
                    .json({
                        data: null,
                        status: 404,
                        error: "not found",
                        ok: false,
                        message: "term or course not found",
                    })
                    .end(() => {
                        // log
                    });
            } else {
                res.status(200)
                    .json({
                        data: result,
                        status: 200,
                        error: null,
                        ok: true,
                        message: "course added successfully",
                    })
                    .end(() => {
                        // log
                    });
            }
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: error,
                    ok: false,
                    message: "premission denied (only edu manager can access)",
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
                message: "error in adding course to term",
            })
            .end(() => {
                // log
            });
    }
};

export const addCoursesToTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user.__t === "edumanager") {
            const result = await addCoursesToTerm(
                req.params.id,
                req.body.courseIds
            );
            if (!result) {
                res.status(404)
                    .json({
                        data: null,
                        status: 404,
                        error: "not found",
                        ok: false,
                        message: "term or course not found",
                    })
                    .end(() => {
                        // log
                    });
            } else {
                res.status(200)
                    .json({
                        data: result,
                        status: 200,
                        error: null,
                        ok: true,
                        message: "course added successfully",
                    })
                    .end(() => {
                        // log
                    });
            }
        } else {
            res.status(403)
                .json({
                    data: null,
                    status: 403,
                    error: error,
                    ok: false,
                    message: "premission denied (only edu manager can access)",
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
                message: "error in adding course to term",
            })
            .end(() => {
                // log
            });
    }
};

export const addUserToTermHandler = async (req, res) => {
    try {
        const result = await addUserToTerm(req.params.id, req.body.userId);
        if (!result) {
            res.status(404)
                .json({
                    data: null,
                    status: 404,
                    error: "not found",
                    ok: false,
                    message: "term or user not found",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(200)
                .json({
                    data: result,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "user added to term successfully",
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
                message: "error in adding user to term",
            })
            .end(() => {
                // log
            });
    }
};

export const removeCourseFromTermHandler = async (req, res) => {
    try {
        const result = await removeCourseFromTerm(
            req.params.id,
            req.body.courseId
        );
        if (!result) {
            res.status(404)
                .json({
                    data: null,
                    status: 404,
                    error: "not found",
                    ok: false,
                    message: "term or course not found",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(200)
                .json({
                    data: result,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "course removed from term successfully",
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
                message: "error in removing course from term",
            })
            .end(() => {
                // log
            });
    }
};

export const removeUserFromTermHandler = async (req, res) => {
    try {
        const result = await removeUserFromTerm(req.params.id, req.body.userId);
        if (!result) {
            res.status(404)
                .json({
                    data: null,
                    status: 404,
                    error: "not found",
                    ok: false,
                    message: "term or user not found",
                })
                .end(() => {
                    // log
                });
        } else {
            res.status(200)
                .json({
                    data: result,
                    status: 200,
                    error: null,
                    ok: true,
                    message: "user removed from term successfully",
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
                message: "error in removing user from term",
            })
            .end(() => {
                // log
            });
    }
};

export const getCoursesPreRegistrationsForTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            const preregistrations = await getCoursesPreRegistrationsForTerm(
                req.params.id
            );
            res.status(200)
                .json({
                    data: preregistrations.slice(
                        page * limit,
                        (page + 1) * limit
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
                    error: error,
                    ok: false,
                    message: "error in get terms",
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
                message: "error in get terms",
            })
            .end(() => {
                // log
            });
    }
};

export const getCoursesRegistrationsForTermHandler = async (req, res) => {
    try {
        const user = await getUser(req.authData.id);
        if (user) {
            const page = Number(req.query.page ?? 0);
            const limit = Number(req.query.limit ?? 0);
            const preregistrations = await getCoursesRegistrationsForTerm(
                req.params.id
            );
            res.status(200)
                .json({
                    data: preregistrations.slice(
                        page * limit,
                        (page + 1) * limit
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
                    error: error,
                    ok: false,
                    message: "error in get terms",
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
                message: "error in get terms",
            })
            .end(() => {
                // log
            });
    }
};
