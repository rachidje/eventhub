import { ITokenGenerator } from "@shared/application/ports/token-generator.interface";
import jwt from "jsonwebtoken";

export class JwtTokenGenerator implements ITokenGenerator {
    constructor(private readonly jwtSecret: string) {}

    async generate(payload: any) {
        return jwt.sign(payload, this.jwtSecret);
    }
}