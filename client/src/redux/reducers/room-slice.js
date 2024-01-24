import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    room: {
        roomNumber: "",
        capacity: "",
        currentResidents: [""],
        isActive: Boolean,
    },
    rooms: [],
    pagination: {},
};

export const roomsSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        updateRoom: (state, action) => {
            const roomIdToUpdate = action.payload.room._id;
            const newResidents = action.payload.room.currentResidents;

            const updatedRooms = state.rooms.map((room) => {
                if (room._id === roomIdToUpdate) {
                    return {
                        ...room,
                        currentResidents: newResidents,
                    };
                }
                return room;
            });

            state.rooms = updatedRooms;
            return state;
        },

        setPagination: (state, action) => {
            if (action.payload.page) {
                state.pagination.page = action.payload?.page;
            }
            if (action.payload.pageSize) {
                state.pagination.pageSize = action.payload.pageSize;
            }
            return state;
        },

        getAllRooms: (state, action) => {
            state.rooms = action.payload.data;
            state.pagination = action.payload.pagination;
            return state;
        },
        setRoomActivity: (state, action) => {
            const roomIdToUpdate = action.payload._id;
            const newIsActive = action.payload.isActive;

            const updatedRooms = state.rooms.map((room) => {
                if (room._id === roomIdToUpdate) {
                    return {
                        ...room,
                        isActive: newIsActive,
                    };
                }
                return room;
            });

            state.rooms = updatedRooms;
            return state;
        },
        updateResidents: (state, action) => {
            const updatedResidents = state.rooms.map((room) => {
                if (room._id === action.payload._id) {
                    return action.payload;
                } else {
                    return room;
                }
            });
            state.rooms = updatedResidents;
            return state;
        },

        deleteStudentFromRoom: (state, action) => {
            state.rooms = state.rooms.map((room) => {
                if (room._id !== action.payload.roomId) return room;
                return {
                    ...room,
                    currentResidents: room.currentResidents.filter((res) => res._id !== action.payload.studentId),
                };
            });

            console.log(state.rooms);

            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const roomActions = roomsSlice.actions;
export const roomReducer = roomsSlice.reducer;
