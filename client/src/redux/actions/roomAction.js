import axios from "axios";
import { baseUri } from "../../configs/globals";
import { roomActions } from "../reducers/room-slice";
import toast from "react-hot-toast";

const token = localStorage.getItem("token");

const headers = { authorization: "Bearer " + token };

export const getRooms = (queries) => {
    return async (dispatch) => {
        const request = async () => {
            let pageSize = 10;
            let page = 1;
            if (queries) {
                pageSize = queries.pageSize;
                page = queries.page;
            }

            const response = await axios.get(`${baseUri}rooms`, {
                headers: headers,
                params: {
                    pageSize: pageSize,
                    page: page,
                },
            });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(roomActions.getAllRooms(data?.data));
            }
        } catch (error) {
            toast.error("خطا هنگام دریافت اطلاعات اتاق ها");
        }
    };
};

export const AddStudentToRoom = (id, studentIds) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}rooms/${id}/student`, { studentIds }, { headers });
            return response;
        };

        try {
            const data = await request();
            toast.success("دانشجو با موفقیت به اتاق اضافه شد");
            if (data) {
                dispatch(roomActions.updateResidents(data?.data?.data));
            }
        } catch (error) {
            toast.error("خطا هنگام اضافه کردن دانشجو به اتاق");
        }
    };
};

export const DeleteStudentFromRoom = (req) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.delete(`${baseUri}rooms/${req.id}/student`, {
                params: req.studentId,
                headers: headers,
            });
            return response;
        };

        try {
            const data = await request();
            toast.success("با موفقیت از اتاق حذف شد");
            if (data) {
                dispatch(roomActions.deleteStudentFromRoom({ roomId: req.id, studentId: req.studentId.studentId }));
            }
        } catch (error) {
            toast.error("خطا هنگام حذف دانشجو از اتاق");
        }
    };
};

export const toggleRoomActive = (roomId) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.post(`${baseUri}rooms/toggle-active`, { roomId }, { headers });
            return response;
        };

        try {
            const data = await request();
            toast.success("وضعیت اتاق با موفقیت تغییر یافت");
            if (data) {
                dispatch(roomActions.setRoomActivity(data?.data?.data));
            }
        } catch (error) {
            toast.error("خطا هنگام تغییر وضعیت اتاق");
        }
    };
};

export const searchBetweenRooms = (params) => {
    return async (dispatch) => {
        const request = async () => {
            const response = await axios.get(`${baseUri}rooms`, { headers, params });
            return response;
        };

        try {
            const data = await request();
            if (data?.data) {
                dispatch(roomActions.getAllRooms(data?.data));
            }
        } catch (error) {
            toast.error("خطا هنگام جستجوی کتاب ها");
        }
    };
};
