export type PaymentStatus = "Settled" | "Refunded" | "Disputed" | "Pending";

export interface PaymentTransaction {
    id: string;
    from: string;
    to: string;
    amount: string;
    fee: string;
    net: string;
    date: string;
    method: string;
    status: PaymentStatus;
}

export interface PaymentStats {
    volume: string;
    revenue: string;
    refunds: string;
    disputes: number;
}
