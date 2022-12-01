import { v4 as uuidv4 } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import {
  IRoomService,
  Room,
  DirectMessage,
  GroupMessage,
  RoomType,
} from "@community-next/provider";
import { CosmosDB, containers, CosmosContainer } from "./db";
import { cleanCosmosPropsForItems } from "./lib/clean";

export class RoomService implements IRoomService {
  private rooms: CosmosContainer;
  private roomParticipants: CosmosContainer;

  constructor(db: CosmosDB) {
    this.rooms = db.getContainer(containers.rooms.containerId);
    this.roomParticipants = db.getContainer(
      containers.roomParticipants.containerId
    );
    this.getRooms = this.getRooms.bind(this);
  }

  async getRooms(ids: string[]): Promise<Room[]> {
    const rooms = await this.rooms.getItemsByIds<Room>(ids);
    return cleanCosmosPropsForItems(rooms);
  }

  async getRoomIdBySlug(slug: string): Promise<string | null> {
    const querySpec = {
      query: "select * from c where c.slug=@slug",
      parameters: [{ name: "@slug", value: slug }],
    };
    const res = await this.rooms.getItem<GroupMessage>(querySpec);
    return res?.id ?? null;
  }

  async isRoomParticipant(roomId: string, userId: string): Promise<boolean> {
    const querySpec = {
      query: `select * from c where c.roomId = @roomId AND c.userId = @userId`,
      parameters: [
        { name: "@roomId", value: roomId },
        { name: "@userId", value: userId },
      ],
    };
    const res = await this.roomParticipants.getItem<DirectMessage>(querySpec);
    return !!res;
  }

  async createGroupMessage(group: GroupMessage): Promise<GroupMessage> {
    const res = await this.rooms.insertItem(group);
    return group;
  }

  async createDirectMessage(dm: DirectMessage): Promise<DirectMessage> {
    const res = await this.rooms.insertItem(dm);
    return dm;
  }

  async getDirectMessageId(
    participant1: string,
    participant2: string
  ): Promise<string | null> {
    const querySpec = {
      query: `select * from c
      where
        (c.participant1=@participant1 AND c.participant2=@participant2)
        OR (c.participant2=@participant1 AND c.participant2=@participant1)`,
      parameters: [
        { name: "@participant1", value: participant1 },
        { name: "@participant2", value: participant2 },
      ],
    };
    const items = await this.rooms.getItems<DirectMessage>(querySpec);
    const directMessage = items.find((item) => item.type === RoomType.DIRECT);
    return directMessage?.id ?? null;
  }
}
