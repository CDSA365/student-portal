import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    is_logged_in: boolean;
    [x: string]: any;
}

const initialState: IUser = {
    is_logged_in: false,
};

/* Creating a slice of the Redux store. */
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (_, action) => ({
            id: action.payload.id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            is_logged_in: true,
        }),
        removeUser: () => initialState,
    },
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
