import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    date: string

    @IsString()
    @IsNotEmpty()
    startTime: string

    @IsString()
    @IsNotEmpty()
    endTime: string

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