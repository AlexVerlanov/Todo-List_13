import { z } from "zod"
import { TaskPriority, TaskStatus } from "@/common/enums"
import { DomainTaskSchema } from "@/features/auth/model/schema.ts"

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
})
export const updateTaskModelSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
})
export const getTasksResponseSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number(),
  items: z.array(DomainTaskSchema),
})

