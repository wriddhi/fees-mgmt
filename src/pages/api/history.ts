import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/db";
import { FeesRecord } from "@/types/db.types";

type Data = {
  error: boolean;
  message: string;
  history: FeesRecord[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: true, message: "Method not allowed", history: null });
    }

    const { student_id } = req.query;

    if (!student_id) {
        return res.status(400).json({ error: true, message: "Invalid query", history: null });
    }

    const { data, error } = await supabase.from("fees_records").select("*").eq("student_id", student_id);

    if (error) {
        return res.status(500).json({ error: true, message: "Internal server error", history: null });
    }

    return res.status(200).json({ error: false, message: "History found", history: data });
}
