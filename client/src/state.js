import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    id: "",
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {

        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },

        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        setId: (state, action) => {
            state.id = action.payload.id;
        },

        setLogout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setMode, setCredentials, setId, setLogout } = globalSlice.actions;
export default globalSlice.reducer;