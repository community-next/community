export interface Conversation {
  id: string;
  createdAt: number;
  updatedAt?: number;
  lastMessageAt?: number;
  type: RoomType;
}

export interface Participant {
  roomId: string;
  userId: string;
  joinedAt: number;
  lastActivityAt: number;
  lastMessageAt?: number;
}

export enum RoomType {
  GROUP,
  DIRECT,
}

export interface GroupMessage extends Conversation {
  type: RoomType.GROUP;
  slug?: string;
  ownerId?: string;
  name: string;
  description: string;
  isPublic: boolean;
  isDisabled: boolean;
}

export interface DirectMessage extends Conversation {
  type: RoomType.DIRECT;
  participant1: string;
  participant2: string;
}

export type Room = GroupMessage | DirectMessage;

export interface UserRoom {
  id: string;
  type: RoomType;
  name: string;
  recipient?: string;
}

export interface UserRooms {
  id: string; // userId
  rooms: UserRoom[];
}
