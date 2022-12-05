import { NextApiRequest, NextApiResponse } from "next";
import Ably from "ably/promises";
import { getCurrentSessionUser } from "lib/session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentUser = await getCurrentSessionUser(req, res);
  const clientId = currentUser?.id ?? "community-next-guest";

  const apiKey = process.env.ABLY_API_KEY as string;

  const client = new Ably.Rest(apiKey);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId,
  });

  res.status(200).json(tokenRequestData);
}

export default handler;
