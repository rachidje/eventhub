import type { Dependencies } from "@eventhub/store/dependencies";
import { createStore, type AppStore } from "@eventhub/store/store";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
        };
    }
}

export const app = new App();