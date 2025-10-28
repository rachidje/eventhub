import { useAppDispatch, type AppState } from "@eventhub/store/store";
import axios from "axios";
import { useEffect, useRef } from "react";
import { authSlice } from "../store/login-user.slice";
import { useSelector } from "react-redux";

export const useHydrateAuth = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const hasHydrated = useRef(false);

    useEffect(() => {
        (async () => {
            if (hasHydrated.current || isAuthenticated) {
                return;
            }

            hasHydrated.current = true;

            try {
                const response = await axios.get("/api/v1/user/me", {
                    withCredentials: true
                });

                const {userId, email, role} = response.data.data;

                dispatch(authSlice.actions.hydrateAuth({
                    email,
                    role,
                    userId,
                }));
            } catch (error) {
                if (axios.isAxiosError(error) && 
                    (error.response?.status === 401 || error.response?.status === 403)) {
                    dispatch(authSlice.actions.logout());
                }
            }
        })();
    }, []);
};