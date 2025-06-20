interface UserProps {
    id: string
}

export class User {
    constructor(private props: UserProps) {}
}