import { createSlice } from "@reduxjs/toolkit"
export const slice = createSlice({
    name: "room",
    initialState: {
        activeRoom: '',
    },
    reducers: {
        setActiveRoom: (state, action) => {
            state.activeRoom = action.payload
        },
    },
})

export const { setActiveRoom } = slice.actions
export default slice.reducer
