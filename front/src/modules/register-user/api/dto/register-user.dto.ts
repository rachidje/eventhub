import type { RegisterModel } from "../../domain/model/register-model"

export type RegisterUserDto = {
    firstname: string
    lastname: string
    email: string
    password: string
    role: RegisterModel.Role
}