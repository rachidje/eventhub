import { useHydrateAuth } from "@eventhub/modules/login-user/hooks/use-hydrate-auth.hook";

export const Hydrater: React.FC<{children: React.ReactNode}> = ({ children }) => {
    useHydrateAuth();
    return <>{children}</>
}