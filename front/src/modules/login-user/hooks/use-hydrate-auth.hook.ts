import { useAppDispatch } from "@eventhub/store/store";
import axios from "axios";
import { useEffect } from "react";
import { authSlice } from "../store/login-user.slice";

export const useHydrateAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
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
            } catch {
                dispatch(authSlice.actions.logout());
            }
        })();
    }, []);
};