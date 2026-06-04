import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./appSlice.ts"
import { tasksReducer } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer } from "@/features/todolists/model/todolists-slice"
import { authReducer } from "@/features/model/auth-slice.ts"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch