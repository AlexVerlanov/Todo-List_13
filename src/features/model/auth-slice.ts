


import { createAppsSlice } from "@/common/utils/createAppslice.ts"

import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { LoginInputs } from "@/features/auth/model/shema.ts"
import { changeStatusAC } from "@/app/appSlice.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { ResultCodeObj } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, DomainTask[]>

const initialState: TasksState = {}

export const authSlice = createAppsSlice({
  name: "auth",
  initialState:{
    isLoggedIn :false
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },

  reducers: (create) => ({
   loginTC: create.asyncThunk(
      async (args: LoginInputs, { rejectWithValue,dispatch }) => {
        try {
          dispatch(changeStatusAC({status:'loading'}))
          const res = await authApi.login(args)
          if (res.data.resultCode === ResultCodeObj.Success){
            dispatch(changeStatusAC({status:'succeeded'}))
            const token = res.data.data.token
            localStorage.setItem("token", token)
                    return {isLoggedIn: true}
          }else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }

        } catch (error:any) {
          debugger
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)

        }
      },
      {
        fulfilled: (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn

        },
      },
    ),
  }),


})




export const { loginTC} = authSlice.actions

export const { selectIsLoggedIn } = authSlice.selectors


export const authReducer = authSlice.reducer