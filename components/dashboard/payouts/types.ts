export type PayoutStatus = "Scheduled" | "Processing" | "Completed" | "On Hold";

export interface PayoutRecord {
    id: string;
    provider: string;
    amount: string;
    period: string;
    bank: string;
    status: PayoutStatus;
}

export interface PayoutStats {
    totalPayable: string;
    processing: string;
    completed: string;
    onHold: string;
}
