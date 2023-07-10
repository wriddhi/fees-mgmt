export interface Credentials {
  id: string;
  password: string;
  role: User["role"];
}

export interface User {
  id: string;
  name: string;
  role: "admin" | "accountant" | "parent";
}

export interface Student {
  student_id: string;
  class: string;
  section: string;
  stream: string;
  name: string;
  roll: number;
  scholarship: number;
  paid: boolean;
  approved: boolean;
}

export interface FeesStructure {
  class: string;
  stream: string;
  tuition: number;
  library: number;
  late: number;
  frequency: "monthly" | "quarterly" | "half-yearly" | "annual";
}

export type FeesRecord = {
  order_id: string;
  transaction_id: string;
  student_id: string;
  payment_date: string;
  payment_time: string;
  accepted_by: string;
  approval_date: string;
  approval_time: string;
  approved_by: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected" | "Cancelled" | "Failed";
} & (
  | {
      mode: "cheque";
      cheque_number: string;
      cheque_date: string;
      bank_name: string;
    }
  | {
      mode: "cash";
    }
  | {
      mode: "netbanking";
    }
  | {
      mode: "upi";
    }
  | {
      mode: "draft";
      draft_number: string;
      draft_date: string;
      bank_name: string;
    }
);
