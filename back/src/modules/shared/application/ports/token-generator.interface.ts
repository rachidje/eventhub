export interface ITokenGenerator {
    generate(payload: any): Promise<string>;
}