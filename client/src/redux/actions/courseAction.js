import axios from "axios";
import { courseActions } from "../reducers/course-slice";
import { baseUri } from "../../configs/globals";
const token = localStorage.getItem("token");

/* create new student */
export const createNewCourse = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}course`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const { data } = await request();
            if (data) {
                dispatch(courseActions.studentDataUpdate());
                dispatch(courseActions.successCreate());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* modify student */
export const modifyCourse = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.put(`${baseUri}course/${req}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const { data } = await request();
            if (data) {
                dispatch(courseActions.studentDataUpdate());
                dispatch(courseActions.successModify());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get student */
export const getCourse = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}course/${req?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(courseActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get students */
export const getCoursesList = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}courses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(courseActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* delete student */
export const deleteCourse = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.delete(`${baseUri}course/${req?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(courseActions.successDelete());
            }
        } catch (error) {
            console.log(error);
        }
    };
};
