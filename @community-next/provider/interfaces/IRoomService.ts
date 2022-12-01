import { Room, DirectMessage, GroupMessage } from "../types";

export interface IRoomService {
  getRooms(ids: readonly string[]): Promise<Room[]>;

  getRoomIdBySlug(slug: string): Promise<string | null>;

  isRoomParticipant(roomId: string, userId: string): Promise<boolean>;

  createGroupMessage(group: GroupMessage): Promise<GroupMessage>;

  createDirectMessage(dm: DirectMessage): Promise<DirectMessage>;

  getDirectMessageId(
    participant1: string,
    participant2: string
  ): Promise<string | null>;
}
