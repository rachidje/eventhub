import type { Dependencies } from "@eventhub/store/dependencies";
import { createStore, type AppStore } from "@eventhub/store/store";
import { InMemoryFetchVenuesApi } from "../create-event/api/in-memory-fetch-venues.api";
import { SaveEventApi } from "../create-event/api/save-event.api";
import { RegisterUserApi } from "../register-user/api/register-user.api";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            fetchVenues: new InMemoryFetchVenuesApi(),
            saveEvent: new SaveEventApi(),
            registerGateway: new RegisterUserApi()
        };
    }
}

export const app = new App();