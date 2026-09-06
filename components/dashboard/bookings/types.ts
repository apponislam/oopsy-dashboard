export type BookingStatus = "Confirmed" | "Completed" | "Cancelled" | "Disputed";

export interface Booking {
    id: string;
    client: string;
    facility: string;
    dateTime: string;
    amount: string;
    status: BookingStatus;
}

export interface BookingStats {
    today: number;
    confirmed: number;
    completed: number;
    disputed: number;
}
