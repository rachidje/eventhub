import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsDateString()
    @IsNotEmpty()
    start: Date

    @IsDateString()
    @IsNotEmpty()
    end: Date

    @IsString()
    @IsNotEmpty()
    venueName: string

    @IsNumber()
    @IsNotEmpty()
    capacity: number

    @IsNumber()
    @IsNotEmpty()
    price: number
}