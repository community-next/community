import { Channel, DirectMessage, UserConversation } from "../types";

export interface IConversationService {
  getChannels(conversationIds: string[]): Promise<Channel[]>;
  createChannel(userId: string, channel: Channel): Promise<Channel>;
  startConversation(
    participant1: string,
    participant2: string
  ): Promise<DirectMessage>;
}
