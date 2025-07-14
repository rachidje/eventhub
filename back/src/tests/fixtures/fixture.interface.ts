import { DIContainer } from "types/di-container";

export interface IFixture {
    load(container: DIContainer): Promise<void>;
}