import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "@/app/baseApi.ts"
import { BaseQueryArg } from "@reduxjs/toolkit/query"

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(task: DomainTask) {
    const { id, todoListId } = task
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todoListId}/tasks/${id}`,task)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}



export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => ({
        method: "GET",
        url: `/todo-lists/${todolistId}/tasks`,
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({ method: "post", url: `/todo-lists/${todolistId}/tasks`, body: { title } }),
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation<BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: Partial<UpdateTaskModel> }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: "DELETE",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),  invalidatesTags: ["Task"],
    }),
  }),
})

export const  {useGetTasksQuery,useCreateTaskMutation,useUpdateTaskMutation,useDeleteTaskMutation} = tasksApi