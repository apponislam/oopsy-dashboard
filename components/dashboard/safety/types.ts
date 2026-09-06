export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type IncidentStatus = "Open" | "Investigating" | "Resolved";

export interface SafetyIncident {
    id: string;
    facility: string;
    category: string;
    description: string;
    severity: IncidentSeverity;
    status: IncidentStatus;
    reportedDate: string;
}
