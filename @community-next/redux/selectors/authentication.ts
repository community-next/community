import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { selectUserMap } from "./entities";

export const selectCurrentUserId = (state: AppState) =>
  state.authentication.currentUserId;

export const currentUserSelector = createDraftSafeSelector(
  selectCurrentUserId,
  selectUserMap,
  (userId, users) => (userId ? users[userId] : undefined)
);
