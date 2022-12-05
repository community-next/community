import { ContentFormat } from "./content";

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  displayName: string;
  format: ContentFormat;
  content: string;
  ipAddress: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}

export interface MessageDraft extends Message {
  status: "sending" | "failed" | "sent";
}
