// Data of a student => No access to fees portal, just information
export interface Student {
    id: number;
    roll: string;
    name: string;
    class: string;
    section: string;
    fees: number;
    paid? : boolean;
    // scholarship?: number;
}

export type Role = "GUARDIAN" | "ACCOUNTS" | "ADMIN";

// Data of any user => Access to fees portal
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}

// Guardian data => Access to fees portal
export interface Guardian extends User {
    role: "GUARDIAN";
    children: number[];
}

// Accounts data => Access to fees portal
export interface Accounts extends User {
    role: "ACCOUNTS";
}

// Admin data => Access to fees portal
export interface Admin extends User {
    role: "ADMIN";
}


