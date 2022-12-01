import { v4 as uuidv4 } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import {
  User,
  Room,
  RoomType,
  GroupMessage,
  DirectMessage,
} from "@community-next/provider";
import { createLoader } from "./dataloader";
import { createProvider } from "./provider";

const provider = createProvider();

const loader = createLoader(provider.roomService.getRooms);

export async function getRoom(id: string, user?: User): Promise<Room | null> {
  const room = await loader.findOneById(id);
  if (!room) {
    return null;
  }

  if (room.type === RoomType.DIRECT) {
    // make sure the user is one of the participants of the direct message
    if (
      user &&
      (room.participant1 === user.id || room.participant2 === user.id)
    ) {
      return room;
    }
  } else if (room.type === RoomType.GROUP) {
    // veryone can access this room if it's public
    if (room.isPublic) {
      return room;
    }

    if (user) {
      // make sure the user is a participant in this room
      const isParticipant = await provider.roomService.isRoomParticipant(
        room.id,
        user.id
      );

      if (isParticipant) {
        return room;
      }
    }
  }

  return null;
}

export async function getRoomBySlug(slug: string, user?: User) {
  const roomId = await provider.roomService.getRoomIdBySlug(slug);
  if (!roomId) {
    return null;
  }

  return getRoom(roomId, user);
}

export async function createGroupMessage(
  name: string,
  description: string,
  isPublic = true,
  slug?: string,
  owner?: User
) {
  const timestamp = getUnixTime(new Date());
  const group: GroupMessage = {
    id: uuidv4(),
    name,
    description,
    type: RoomType.GROUP,
    createdAt: timestamp,
    updatedAt: timestamp,
    ownerId: owner?.id,
    slug,
    isPublic,
    isDisabled: false,
  };
  await provider.roomService.createGroupMessage(group);
  return group;
}

export async function startConversation(
  currentUser: User,
  recipient: User
): Promise<DirectMessage> {
  const participant1 = currentUser.id;
  const participant2 = recipient.id;

  const directMessageId = await provider.roomService.getDirectMessageId(
    participant1,
    participant2
  );

  let dm: DirectMessage | null = null;
  if (directMessageId) {
    const room = await getRoom(directMessageId);
    if (room?.type === RoomType.DIRECT) {
      dm = room;
      return dm;
    }
  }

  const timestamp = getUnixTime(new Date());
  dm = {
    id: uuidv4(),
    type: RoomType.DIRECT,
    createdAt: timestamp,
    updatedAt: timestamp,
    participant1,
    participant2,
  };
  await provider.roomService.createDirectMessage(dm);
  return dm;
}
