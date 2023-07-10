import type { User } from "@/types/db.types";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";

type Data = {
  message: string;
  error: boolean;
  user: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cookies = req.cookies[process.env.AUTH_COOKIE!];
  console.log("Logging out");

  if (!cookies) {
    return res
      .status(200)
      .json({ message: "User is not logged in", user: null, error: true });
  }

  try {
    verify(cookies, process.env.JWT_SECRET!);
    res.setHeader("Set-Cookie", [
        serialize(process.env.AUTH_COOKIE!, "", {
            maxAge: -1,
            path: "/",
        }),
    ]);
  } catch (error) {
    res.setHeader("Set-Cookie", [
        serialize(process.env.AUTH_COOKIE!, "", {
            maxAge: -1,
            path: "/",
        }),
    ]);
    return res
      .status(200)
      .json({ message: "Invalid Session", user: null, error: true })
  }

  return res
    .status(200)
    .json({ message: "Logout Successful", user: null, error: false });
}
