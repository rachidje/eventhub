import { v4 } from "uuid";
import { IIdGenerator } from "../application/ports/id-generator.interface";

export class UuidGenerator implements IIdGenerator {
    generate(): string {
        return v4()
    }
}