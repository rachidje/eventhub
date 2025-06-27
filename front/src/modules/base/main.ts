import type { Dependencies } from "@eventhub/store/dependencies";
import { createStore, type AppStore } from "@eventhub/store/store";
import { InMemoryFetchVenuesApi } from "../create-event/api/in-memory-fetch-venues.api";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            fetchVenues: new InMemoryFetchVenuesApi()
        };
    }
}

export const app = new App();