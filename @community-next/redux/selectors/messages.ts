import type { User, Message } from "@community-next/provider";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectMessageMap, selectUserMap } from "./entities";

export const selectCurrentRoomId = (state: AppState) =>
  state.rooms.currentRoomId;
export const selectMessagesInRooms = (state: AppState) =>
  state.messages.messagesInRooms;

export const roomMessagesSelector = createDraftSafeSelector(
  selectCurrentRoomId,
  selectUserMap,
  selectMessageMap,
  selectMessagesInRooms,
  (roomId, userMap, messageMap, messagesInRooms) => {
    if (!roomId) {
      return [];
    }
    const messageIds = messagesInRooms[roomId]?.messageIds ?? [];
    const messages: Array<{ message: Message; user: User | undefined }> = [];

    messageIds.forEach((id) => {
      const message = messageMap[id];
      if (message) {
        const user = userMap[message.userId];
        messages.push({
          user,
          message,
        });
      }
    });

    return messages;
  }
);
