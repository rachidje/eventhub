import { IPasswordPolicy, PasswordValidationResult } from "../ports/password-policy.interface"

export class BasicPasswordPolicy implements IPasswordPolicy {
    validate(password: string): PasswordValidationResult {
        const reasons: string[] = []

        if (password.length < 8) reasons.push("Too short")
        if (!/[A-Z]/.test(password)) reasons.push("Missing uppercase letter")
        if (!/[0-9]/.test(password)) reasons.push("Missing digit")
        if (!/[^a-zA-Z0-9]/.test(password)) reasons.push("Missing special char")

        return {
        valid: reasons.length === 0,
        reasons
        }
    }
}
