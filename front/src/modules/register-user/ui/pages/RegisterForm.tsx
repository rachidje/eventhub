import { Alert, Box, Button, FormControl, FormLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import { useRegisterForm } from "../../hooks/use-register-form.hook";
import { SelectableRole } from "../components/SelectableRole";

export const RegisterForm = () => {
    const hook = useRegisterForm();

    return (
        <Box>
            <Typography mb={6} textAlign="center" variant="h5" fontWeight={700}>Inscription</Typography>

            {/* {
                hook.networkError && (
                    <Alert severity="error">
                        {hook.networkError}
                    </Alert>
                )
            } */}

            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Prénom</FormLabel>
                    <TextField
                        required
                        helperText={hook.errors.firstname}
                        value={hook.form.firstname}
                        onChange={(e) => hook.updateField("firstname", e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <TextField
                        required
                        helperText={hook.errors.lastname}
                        value={hook.form.lastname}
                        onChange={(e) => hook.updateField("lastname", e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <TextField
                        required
                        helperText={hook.errors.email}
                        type="email"
                        value={hook.form.email}
                        onChange={(e) => hook.updateField("email", e.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Mot de passe</FormLabel>
                    <TextField
                        required
                        helperText={hook.errors.password}
                        type="password"
                        value={hook.form.password}
                        onChange={(e) => hook.updateField("password", e.target.value)}
                    />
                </FormControl>

                <Typography mb={2} textAlign="center" variant="h6" fontWeight={700}>Vous êtes un :</Typography>
                <Grid container sx={{paddingTop: 2}} columnSpacing={2} rowSpacing={2} justifyContent={"center"}>
                    {
                        hook.allowedRoles.map(role => (
                            <Grid key={role.id} item xs={4}>
                                <SelectableRole
                                    title={role.title}
                                    isSelected= {hook.form.role === role.role}
                                    onSelect={() => hook.assignRole(role.role)}
                                />
                            </Grid>
                        ))
                    }
                </Grid>

                <Button
                    variant="contained"
                    onClick={hook.submit}
                    disabled={!hook.isSubmittable}
                >
                    S’inscrire
                </Button>
            </Stack>
        </Box>
    );
};