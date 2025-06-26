export interface SlotProps {
    start: Date
    end: Date
    venueId: string
}

export class Slot {
    constructor(public props: SlotProps) {}

}