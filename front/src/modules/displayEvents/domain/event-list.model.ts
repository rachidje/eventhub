export namespace EventListModel {
    export type EventId = string;

    export type EventItem = {
        id: string
        name: string
        description: string
        dates: {
            start: Date,
            end: Date
        }
        capacity: number
        price: number
        status: "draft" | "published" | "archived";
        coverUrl?: string;
    };

    export type Query = {
        page?: number;
        pageSize?: number;
        search?: string;
        organizerId?: string;
    };

    export type PagedResult = {
        items: EventItem[];
        total: number;
        page: number;
        pageSize: number;
    };
}
