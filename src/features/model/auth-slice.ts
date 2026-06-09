


import { createAppsSlice } from "@/common/utils/createAppslice.ts"

import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { LoginInputs } from "@/features/auth/model/shema.ts"
import { changeStatusAC } from "@/app/appSlice.ts"
import { authApi } from "@/features/auth/api/authApi.ts"
import { ResultCodeObj } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { RootState } from "@/app/store.ts"
import { clearDataAC } from "@/common/actions"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, DomainTask[]>

const initialState = {
  isLoggedIn: false,
  login: null as string | null,
}
// export const selectLogin = (state: RootState) => state.auth.login

export const authSlice = createAppsSlice({
  name: "auth",
  initialState,
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectLogin: (state) => state.login,
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
            localStorage.setItem(AUTH_TOKEN, token)
                    return {isLoggedIn: true}
          }else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }

        } catch (error:any) {

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
    logoutTC: create.asyncThunk(
      async (_, { rejectWithValue,dispatch }) => {
        try {
          dispatch(changeStatusAC({status:'loading'}))
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCodeObj.Success){
            dispatch(changeStatusAC({status:'succeeded'}))

            localStorage.removeItem(AUTH_TOKEN)
            dispatch(clearDataAC())
            localStorage.removeItem(AUTH_TOKEN)
            return {isLoggedIn: false,  login: null,}

          }else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }

        } catch (error:any) {

          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)

        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
          state.login = action.payload.login
        }
      },
    ),

    meTC: create.asyncThunk(
      async (_, { rejectWithValue,dispatch }) => {
        try {
          dispatch(changeStatusAC({status:'loading'}))
          // await new Promise(resolve => setTimeout(resolve, 3000))
          const res = await authApi.me()
          if (res.data.resultCode === ResultCodeObj.Success){
            dispatch(changeStatusAC({status:'succeeded'}))
            return {isLoggedIn: true,  login: res.data.data.login,}

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
          state.login = action.payload.login
        },
      },
    ),
  }),


})




export const { loginTC,logoutTC,meTC} = authSlice.actions

export const { selectIsLoggedIn,selectLogin  } = authSlice.selectors


export const authReducer = authSlice.reducer