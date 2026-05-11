
import type { BaseResponse } from '@/common/types'
import type { Dispatch } from "@reduxjs/toolkit"
import { changeStatusAC, setAppErrorAc } from "@/app/appSlice.ts"

export const handleServerAppError = <T,>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAc({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAc({ error: 'Some error occurred' }))
  }
  dispatch(changeStatusAC({ status: 'failed' }))
}