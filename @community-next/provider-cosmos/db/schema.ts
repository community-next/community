import { UniqueKey } from "@azure/cosmos";

interface Container {
  containerId: string;
  id?: string;
  partitionKey?: string;
  uniqueKeys?: UniqueKey[];
}

export const containers = {
  users: {
    containerId: "community_users",
    uniqueKeys: [{ paths: ["/email"] }, { paths: ["/username"] }],
  },
  rooms: {
    containerId: "community_rooms",
    uniqueKeys: [
      { paths: ["/slug"] },
      { paths: ["/participant1", "/participant2"] },
      { paths: ["/participant2", "/participant1"] },
    ],
  },
  roomParticipants: {
    containerId: "community_room_participants",
    partitionKey: "/roomId",
    uniqueKeys: [{ paths: ["/roomId", "/userId"] }],
  },
  userRooms: {
    containerId: "community_user_rooms",
  },
  messages: {
    containerId: "community_messages",
    partitionKey: "/roomId",
  },
};
