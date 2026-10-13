import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { baseApi } from "@/app/baseApi.ts"

console.log("API_KEY:", import.meta.env.VITE_API_KEY)
console.log("BASE_URL:", import.meta.env.VITE_BASE_URL)
console.log("TOKEN:", localStorage.getItem(AUTH_TOKEN))
export const todolistsApi = baseApi.injectEndpoints({
  // `reducerPath` - имя `slice`, куда будут сохранены состояние и экшены для этого `API`
  // reducerPath: "todolistsApi",
  // `baseQuery` - конфигурация для `HTTP-клиента`, который будет использоваться для отправки запросов
 /* baseQuery: fetchBaseQuery({
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
  }),*/
  // tagTypes:['Todolists'],
  // `endpoints` - метод, возвращающий объект с эндпоинтами для `API`, описанными
  // с помощью функций, которые будут вызываться при вызове соответствующих методов `API`
  // (например `get`, `post`, `put`, `patch`, `delete`)
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => ({ method: "GET", url: "/todo-lists" }),
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => {
          return { ...tl, filter: "all", entityStatus: "idle" }
        })
      }, providesTags:["Todolists"],
    }),

    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({ method: "post", url: "/todo-lists",
        body: { title } }),
    invalidatesTags:["Todolists"]
    }),

    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({ method: "delete", url: `/todo-lists/${id}` }),
      invalidatesTags:["Todolists"]
    }),
    changeTodolistTitle: builder.mutation<BaseResponse, {id:string, title:string}>({
      query: ({ id, title }) =>
        ({ method: "put", url: `/todo-lists/${id}`,
        body: { id, title } }),
      invalidatesTags:["Todolists"]
    }),
  }),
})

export const { useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,useLazyGetTodolistsQuery} = todolistsApi

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