import axios from "axios";
import { managerActions } from "../reducers/manager-slice";
import { baseUri } from "../../configs/globals";
const token = localStorage.getItem("token");

export const createNewDepartment = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}admin/department`, req.body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
};

/* create new student */
export const createNewManager = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}admin/manager`, req.body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(managerActions.managersDataUpdate(data?.data?.data));
                dispatch(managerActions.successCreate());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* modify student */
export const modifyManager = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.put(`${baseUri}admin/manager/${req?.id}`, req, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(managerActions.successModify());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get student */
export const getManager = (req) => {
    return async (dispatch) => {
        const request = async () => {
            if (req.userType === "itmanager") {
                const response = await axios.get(`${baseUri}admin/manager/${req?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            } else {
                const response = await axios.get(`${baseUri}manager/${req?.id}`, {
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
                dispatch(managerActions.managerDataUpdate(data?.data?.data));
                dispatch(managerActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* get managers */
export const getManagersList = (req) => {
    return async (dispatch) => {
        const request = async () => {
            if (req?.userType === "itmanager") {
                const response = await axios.get(`${baseUri}admin/managers?page=${req?.page}&limit=${req?.limit}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response;
            } else {
                const response = await axios.get(`${baseUri}managers?page=${req?.page}&limit=${req?.limit}`, {
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
                dispatch(managerActions.managersDataUpdate(data.data?.data));
                dispatch(managerActions.successGet());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/* delete student */
export const deleteManager = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.delete(`${baseUri}admin/manager/${req}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data) {
                dispatch(managerActions.managersDelete(req));
                dispatch(managerActions.successDelete());
            }
        } catch (error) {
            console.log(error);
        }
    };
};
