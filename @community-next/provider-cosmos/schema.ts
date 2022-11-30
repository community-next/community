import { UniqueKey } from "@azure/cosmos";

interface Container {
  containerId: string;
  partitionKey?: string;
  uniqueKeys?: UniqueKey[];
}

export const containers: { [name: string]: Container } = {
  users: {
    containerId: "community_users",
    uniqueKeys: [{ paths: ["/email"] }, { paths: ["/username"] }],
  },
  channels: {
    containerId: "community_channels",
    uniqueKeys: [{ paths: ["/slug"] }],
  },
  directMessages: {
    containerId: "community_dm",
    uniqueKeys: [
      { paths: ["/participant1", "/participant2"] },
      { paths: ["/participant2", "/participant1"] },
    ],
  },
  messages: {
    containerId: "community_messages",
    partitionKey: "/conversationId",
  },
  userConversations: {
    containerId: "community_user_conversations",
    partitionKey: "/userId",
  },
};
