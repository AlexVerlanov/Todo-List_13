import type { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { DomainTaskSchema } from "@/features/auth/model/schema.ts"
import * as z from "zod"

export type DomainTask = z.infer<typeof DomainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
