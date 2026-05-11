
import type { Dispatch } from '@reduxjs/toolkit'
import axios from "axios"
import { changeStatusAC, setAppErrorAc } from "@/app/appSlice.ts"

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch) =>
{
  let errorMessage

  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(setAppErrorAc({ error: errorMessage }))
  dispatch(changeStatusAC({ status: 'failed' }))
}