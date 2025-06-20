export interface EventPlaceProps {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
    latitude: number
    longitude: number
}

export class EventPlace {
    constructor(private props: EventPlaceProps) {}

    equals(eventPlace: EventPlace): boolean {
        return this.props.name === eventPlace.props.name
            && this.props.address === eventPlace.props.address
            && this.props.city === eventPlace.props.city
            && this.props.postalCode === eventPlace.props.postalCode
            && this.props.country === eventPlace.props.country
            && this.props.latitude === eventPlace.props.latitude
            && this.props.longitude === eventPlace.props.longitude
    }
}