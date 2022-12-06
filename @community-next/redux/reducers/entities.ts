import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, Message, Room } from "@community-next/provider";
import { createNewMessage, fetchMessages, messagesSlice } from "./messages";

const initialState = {
  messages: {} as Record<string, Message>,
  users: {} as Record<string, User>,
  rooms: {} as Record<string, Room>,
};

function updateMessages(
  state: typeof initialState,
  action: PayloadAction<{ messages: Message[]; users: User[] }>
) {
  const { messages, users } = action.payload;
  messages.forEach((message) => {
    state.messages[message.id] = message;
  });
  users.forEach((user) => {
    state.users[user.id] = user;
  });
}

export const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.users[user.id] = user;
    },
    setMessage: (state, action: PayloadAction<{ message: Message }>) => {
      const { message } = action.payload;
      state.messages[message.id] = message;
    },
    setRoom: (state, action: PayloadAction<{ room: Room }>) => {
      const { room } = action.payload;
      state.rooms[room.id] = room;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, updateMessages)
      .addCase(messagesSlice.actions.loadNewMessages, updateMessages)
      .addCase(createNewMessage.fulfilled, (state, action) => {
        const message = action.payload;
        state.messages[message.id] = message;
      });
  },
});

export const { setUser, setMessage } = entitiesSlice.actions;

export default entitiesSlice.reducer;
