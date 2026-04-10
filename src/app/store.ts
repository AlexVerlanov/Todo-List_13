import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./app-reducer"
import { tasksReducer } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer } from "@/features/todolists/model/todolists-slice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch