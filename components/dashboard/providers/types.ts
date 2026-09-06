export interface Provider {
    id: string;
    business: string;
    owner: string;
    listings: number;
    bookings: number;
    revenue: string;
    rating: number;
    verified: "Verified" | "Pending";
    status: "Active" | "Suspended";
}

export interface ProviderStats {
    total: number;
    verified: number;
    pending: number;
    suspended: number;
}
