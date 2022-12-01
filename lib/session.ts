import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "models/auth";
import { User } from "@community-next/provider";

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const user = session?.user;
  if (user) {
    return user as User;
  }
  return null;
}
