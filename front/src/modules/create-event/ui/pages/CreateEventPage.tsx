import {
    Alert,
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material"
import { EventDatePicker } from "../components/EventDatePicker"
import { EventTimePicker } from "../components/EventTimePicker"
import { useCreateEvent } from "../../hooks/use-create-event.hook"
import { stringToTime, timeToString } from "@eventhub/shared/date-format"

export const CreateEventPage: React.FC = () => {
    const hook = useCreateEvent()

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
            Créer un événement
        </Typography>

        {
            hook.networkError && (
                <Alert severity="error">
                    {hook.networkError}
                </Alert>
            )
        }

        <Paper elevation={3} sx={{ p: 4 }}>
            <Stack spacing={3}>
            <TextField
                label="Nom de l'événement"
                value={hook.form.event.name}
                onChange={(e) => hook.update("name", e.target.value)}
                fullWidth
                variant="outlined"
            />

            <TextField
                label="Description"
                value={hook.form.event.description}
                onChange={(e) => hook.update("description", e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
            />

            <Grid item xs={12} md={6}>
                <TextField
                    select
                    label="Lieu de l'événement"
                    value={hook.form.event.venueName}
                    onChange={(e) => hook.update("venueName", e.target.value)}
                    fullWidth
                    variant="outlined"
                >
                    {hook.venues.data.map((venue) => (
                        <MenuItem key={venue.id} value={venue.name}>
                            {venue.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <EventDatePicker
                        date={new Date(hook.form.event.date)}
                        setDate={(date) => hook.update("date", date.toISOString())}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <EventTimePicker
                        label="Heure de début"
                        hour={stringToTime(hook.form.event.startTime)}  // ← string vers Date
                        setHour={(hourDate) => {
                            hook.update("startTime", timeToString(hourDate))  // ← Date vers string
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <EventTimePicker
                        label="Heure de fin"
                        hour={stringToTime(hook.form.event.endTime)}
                        setHour={(hourDate) => {
                            hook.update("endTime", timeToString(hourDate))  // ← Date vers string
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Prix (€)"
                        value={hook.form.event.price}
                        onChange={(e) => hook.update("price", Number(e.target.value))}
                        fullWidth
                        type="number"
                        inputProps={{ step: 0.01, min: 0 }}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        label="Capacité d'accueil"
                        value={hook.form.event.capacity}
                        onChange={(e) => hook.update("capacity", Number(e.target.value))}
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
                    onClick={hook.submit}
                    disabled={!hook.isSubmittable}
                >
                Créer
                </Button>
            </Box>
            </Stack>
        </Paper>
        </Box>
    )
}
