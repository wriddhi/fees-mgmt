import { supabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import type { User, FeesStructure } from "@/types/db.types";

type Data = {
  message: string;
  error: boolean;
  fees: FeesStructure | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ error: true, message: "Method not allowed", fees: null });
    return;
  }

  const { class: cls, stream } = req.query;

  if (!cls || !stream) {
    return res
      .status(400)
      .json({ error: true, message: "Invalid query", fees: null });
  }

  const { data, error } = await supabase
    .from("fees_structure")
    .select("*")
    .eq("class", cls)
    .eq("stream", stream);

  if (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error", fees: null });
  }

  return res
    .status(200)
    .json({ error: false, message: "Fees structure found", fees: data[0] });
}
