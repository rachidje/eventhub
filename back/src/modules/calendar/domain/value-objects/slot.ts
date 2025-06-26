export interface SlotProps {
    start: Date
    end: Date
    venueId: string
}

export class Slot {
    constructor(private props: SlotProps) {}

    id(): string {
        return this.props.venueId
    }
}