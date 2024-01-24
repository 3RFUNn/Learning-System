import axios from "axios";
import { courseActions } from "../reducers/course-slice";
import { termActions } from "../reducers/term-slice";
import { baseUri } from "../../configs/globals";
const token = localStorage.getItem("token");

export const createNewTerm = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}term`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(courseActions.coursesDataUpdate(data?.data?.data));
                dispatch(courseActions.successCreate());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* modify student */
export const modifyTerm = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.put(`${baseUri}term/${req}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(courseActions.courseDataUpdate(data?.data?.data));
                dispatch(courseActions.successModify());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get term */
export const getTerm = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}term/${req.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                console.log(data);
                dispatch(termActions.termDataUpdate(data?.data?.data));
                dispatch(courseActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get terms */
export const getTermsList = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}terms`, {
                headers: {
                    Authorization: `Bearer ${req?.token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(termActions.termsDataUpdate(data?.data?.data));
                dispatch(courseActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* delete student */
export const deleteTerm = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.delete(`${baseUri}term/${req?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(courseActions.successCreate());
            }
        } catch (error) {
            console.log(error);
        }
    };
};
