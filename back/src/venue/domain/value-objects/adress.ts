// venue/domain/value-objects/adress.ts
export interface AddressProps {
    street: string
    postalCode: string
    city: string
    country: string
}

export class Address {
    constructor(private props: AddressProps) {}
}