export interface User {
    id: string;
    name: string;
    email: string;
    role: "Client" | "Provider";
    joined: string;
    bookings: number;
    status: "Active" | "Suspended" | "Inactive";
}
