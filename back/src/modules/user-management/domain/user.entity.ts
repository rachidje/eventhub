import { Role } from "./role.enum"

interface UserProps {
    id: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: Role
}

export class User {
    constructor(public props: UserProps) {}

    async validateOrThrow(): Promise<void> {
        if(!this.props.firstname) {
            throw new Error("Firstname is required")
        }

        if(!this.props.lastname) {
            throw new Error("Lastname is required")
        }

        if(!this.props.email) {
            throw new Error("Email is required")
        }

        if(!this.props.password) {
            throw new Error("Password is required")
        }
    }
}