export interface CommissionRule {
    id: string;
    category: string;
    description: string;
    rate: number; // e.g. 10 for 10%
    activeProviders: number;
    monthlyVolume: string;
}
