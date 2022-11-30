export interface Conversation {
  id: string;
  createdAt: number;
  updatedAt?: number;
  lastMessageAt?: number;
}

export interface Participant {
  userId: string;
  joinedAt: number;
  lastActivityAt: number;
  lastMessageAt?: number;
}

export interface Channel extends Conversation {
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
  participant1: string;
  participant2: string;
}

export interface UserConversation {
  userId: string;
  channelIds: string[];
  dmIds: string[];
}
