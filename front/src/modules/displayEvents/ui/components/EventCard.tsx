import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Stack } from "@mui/material";
import type { EventListModel } from "../../domain/event-list.model";

type Props = { event: EventListModel.EventItem; onClick?: (id: string) => void };

export default function EventCard({ event, onClick }: Props) {
    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
        <CardActionArea onClick={() => onClick?.(event.id)} sx={{ height: "100%" }}>
            {event.coverUrl && (
            <CardMedia
                component="img"
                height="140"
                image={event.coverUrl}
                alt={event.name}
                loading="lazy"
            />
            )}
            <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" noWrap>
                {event.name}
                </Typography>
                <Chip
                size="small"
                label={event.status}
                color={
                    event.status === "published"
                    ? "success"
                    : event.status === "draft"
                    ? "warning"
                    : "default"
                }
                variant="outlined"
                />
            </Stack>
            <Typography variant="body2" color="text.secondary">
                {new Date(event.dates.start).toLocaleString()} — {new Date(event.dates.end).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {event.capacity} place{event.capacity > 1 ? "s" : ""}
                {event.price > 0 ? `, €${event.price}` : ""}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
}
