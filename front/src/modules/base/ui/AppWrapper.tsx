import React from "react";
import { Provider } from "react-redux";
import { app } from "../main";
import { DependenciesProvider } from "./DependenciesProvider";
import { Hydrater } from "./components/Hydrater";

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={app.store}>
            <DependenciesProvider dependencies={app.dependencies}>
                <Hydrater>{children}</Hydrater>
            </DependenciesProvider>
        </Provider>
    )
};