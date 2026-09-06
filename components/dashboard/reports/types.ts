export type ReportSeverity = "Low" | "Medium" | "High" | "Critical";
export type ReportStatus = "Open" | "Investigating" | "Resolved" | "Closed";

export interface ReportItem {
    id: string;
    reportedBy: string;
    against: string;
    type: string;
    severity: ReportSeverity;
    date: string;
    status: ReportStatus;
}
