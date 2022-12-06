import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectCurrentRoomId } from "./messages";

export const selectRooms = (state: AppState) => state.entities.rooms;

export const currentRoomSelector = createDraftSafeSelector(
  selectCurrentRoomId,
  selectRooms,
  (roomId, rooms) => (roomId ? rooms[roomId] : undefined)
);
