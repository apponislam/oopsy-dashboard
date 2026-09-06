export interface SubmittedDocument {
    id: string;
    name: string;
    type: string;
    fileName: string;
    fileSize: string;
    uploadDate: string;
}

export interface VerificationApplication {
    id: string;
    appId: string;
    business: string;
    owner: string;
    type: string;
    isUrgent?: boolean;
    submittedDate: string;
    status: "Pending" | "Approved" | "Rejected";
    documents: SubmittedDocument[];
}
