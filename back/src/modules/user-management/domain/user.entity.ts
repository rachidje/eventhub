import { Role } from "./role.enum"

interface UserProps {
    id: string
    firstname: string
    lastname: string
    email: string
    password: string
    roles: Role[]
}

export class User {
    constructor(public props: UserProps) {}
}