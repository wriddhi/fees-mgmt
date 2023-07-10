import type { User } from "@/types/db.types";
import type { NextApiRequest, NextApiResponse } from "next";
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

  if (!cookies) {
    return res
      .status(200)
      .json({ message: "User is not logged in", user: null, error: false });
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
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Invalid Session", user: null, error: true });
  }

  console.log(user);

  return res
    .status(200)
    .json({ message: "user found", user: user, error: false });
}
