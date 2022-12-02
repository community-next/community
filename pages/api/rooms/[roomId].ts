import { Room } from "@community-next/provider";
import { getCurrentUser } from "lib/session";
import { createGroupMessage, getRoom } from "models/rooms";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const roomId = req.query.roomId as string;
  if (!roomId) {
    return res.status(404).end();
  }
  const currentUser = (await getCurrentUser(req, res)) ?? undefined;

  let room = await getRoom(roomId, currentUser);

  // create a default public room
  if (roomId === "public" && !room) {
    const group = await createGroupMessage(
      "public",
      "A public room for everyone",
      true,
      "public"
    );
    room = group;
  }

  // room doesn't exist or no permission to access it
  if (!room) {
    return res.status(403).end();
  }

  return res.json(room);
}

export default handler;
