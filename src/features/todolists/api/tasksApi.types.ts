
import { DomainTaskSchema } from "@/features/auth/model/schema.ts"
import * as z from "zod"
import { getTasksResponseSchema, updateTaskModelSchema } from "@/features/todolists/api/schema.ts"

export type DomainTask = z.infer<typeof DomainTaskSchema>
export type UpdateTaskModel = z.infer<typeof updateTaskModelSchema>
export type GetTasksResponse = z.infer<typeof getTasksResponseSchema>

// export type GetTasksResponse = {
//   error: string | null
//   totalCount: number
//   items: DomainTask[]
// }

/*export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}*/
