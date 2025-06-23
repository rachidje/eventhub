interface UserProps {
    id: string
}

export class Organizer {
    constructor(private props: UserProps) {}

    hasSameIdAs(organizer: Organizer): boolean {
        return this.props.id === organizer.props.id
    }
}