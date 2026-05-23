import * as z from "zod"
import { LoginSchema } from "@/features/auth/model/shema.ts"

export type LoginInputs = z.infer<typeof LoginSchema>