import { configureStore } from "@reduxjs/toolkit"
import room from "./modules/room"

export default configureStore({
    reducer: {
        room
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
