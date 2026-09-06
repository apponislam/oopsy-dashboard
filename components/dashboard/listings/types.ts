export type FacilityType = "Restroom" | "Shower" | "Spa" | "Locker";

export interface Listing {
    id: string;
    title: string;
    provider: string;
    type: FacilityType;
    city: string;
    price: string;
    bookings: number;
    rating: number;
    status: "Live" | "Review" | "Paused" | "Suspended";
}
