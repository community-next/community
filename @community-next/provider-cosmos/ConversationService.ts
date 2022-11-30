import { v4 as uuidv4 } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import {
  IConversationService,
  Channel,
  DirectMessage,
} from "@community-next/models";
import { CosmosContainer } from "./CosmosContainer";
import { CosmosDB } from "./CosmosDB";
import { containers } from "./schema";

export class ConversationService implements IConversationService {
  private channels: CosmosContainer;
  private dm: CosmosContainer;

  constructor(db: CosmosDB) {
    this.channels = db.getContainer(containers.channels.containerId);
    this.dm = db.getContainer(containers.directMessages.containerId);
  }

  async getChannels(ids: string[]): Promise<Channel[]> {
    return this.channels.getItemsByIds<Channel>(ids);
  }

  async createChannel(userId: string, channel: Channel): Promise<Channel> {
    channel.ownerId = userId;
    const res = await this.channels.insertItem(channel);
    return channel;
  }

  async startConversation(
    participant1: string,
    participant2: string
  ): Promise<DirectMessage> {
    const querySpec = {
      query: `select * from c
      where (c.participant1=@participant1 AND c.participant2=@participant2)
      OR (c.participant2=@participant1 AND c.participant2=@participant1)`,
      parameters: [
        { name: "@participant1", value: participant1 },
        { name: "@participant2", value: participant2 },
      ],
    };
    const res = await this.dm.getItem<DirectMessage>(querySpec);
    if (res) {
      return res;
    }

    const timestamp = getUnixTime(new Date());
    const dm: DirectMessage = {
      id: uuidv4(),
      createdAt: timestamp,
      participant1,
      participant2,
    };
    await this.dm.insertItem(dm);
    return dm;
  }
}
