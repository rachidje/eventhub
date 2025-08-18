import { InMemoryFetchVenuesApi } from "@eventhub/modules/create-event/api/in-memory-fetch-venues.api";
import { SaveEventApi } from "@eventhub/modules/create-event/api/save-event.api";
import type { Dependencies } from "@eventhub/store/dependencies";
import { createStore, type AppState } from "@eventhub/store/store";
import { MockLoginGateway } from "../login-user/tests/mock-login.gateway";
import { MockRegisterGateway } from "../register-user/tests/mock.register-gateway";

/**
 * Create testing dependencies with provided defaults
 * @param dependencies
 * @returns
 */
const createDependencies = (
  dependencies?: Partial<Dependencies>
): Dependencies => ({
  fetchVenues: new InMemoryFetchVenuesApi(),
  saveEvent: new SaveEventApi(),
  registerGateway: new MockRegisterGateway(),
  loginUserApi: new MockLoginGateway(),
  ...dependencies,
});

/**
 * Creates store initialized with a partial state
 * @param config
 * @returns
 */
export const createTestStore = (config?: {
  initialState?: Partial<AppState>;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialStore = createStore({
    dependencies: createDependencies(config?.dependencies),
  });

  const initialState = {
    ...initialStore.getState(),
    ...config?.initialState,
  };

  const store = createStore({
    initialState,
    dependencies: createDependencies(config?.dependencies),
  });

  return store;
};

/**
 * Useful for testing selectors without setting redux up
 * @param partialState
 * @returns
 */
export const createTestState = (partialState?: Partial<AppState>) => {
  const store = createStore({
    dependencies: createDependencies(),
  });

  const storeInitialState = store.getState();

  const merged = {
    ...storeInitialState,
    ...partialState,
  };

  return createTestStore({ initialState: merged }).getState();
};
