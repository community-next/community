import { NextApiRequest, NextApiResponse } from "next";
import Ably from "ably/promises";
import { getCurrentUser } from "lib/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await getCurrentUser(req, res);
  const clientId = currentUser?.id ?? "community-next-guest";

  const apiKey = process.env.ABLY_API_KEY as string;
  const client = new Ably.Realtime(apiKey);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId,
  });

  res.status(200).json(tokenRequestData);
}

export default handler;
