export interface IPasswordPolicy {
    validate(password: string): PasswordValidationResult
}

export interface PasswordValidationResult {
    valid: boolean
    reasons?: string[]  // ex: ["Too short", "No symbol"]
}
