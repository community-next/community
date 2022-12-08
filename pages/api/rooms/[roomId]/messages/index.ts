import { NextApiRequest, NextApiResponse } from "next";
import Ably from "ably/promises";
import requestIp from "request-ip";

import { ContentFormat, Room, User } from "@community-next/provider";
import { getCurrentSessionUser } from "lib/session";
import { getRoom } from "models/rooms";
import { getMessages, newMessage } from "models/messages";

// new message
async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  room: Room,
  currentUser: User | null
) {
  const roomId = req.query.roomId as string;
  const id = (req.body.id ?? null) as string | null;
  const content = (req.body.content ?? "") as string;
  const format = (req.body.format ?? 0) as ContentFormat;
  const ipAddress = requestIp.getClientIp(req) ?? "127.0.0.1";

  if (!content) {
    return res.status(400).end();
  }

  if (!currentUser) {
    // sign in first
    return res.status(404).end();
  }

  const apiKey = process.env.ABLY_API_KEY as string;
  const ably = new Ably.Realtime.Promise(apiKey);
  const channel = ably.channels.get(roomId);

  const message = await newMessage(
    room,
    currentUser,
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
      roomId: room.id,
      draftId: id,
      message,
      user: currentUser,
    },
  });

  return res.json({
    draftId: id,
    message,
    user: currentUser,
  });
}

// get new messages
async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
  room: Room,
  currentUser: User | null
) {
  const roomId = room.id;
  const continuationToken = (req.query.continuationToken ?? undefined) as
    | string
    | undefined;

  const messages = await getMessages(roomId, 20, continuationToken);

  res.status(200).json(messages);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const roomId = req.query.roomId as string;

  if (!roomId) {
    return res.status(404).end();
  }

  const currentUser = await getCurrentSessionUser(req, res);
  let room = await getRoom(roomId, currentUser ?? undefined);

  // room doesn't exist or no permission to access it
  if (!room) {
    return res.status(403).end();
  }

  if (req.method === "POST") {
    return handlePost(req, res, room, currentUser);
  }
  if (req.method === "GET") {
    return handleGet(req, res, room, currentUser);
  }
  return res.status(405).end();
}
