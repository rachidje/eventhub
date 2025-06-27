import { z } from "zod";

export const EventSchema = z.object({
    name: z.string().min(1, "Nom requis"),
    description: z.string().min(1, "Description requise"),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    venueName: z.string(),
    capacity: z.number().min(10).max(100),
    price: z.number().positive().min(1)
})

export type CreateEventSchema = z.infer<typeof EventSchema>