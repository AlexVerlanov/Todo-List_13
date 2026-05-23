import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email("Incorrect email"),
  password:z.string().min(3, 'Das Passwort muss länger als 3 Zeichen sein.'),
  rememberMe:z.boolean(),
})