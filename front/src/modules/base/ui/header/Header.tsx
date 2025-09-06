import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, type AppState } from "../../../../store/store";
import { Box, Button, Link, Stack } from "@mui/material";
import { authActions } from "@eventhub/modules/login-user/store/login-user.slice";

export const Header : React.FC<{}> = () => {
    const { isAuthenticated, user } = useSelector((state: AppState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    
    return (
        <Box
        sx={{
            py: 2,
            px: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
        }}
        >
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
        >
            {!isAuthenticated ? (
            <Stack direction="row" spacing={2}>
                <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    color="primary"
                >
                Login
                </Button>
                <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    color="primary"
                >
                Register
                </Button>
            </Stack>
            ) : (
            <Stack direction="row" spacing={2}>
                {isAuthenticated && user?.role === "organizer" && (
                <Button
                    component={RouterLink}
                    to="/create-event"
                    variant="contained"
                    color="secondary"
                >
                    New Event
                </Button>
                )}
                <Button
                    component={RouterLink}
                    to="/events"
                    variant="outlined"
                    color="secondary"
                >
                My Events
                </Button>
                <Button
                    onClick={() => {
                        dispatch(authActions.logout());
                        navigate("/login");
                    }}
                    variant="outlined"
                    color="secondary"
                >
                Logout
                </Button>
            </Stack>
            )}
        </Stack>
        </Box>
    );
};
