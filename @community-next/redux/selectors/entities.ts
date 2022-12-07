import { AppState } from "../store";

export const selectMessageMap = (state: AppState) => state.entities.messages;
export const selectUserMap = (state: AppState) => state.entities.users;
export const selectRoomMap = (state: AppState) => state.entities.rooms;
