import { Container, Grid, Pagination, Skeleton, Stack, TextField, Typography } from "@mui/material";
import EventCard from "./components/EventCard";
import { useListEvents } from "../hooks/use-list-events";

export default function EventsPage() {

    const hook = useListEvents();
    return (
        <Container sx={{ py: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5">Events</Typography>
                <TextField
                    size="small"
                    placeholder="Search"
                />
            </Stack>

            <Grid container spacing={2}>
                {hook.loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Skeleton variant="rounded" height={220} />
                    </Grid>
                    ))
                : hook.events.map((event) => (
                    <Grid item xs={12} sm={6} md={3} key={event.id}>
                        <EventCard
                        event={event}
                        />
                    </Grid>
                    ))}
            </Grid>
        </Container>
    );
}