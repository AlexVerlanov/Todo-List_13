import type { BaseResponse } from "@/common/types"
import { LoginInputs } from "@/features/auth/model/shema.ts"
import { instance } from "@/common/instance"


export const authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{userId: number; token:string }>>("/auth/login", payload)
  },
}