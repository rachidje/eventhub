import {
    Box,
    Button,
    FormControl,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import { EventDatePicker } from "../components/EventDatePicker"
import { EventTimePicker } from "../components/EventTimePicker"

export const CreateEventPage: React.FC = () => {
    const today = new Date()

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
            Créer un événement
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
            <Stack spacing={3}>
            <TextField
                label="Nom de l'événement"
                fullWidth
                variant="outlined"
            />

            <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
            />

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                <EventDatePicker
                    date={today}
                    setDate={(date) => {}}
                />
                </Grid>
                <Grid item xs={12} md={4}>
                <EventTimePicker
                    label="Heure de début"
                    hour={today.getTime()}
                    setHour={(time) => {}}
                />
                </Grid>
                <Grid item xs={12} md={4}>
                <EventTimePicker
                    label="Heure de fin"
                    hour={today.getTime()}
                    setHour={(time) => {}}
                />
                </Grid>

                <Grid item xs={12} md={6}>
                <TextField
                    label="Prix (€)"
                    fullWidth
                    type="number"
                    inputProps={{ step: 0.01, min: 0 }}
                    variant="outlined"
                />
                </Grid>

                <Grid item xs={12} md={6}>
                <TextField
                    label="Capacité d'accueil"
                    fullWidth
                    type="number"
                    inputProps={{ step: 1, min: 1 }}
                    variant="outlined"
                />
                </Grid>
            </Grid>

            <Box textAlign="right" mt={2}>
                <Button
                variant="contained"
                color="primary"
                onClick={() => {}}
                disabled={true}
                >
                Créer
                </Button>
            </Box>
            </Stack>
        </Paper>
        </Box>
    )
}
