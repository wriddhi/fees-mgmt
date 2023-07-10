import { supabase } from "@/lib/db";
import type { User, Credentials } from "@/types/db.types";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

type Data = {
  message: string;
  error: boolean;
  user: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed", user: null, error: true });
  }

  const { id, password, role } : Credentials = req.body;

  if (!id || !password || !role) {
    console.log("Invalid Credentials => missing")
    return res.status(401).json({ message: "Invalid Credentials", user: null, error: true });
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", id);

  if (userError) {
    console.log("Internal Server Error => users")
    return res.status(200).json({ message: "Internal Server Error", user: null, error: true });
  }

  if (user.length === 0 || user[0].role !== role) {
    console.log("User not found")
    console.log(user)
    return res.status(200).json({ message: "Invalid Credentials", user: null, error: true });
  }

  const { data: credentials, error: credentialsError } = await supabase
    .from("credentials")
    .select("*")
    .eq("id", id);

  if (credentialsError || credentials.length === 0) {
    console.log("Internal Server Error => credentials")
    return res.status(200).json({ message: "Internal Server Error", user: null, error: true });
  }

  if (credentials[0].password !== password) {
    console.log("Incorrect Password")
    return res.status(200).json({ message: "Invalid Credentials", user: null, error: true });
  }

  const authUser: User = user[0];

  const token = sign(
    { id: authUser.id, name: authUser.name, role: authUser.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  const cookie = serialize(process.env.AUTH_COOKIE!, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 86400,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({ message: "Login Successful", user: user[0], error: false });
}
