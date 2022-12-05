import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  Message,
  Room,
  ContentFormat,
  MessageDraft,
} from "@community-next/provider";
import { generateUUID, getTimestampInSeconds } from "@community-next/utils";

const initialState = {
  messageIdsInRooms: new Map<string, Array<string>>(),
};

export const createNewMessage = createAsyncThunk<
  Message,
  {
    roomId: string;
    user: User;
    content: string;
    format: ContentFormat;
  }
>("messages/newMessage", async (payload, thunkAPI) => {
  // const response = await fetch(`https://reqres.in/api/users/${userId}`, {
  //   signal: thunkAPI.signal,
  // })
  // return await response.json()

  const { dispatch } = thunkAPI;
  const { roomId, user, content, format } = payload;
  const timestamp = getTimestampInSeconds();

  const message: MessageDraft = {
    id: generateUUID(),
    roomId: roomId,
    userId: user.id,
    displayName: user.displayName,
    format,
    content,
    ipAddress: "::1",
    createdAt: timestamp,
    updatedAt: timestamp,
    status: "sending",
  };

  // add draft to the message list
  dispatch(loadNewMessages({ roomId, messages: [message], users: [user] }));

  try {
    const res = await fetch(`/api/messages/${roomId}/new`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        format,
      }),
    });
    message.status = "sent";
    const newMessage = await res.json();

    // replace draft with this message
    dispatch(
      replaceMessage({
        roomId,
        oldMessageId: message.id,
        newMessageId: newMessage.id,
      })
    );

    return newMessage as Message;
  } catch (ex) {
    // set message's status
    message.status = "failed";
    return message;
  }
});

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    loadNewMessages: (
      state,
      action: PayloadAction<{
        roomId: string;
        messages: Message[];
        users: User[];
      }>
    ) => {
      const { roomId, messages } = action.payload;
      const messageIds = state.messageIdsInRooms.get(roomId) ?? [];
      const set = new Set(messageIds);
      messages.forEach((message) => {
        if (!set.has(message.id)) {
          messageIds.push(message.id);
        }
      });
      state.messageIdsInRooms.set(roomId, messageIds);
    },

    loadOldMessages: (
      state,
      action: PayloadAction<{
        roomId: string;
        messages: Message[];
        users: User[];
      }>
    ) => {
      const { roomId, messages } = action.payload;

      const messageIds = state.messageIdsInRooms.get(roomId) ?? [];
      const set = new Set(messageIds);

      for (let i = messages.length - 1; i >= 0; i--) {
        const message = messages[i];
        if (!set.has(message.id)) {
          messageIds.unshift(message.id);
        }
      }
      state.messageIdsInRooms.set(roomId, messageIds);
    },

    replaceMessage: (
      state,
      action: PayloadAction<{
        roomId: string;
        oldMessageId: string;
        newMessageId: string;
      }>
    ) => {
      const { roomId, oldMessageId, newMessageId } = action.payload;
      const messageIds = state.messageIdsInRooms.get(roomId) ?? [];
      const index = messageIds.indexOf(oldMessageId);
      if (index !== -1) {
        messageIds[index] = newMessageId;
      }
      state.messageIdsInRooms.set(roomId, messageIds);
    },
  },
});

export const { loadNewMessages, loadOldMessages, replaceMessage } =
  messagesSlice.actions;

export default messagesSlice.reducer;
