export interface Payment {
  order_id: string;
  transaction_id: string;
  student_id: number;
  payment_date: string;
  payment_taken_by: string;
  mode: "Cheque" | "Cash" | "NetBanking" | "UPI" | "Draft";
  amount: number;
  cheque_number?: string;
  cheque_date?: string;
  draft_number?: string;
  draft_date?: string;
  bank_name?: string;
}

export interface Fees {
  tuition: number;
  library: number;
  transport: number;
  hostel: number;
  food: number;
  other: number;
}

export type FeesRecord = {
    student_id: string;
    fees: number;
    total: number;
    paid: boolean;
    payment_date: string;
    accepted_by: string;
    approved: boolean;
    approval_date: string;
    approved_by: string;
    class: string;
    status: "Pending" | "Approved" | "Rejected" | "Cancelled" | "Failed";
} & ({
    scheme: "monthly",
    installment: "January" | "February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"
} | {
    scheme: "quarterly",
    installment: "January-March" | "April-June" | "July-September" | "October-December"
} | {
    scheme: "half-yearly",
    installment: "January-June" | "July-December"
} | {
    scheme: "annual",
    installment: "January-December"
})