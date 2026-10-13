import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./appSlice.ts"
import { tasksReducer } from "@/features/todolists/model/tasks-slice"
import { todolistsReducer } from "@/features/todolists/model/todolists-slice"
import { authReducer } from "@/features/model/auth-slice.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "@/app/baseApi.ts"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todolistsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)