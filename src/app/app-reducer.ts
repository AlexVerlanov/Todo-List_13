import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"



export type ThemeMode = "dark" | "light"


export const appSlice = createSlice({
  name:"app",
  initialState:  {
    themeMode: "light" as ThemeMode,
    status: 'idle' as RequestStatus,
    error:null as null | string,
  },
  selectors:{
/*    selectThemeMode: (state: RootState): ThemeMode => state.app.themeMode*/
    selectThemeMode:(state) => state.themeMode,
    selectStatus:(state) => state.status

  },
  reducers:(create)=>{
    return {
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
export const {changeThemeModeAC,changeStatusAC} = appSlice.actions
export const {selectThemeMode,selectStatus} = appSlice.selectors





/*
export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")

const initialState = {
  themeMode: "light" as ThemeMode,
}

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode
  })
})*/

