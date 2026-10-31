import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stote";

export const roles = {
    SUPER_ADMIN: "SUPER_ADMIN" as const,
    ADMIN: "ADMIN" as const,
    CLIENT: "CLIENT" as const,
    PROVIDER: "PROVIDER" as const,
};

export type Role = (typeof roles)[keyof typeof roles];

export type TLocation = {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
};

export type TAddress = {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    location?: TLocation;
};

export type TBusinessDetails = {
    businessName?: string;
    businessType?: string;
    companyRegistrationNumber?: string;
    vatNumber?: string;
};

export type TUser = {
    _id: string;
    name: string;
    email: string;
    role: Role;
    phone?: string;
    profileImage?: string;
    address?: TAddress;
    businessDetails?: TBusinessDetails;
    website?: string;
    businessDocument?: string;
    governmentIssuedId?: string;
    balance?: number;
    bookingCount?: number;
    listingCount?: number;
    totalRevenue?: number;
    stripeAccountId?: string;
    averageRating?: number;
    totalReviews?: number;
    isActive: boolean;
    isEmailVerified: boolean;
    isApproved?: boolean;
    approvedBy?: string;
    isDeleted: boolean;
    lastLogin?: string;
    referralCode?: string;
    referredBy?: string;
    createdAt?: string;
    updatedAt?: string;
};

type TAuthState = {
    user: null | TUser;
    token: null | string;
    redirectPath: string | null;
    justLoggedIn: boolean;
};

const initialState: TAuthState = {
    user: null,
    token: null,
    redirectPath: null,
    justLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.justLoggedIn = true;
        },
        updateUser: (state, action: PayloadAction<Partial<TUser>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.redirectPath = null;
            state.justLoggedIn = false;
        },
        setRedirectPath: (state, action: PayloadAction<string | null>) => {
            state.redirectPath = action.payload;
        },
        clearJustLoggedIn: (state) => {
            state.justLoggedIn = false;
        },
    },
});

export const { setUser, updateUser, logOut, setRedirectPath, clearJustLoggedIn } = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
export const redirectPath = (state: RootState) => state.auth.redirectPath;
export const justLoggedIn = (state: RootState) => state.auth.justLoggedIn;
