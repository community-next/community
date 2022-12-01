export interface Conversation {
  id: string;
  createdAt: number;
  updatedAt?: number;
  lastMessageAt?: number;
  type: ConversationType;
}

export interface Participant {
  roomId: string;
  userId: string;
  joinedAt: number;
  lastActivityAt: number;
  lastMessageAt?: number;
}

export enum ConversationType {
  GROUP,
  DIRECT,
}

export interface GroupMessage extends Conversation {
  type: ConversationType.GROUP;
  slug?: string;
  ownerId: string;
  name: string;
  description: string;
  isPublic: boolean;
  isDisabled: boolean;
  createdAt: number;
  updatedAt?: number;
}

export interface DirectMessage extends Conversation {
  type: ConversationType.DIRECT;
  participant1: string;
  participant2: string;
}

export type Room = GroupMessage | DirectMessage;

export interface UserRoom {
  id: string;
  type: ConversationType;
  name: string;
  recipient?: string;
}

export interface UserRooms {
  id: string; // userId
  rooms: UserRoom[];
}
