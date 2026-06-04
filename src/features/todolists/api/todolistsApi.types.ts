import { z } from "zod"
import { todolistSchema } from "./schema"

export type Todolist = z.infer<typeof todolistSchema>