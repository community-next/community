import { Room, DirectMessage, GroupMessage } from "../types";

export interface IConversationService {
  getRooms(ids: string[]): Promise<Room[]>;

  createGroupMessage(
    userId: string,
    group: GroupMessage
  ): Promise<GroupMessage>;

  startConversation(
    participant1: string,
    participant2: string
  ): Promise<DirectMessage>;
}
