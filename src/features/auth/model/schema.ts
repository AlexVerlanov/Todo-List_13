import * as z from "zod"
import { TaskPriority, TaskStatus } from "@/common/enums"

export const DomainTaskSchema = z.object ({
  description: z.string(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string(),
  deadline: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.string(),

})
