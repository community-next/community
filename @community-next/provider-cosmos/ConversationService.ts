import { v4 as uuidv4 } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import {
  IConversationService,
  Room,
  DirectMessage,
  GroupMessage,
  ConversationType,
} from "@community-next/models";
import { CosmosDB, containers, CosmosContainer } from "./db";

export class ConversationService implements IConversationService {
  private rooms: CosmosContainer;
  private dm: CosmosContainer;

  constructor(db: CosmosDB) {
    this.rooms = db.getContainer(containers.rooms.containerId);
    this.dm = db.getContainer(containers.directMessages.containerId);
  }

  async getRooms(ids: string[]): Promise<Room[]> {
    return this.rooms.getItemsByIds<Room>(ids);
  }

  async createGroupMessage(
    userId: string,
    group: GroupMessage
  ): Promise<GroupMessage> {
    group.ownerId = userId;
    const res = await this.rooms.insertItem(group);
    return group;
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
      type: ConversationType.DIRECT,
      createdAt: timestamp,
      participant1,
      participant2,
    };
    await this.dm.insertItem(dm);
    return dm;
  }
}
