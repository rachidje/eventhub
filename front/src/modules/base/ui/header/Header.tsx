import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import type { AppState } from "../../../../store/store";
import { Box, Link, Stack } from "@mui/material";

export const Header : React.FC<{}> = () => {
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);

    return (
        <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                {!isAuthenticated ? (
                    <>
                        <Link component={RouterLink} to="login" type="button">
                            Login
                        </Link>
                        <Link component={RouterLink} to="register">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link component={RouterLink} to="/create-event">
                            Projects
                        </Link>
                    </>
                )}
            </Stack>
        </Box>
    );
};
