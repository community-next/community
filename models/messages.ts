import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import {
  User,
  Room,
  Message,
  RoomType,
  PageSet,
  Pagination,
} from "@community-next/provider";
import { createProvider } from "./provider";
import { ContentFormat } from "@community-next/provider";
import { getTimestampInSeconds } from "@community-next/utils";
import { getUsers } from "./users";

const provider = createProvider();

export async function checkNewMessagePermission(
  room: Room,
  user: User
): Promise<boolean> {
  if (room.type === RoomType.DIRECT) {
    // make sure the user is one of the participants of the direct message
    if (room.participant1 === user.id || room.participant2 === user.id) {
      return true;
    }
  }

  if (room.type === RoomType.GROUP) {
    // veryone can access this room if it's public
    if (room.isPublic) {
      return true;
    }

    // make sure the user is a participant in this room
    const isParticipant = await provider.roomService.isRoomParticipant(
      room.id,
      user.id
    );

    if (isParticipant) {
      return true;
    }
  }

  return false;
}

export async function newMessage(
  room: Room,
  user: User,
  id: string | null,
  content: string,
  format: ContentFormat,
  ipAddress: string
): Promise<Message | null> {
  const timestamp = getTimestampInSeconds();
  const hasNewMessagePermission = checkNewMessagePermission(room, user);
  if (!hasNewMessagePermission) {
    return null;
  }

  const message: Message = {
    id: id && uuidValidate(id) ? id : uuidv4(),
    roomId: room.id,
    userId: user.id,
    displayName: user.displayName,
    format,
    content,
    ipAddress,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await provider.messageService.newMessage(message);

  return message;
}

export async function getMessages(
  conversationId: string,
  pageSize = 50,
  continuationToken?: string
) {
  const {
    items,
    continuationToken: newContinuationToken,
    hasMoreResults,
  } = await provider.messageService.getMessages(conversationId, {
    pageSize,
    continuationToken,
  });

  const messages = items.sort(
    (item1, item2) => item1.createdAt - item2.createdAt
  );
  const userIds = new Set<string>();
  messages.forEach((message) => {
    userIds.add(message.userId);
  });
  const users = await getUsers(Array.from(userIds));

  return {
    messages,
    users,
    continuationToken: newContinuationToken,
    hasMoreResults,
  };
}
