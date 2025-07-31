import { z } from "zod";

const passwordPolicy = z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .refine((val) => /[A-Z]/.test(val), {
            message: "Le mot de passe doit contenir au moins une majuscule"
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Le mot de passe doit contenir au moins un chiffre"
        })
        .refine((val) => /[^a-zA-Z0-9]/.test(val), {
            message: "Le mot de passe doit contenir au moins un caractère spécial"
        });

export const RegisterSchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    email: z.string().email("Email invalide"),
    password: passwordPolicy,
    role: z.enum(["organizer", "participant"], {
        message: "Le rôle doit être 'organizer' ou 'participant'"
    })
})

export type RegisterUserSchema = z.infer<typeof RegisterSchema>