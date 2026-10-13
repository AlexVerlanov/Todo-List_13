import type { BaseResponse } from "@/common/types"
import { LoginInputs } from "@/features/auth/model/shema.ts"
import { instance } from "@/common/instance"
import { baseApi } from "@/app/baseApi.ts"



export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<{userId: number; token:string }>, LoginInputs>({
      query: (payload) =>
        ({ method: "post", url: "/auth/login", body: payload,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () =>
        ({ method: "delete", url: "/auth/login", }),
    }),
    me: builder.query<BaseResponse<{id:number; email: string, login: string}>, void>({
      query: () => ({ method: "get", url: "/auth/me", }),
    }),
  }),
})

export const {useLoginMutation,useLogoutMutation,useMeQuery} = authApi

export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{userId: number; token:string }>>("/auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("/auth/login")
  },
  me() {
    return instance.get<BaseResponse<{id:number; email: string, login: string}>>("/auth/me")
  },
}

