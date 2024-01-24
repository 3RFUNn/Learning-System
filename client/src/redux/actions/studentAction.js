import axios from "axios";
import { studentActions } from "../reducers/student-slice";
import { baseUri } from "../../configs/globals";
const token = localStorage.getItem("token");

const headers = { authorization: "Bearer " + token };

/* create new student */
export const createNewStudent = (req) => {
    //done
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}admin/student`, req.body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();

            if (data) {
                dispatch(studentActions.studentsDataUpdate(data.data));
                dispatch(studentActions.successCreate());

                const successMsg = {
                    notifType: "success",
                    txt: "با موفقیت اضافه شد",
                };
                return successMsg;
            }
        } catch (error) {
            const errorMsg = {
                notifType: "error",
                txt: "عملیات ناموفق بود",
                content: error,
            };
            return errorMsg;
        }
    };
};

/* modify student */
export const modifyStudent = (req) => {
    //done
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.put(`${baseUri}admin/student/${req?.id}`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(studentActions.successModify());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get student */
export const getStudent = (req) => {
    return async (dispatch) => {
        const request = async () => {
            if (req.userType === "itmanager") {
                const response = await axios.get(`${baseUri}admin/student/${req?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            } else {
                const response = await axios.get(`${baseUri}student/${req?.id}`, {
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
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get students */
export const getStudentsList = ({ page, limit }) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}students`, {
                params: {
                    page,
                    limit,
                },
                headers,
            });
            return response;
        };

        try {
            const data = await request();
            console.log(data);
            if (data) {
                dispatch(
                    studentActions.fetchStudents({ students: data?.data?.data, pagination: data?.data?.pagination }),
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* delete student */
export const deleteStudent = (req) => {
    //done
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.delete(`${baseUri}admin/student/${req}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(studentActions.studentsDelete(req));
                dispatch(studentActions.successDelete());
            }
        } catch (error) {
            console.log(error);
        }
    };
};
