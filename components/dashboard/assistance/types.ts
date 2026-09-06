export type TicketPriority = "Normal" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface AssistanceTicket {
    id: string;
    user: string;
    topic: string;
    message: string;
    submitted: string;
    priority: TicketPriority;
    status: TicketStatus;
}
