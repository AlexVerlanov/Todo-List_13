import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"
import { RootState } from "@/app/store.ts"



export type ThemeMode = "dark" | "light"

type NullishError = string | null
export const appSlice = createSlice({
  name:"app",
  initialState:  {
    themeMode: "light" as ThemeMode,
    status: 'idle' as RequestStatus,
    error:null as NullishError,
  },
/*  selectors:{
/!*    selectThemeMode: (state: RootState): ThemeMode => state.app.themeMode*!/
    selectThemeMode:(state) => state.themeMode,
    selectStatus:(state) => state.status,
    selectAppError:(state) => state.error

  },*/
  reducers:(create)=>{
    return {
      setAppErrorAc:create.reducer<{error: null | string}> ((state, action)=>{
        state.error = action.payload.error
      }),
      changeThemeModeAC: create.reducer<{ themeMode:ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
      changeStatusAC: create.reducer<{ status:RequestStatus }>((state, action) => {
        state.status = action.payload.status
      }),
    }
  }
})
export const appReducer = appSlice.reducer
export const {changeThemeModeAC,changeStatusAC,setAppErrorAc} = appSlice.actions
/*export const {selectThemeMode,selectStatus,selectAppError} = appSlice.selectors*/

export const selectThemeMode = (state: RootState) => state.app.themeMode

export const selectStatus = (state: RootState) => state.app.status

export const selectAppError = (state: RootState) => state.app.error



