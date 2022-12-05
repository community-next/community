import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const selectCurrentRoomId = (state: AppState) =>
  state.rooms.currentRoomId;
export const selectRooms = (state: AppState) => state.entities.rooms;

export const currentRoomSelector = createDraftSafeSelector(
  selectCurrentRoomId,
  selectRooms,
  (roomId, rooms) => (roomId ? rooms.get(roomId) : undefined)
);
