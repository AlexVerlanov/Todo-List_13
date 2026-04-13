import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

export const createAppsSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
})