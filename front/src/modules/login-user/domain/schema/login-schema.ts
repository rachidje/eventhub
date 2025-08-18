import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string()
})

export type LoginUserSchema = z.infer<typeof LoginSchema>