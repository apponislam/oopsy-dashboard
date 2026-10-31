import { TUser } from "@/redux/features/auth/authSlice";

export type Provider = TUser;

export interface ProviderStats {
    total: number;
    verified: number;
    pending: number;
    suspended: number;
}
