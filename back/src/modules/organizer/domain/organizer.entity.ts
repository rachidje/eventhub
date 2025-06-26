interface UserProps {
    id: string
    email: string
    password: string
}

export class Organizer {
    constructor(public props: UserProps) {}
}