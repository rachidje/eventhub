import { Alert, Box, Button, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
import type React from "react";
import { useLoginForm } from "../../hooks/use-login-form.hook";

export const LoginForm: React.FC<{}> = () => {
    const hook = useLoginForm();

    return (
        <Box>
            <Typography mb={6} textAlign="center" variant="h5" fontWeight={700}>Connection</Typography>

            {
                hook.networkError && (
                    <Alert severity="error">
                        {hook.networkError}
                    </Alert>
                )
            }

            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <TextField
                        required
                        helperText={hook.errors.email}
                        value={hook.form.email}
                        onChange={(e) => hook.updateField("email", e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <TextField
                        required
                        type="password"
                        helperText={hook.errors.password}
                        value={hook.form.password}
                        onChange={(e) => hook.updateField("password", e.target.value)}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    onClick={hook.submit}
                    disabled={!hook.isSubmittable}
                >
                    Se connecter
                </Button>
            </Stack>
        </Box>
    )
}