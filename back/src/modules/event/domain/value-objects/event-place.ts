export interface EventPlaceProps {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
}

export class EventPlace {
    constructor(private props: EventPlaceProps) {}

    hasVenueName(name: string): boolean {
        return this.props.name === name
    }

    equals(eventPlace: EventPlace): boolean {
        return this.props.name === eventPlace.props.name
            && this.props.address === eventPlace.props.address
            && this.props.city === eventPlace.props.city
            && this.props.postalCode === eventPlace.props.postalCode
            && this.props.country === eventPlace.props.country
    }
}