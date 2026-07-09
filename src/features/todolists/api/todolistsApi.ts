import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

console.log("API_KEY:", import.meta.env.VITE_API_KEY)
console.log("BASE_URL:", import.meta.env.VITE_BASE_URL)
console.log("TOKEN:", localStorage.getItem(AUTH_TOKEN))
export const todolistsApi = createApi({
  // `reducerPath` - имя `slice`, куда будут сохранены состояние и экшены для этого `API`
  reducerPath: "todolistsApi",
  // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(AUTH_TOKEN)

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => ({  method: "GET", url: "/todo-lists",
      }),
      transformResponse: (todolists:Todolist[]) => {
        debugger
        return todolists.map((tl)=>{
          return {...tl, filter: 'all', entityStatus: 'idle'}
        })
      },
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist, }>, string>({
      query: (title) => ({method: 'post', url:"/todo-lists", body:{ title }})
    }),
  }),
})

export const { useGetTodolistsQuery, useCreateTodolistMutation } = todolistsApi

export const _todolistsApi = {
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },

  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}