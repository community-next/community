import { ContentFormat } from "./content";

export interface Message {
  id: string;
  conversationId: string;
  userId: string;
  format: ContentFormat;
  content: string;
  ipAddress: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}
