import * as z from "zod"
import { TaskPriority, TaskStatus } from "@/common/enums"

export const DomainTaskSchema = z.object ({
  description: z.string().nullable(),
  title: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({local:true}),
})