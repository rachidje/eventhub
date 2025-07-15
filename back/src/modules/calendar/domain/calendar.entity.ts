import { Slot, SlotDates } from "./value-objects/slot";


export class Calendar {
    private slots: Slot[] = []

    constructor(
        public readonly venueId: string, existingSlots: Slot[] = []
    ) {
        this.slots = existingSlots
    }

    addSlot(dates: SlotDates) {
        const newSlot = new Slot({...dates, venueId: this.venueId})

        if(this.hasConflictWith(newSlot)) {
            throw new Error("Slot conflicts with existing one")
        }

        this.slots.push(newSlot)
    }

    hasConflictWith(candidate: Slot): boolean {
        return this.slots.some(slot => slot.conflictsWith(candidate))
    }

    getSlots(): Slot[] {
        return [...this.slots]
    }
}