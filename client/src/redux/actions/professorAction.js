import axios from "axios";
import { professorActions } from "../reducers/professor-slice";
import { baseUri } from "../../configs/globals";
const token = localStorage.getItem("token");

/* create new student */
export const createNewProfessor = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}admin/professor`, req.body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(professorActions.professorsDataUpdate(data?.data?.data));
                dispatch(professorActions.successCreate());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* modify student */
export const modifyProfessor = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.put(`${baseUri}admin/professor/${req?.id}`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(professorActions.successModify());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get student */
export const getProfessor = (req) => {
    return async (dispatch) => {
        const request = async () => {
            if (req?.userType === "itmanager") {
                const response = await axios.get(`${baseUri}admin/professor/${req?.id}`, req, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            } else {
                const response = await axios.get(`${baseUri}professor/${req?.id}`, req, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            }
        };

        try {
            const data = await request();
            if (data) {
                dispatch(professorActions.professorDataUpdate(data?.data?.data));
                dispatch(professorActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get students */
export const getProfessorList = (req) => {
    return async (dispatch) => {
        const request = async () => {
            if (req?.userType === "itmanager") {
                const response = await axios.get(`${baseUri}admin/professors?page=${req?.page}&limit=${req?.limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            } else if (req?.userType === "professors") {
                const response = await axios.get(`${baseUri}professors?page=${req?.page}&limit=${req?.limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            } else if (req?.userType === "edumanager") {
                const response = await axios.get(`${baseUri}professors?page=${req?.page}&limit=${req?.limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            }
        };

        try {
            const data = await request();
            if (data) {
                dispatch(professorActions.professorsDataUpdate(data.data?.data));
                dispatch(professorActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* delete student */
export const deleteProfessor = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.delete(`${baseUri}admin/professor/${req}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(professorActions.professorsDelete(req));
                dispatch(professorActions.successDelete());
            }
        } catch (error) {
            console.log(error);
        }
    };
};
