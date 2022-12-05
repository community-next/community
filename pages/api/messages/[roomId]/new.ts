import { NextApiRequest, NextApiResponse } from "next";
import Ably from "ably/promises";
import requestIp from "request-ip";

import { ContentFormat, Room } from "@community-next/provider";
import { withMethods } from "lib/middlewares/with-methods";
import { getCurrentSessionUser } from "lib/session";
import { getRoom } from "models/rooms";
import { newMessage } from "models/messages";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const roomId = req.query.roomId as string;
  const id = (req.query.id ?? null) as string | null;
  const content = (req.body.content ?? "") as string;
  const format = (req.body.format ?? 0) as ContentFormat;
  const ipAddress = requestIp.getClientIp(req) ?? "127.0.0.1";

  if (!roomId) {
    return res.status(404).end();
  }

  if (!content) {
    return res.status(400).end();
  }

  const currentUser = await getCurrentSessionUser(req, res);
  if (!currentUser) {
    // sign in first
    return res.status(404).end();
  }

  let room = await getRoom(roomId, currentUser);

  // room doesn't exist or no permission to access it
  if (!room) {
    return res.status(403).end();
  }

  const apiKey = process.env.ABLY_API_KEY as string;
  const ably = new Ably.Realtime.Promise(apiKey);
  const channel = ably.channels.get(roomId);

  const message = await newMessage(
    room,
    currentUser,
    id,
    content,
    format,
    ipAddress
  );

  if (!message) {
    return res.status(403).end();
  }

  await channel.publish({
    name: "chat-message",
    data: {
      message,
      user: currentUser,
    },
  });

  return res.json({
    message,
    user: currentUser,
  });
}

export default withMethods(["POST"], handler);
