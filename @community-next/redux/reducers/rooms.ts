import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, Message, Room } from "@community-next/provider";

interface RoomsState {
  currentRoomId: string | null;
  roomIds: string[];
}

const initialState: RoomsState = {
  currentRoomId: null,
  roomIds: [],
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    initRooms: (state, action: PayloadAction<{ rooms: Room[] }>) => {
      const { rooms } = action.payload;
      state.roomIds = rooms.map((room) => room.id);
    },
    changeRoom: (state, action: PayloadAction<string>) => {
      state.currentRoomId = action.payload;
    },
  },
});

export const { initRooms, changeRoom } = roomsSlice.actions;

export default roomsSlice.reducer;
