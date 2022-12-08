import type { User, Message } from "@community-next/provider";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { anonymousUser } from "../anonymous";
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
    const messagesInRoom = messagesInRooms[roomId ?? ""];
    if (!messagesInRoom) {
      return {
        roomId,
        messageItems: [],
        hasMoreResults: undefined,
        loadingMore: undefined,
      };
    }

    const { messageIds, hasMoreResults, loadingMore } = messagesInRoom;
    const messageItems: Array<{ message: Message; user: User }> = [];

    messageIds.forEach((id) => {
      const message = messageMap[id];
      if (message) {
        const user = userMap[message.userId] ?? anonymousUser;
        messageItems.push({
          user,
          message,
        });
      }
    });

    return {
      roomId,
      messageItems,
      hasMoreResults,
      loadingMore,
    };
  }
);
