import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const selectCurrentRoomId = (state: AppState) =>
  state.rooms.currentRoomId;
export const selectMessageMap = (state: AppState) => state.entities.messages;
export const selectUserMap = (state: AppState) => state.entities.users;
export const selectMessageIdsInRooms = (state: AppState) =>
  state.messages.messageIdsInRooms;

export const currentRoomSelector = createDraftSafeSelector(
  selectCurrentRoomId,
  selectUserMap,
  selectMessageMap,
  selectMessageIdsInRooms,
  (roomId, userMap, messageMap, messageIdsInRooms) => {
    if (!roomId) {
      return null;
    }
    const messageIds = messageIdsInRooms.get(roomId) ?? [];
    const messages = messageIds
      .map((id) => {
        const message = messageMap.get(id);
        if (!message) {
          return undefined;
        }

        const user = userMap.get(message.userId);
        return {
          user,
          message,
        };
      })
      .filter(Boolean);

    return messages;
  }
);
