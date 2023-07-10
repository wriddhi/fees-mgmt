import { supabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import type { User, Student } from "@/types/db.types";

type Data = {
  message: string;
  error: boolean;
  children: Student[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ error: true, message: "Method not allowed", children: [] });
    return;
  }

  const cookies = req.cookies[process.env.AUTH_COOKIE!];

  if (!cookies) {
    return res
      .status(200)
      .json({ message: "User is not logged in", children: [], error: false });
  }

  let user: User | null = null;

  try {
    const { id, name, role } = verify(cookies, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
      role: User["role"];
      iat: number;
      exp: number;
    };
    user = { id, name, role };
    if (role !== "parent") {
      return res
        .status(200)
        .json({ message: "User is not a parent", children: [], error: false });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Invalid Session", children: [], error: true });
  }

  const { data: children, error } = await supabase
    .from("children")
    .select("children")
    .eq("parent", user.id)
    .single();

  if (error) {
    return res
      .status(500)
      .json({ error: true, message: "Error getting children", children: [] });
  }

  if (!children) {
    return res
      .status(200)
      .json({ error: false, message: "No children found", children: [] });
  }

  let childrenData: Student[] = [];

  for (let i = 0; i < children.children.length; i++) {
    const { data: student, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", children.children[i])
      .single();
    childrenData.push(student);
  }


  return res
    .status(200)
    .json({
      error: false,
      message: "Children found successfully",
      children: childrenData,
    });
}
