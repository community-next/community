import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { selectRoomMap } from "./entities";
import { selectCurrentRoomId } from "./messages";

export const currentRoomSelector = createDraftSafeSelector(
  selectCurrentRoomId,
  selectRoomMap,
  (roomId, rooms) => (roomId ? rooms[roomId] : undefined)
);
