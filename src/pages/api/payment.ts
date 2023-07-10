import { NextApiRequest, NextApiResponse } from "next";
import data from "@/lib/data.json";
import fees from '@/lib/fees.json';
import { Student } from "@/types/Student.types";
import { Payment, FeesRecord } from "@/types/Fees.types";
import fs from "node:fs/promises";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { payment }: {payment: Payment} = req.body;
    console.log(payment);

 

    const oldPayments = fees as Payment[];
    const newPayments = [...oldPayments, payment];

    try {
        await fs.writeFile("src/lib/fees.json", JSON.stringify(newPayments));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    const oldData: Student[] = data;
    const newData = oldData.map((student) => {
        if (student.id === payment.student_id) {
            return {
                ...student,
                paid: true,
            };
        }
        return student;
    });

    try {
        await fs.writeFile("src/lib/data.json", JSON.stringify(newData));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Payment Successful" });

}
