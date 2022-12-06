import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  Message,
  Room,
  ContentFormat,
  MessageDraft,
} from "@community-next/provider";
import { generateUUID, getTimestampInSeconds } from "@community-next/utils";

interface MessagesInRoom {
  messageIds: string[];
  continuationToken: string | undefined;
  hasMoreResults: boolean | undefined;
}

const initialState = {
  messagesInRooms: {} as Record<string, MessagesInRoom>,
};

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
      const messagesInRoom = state.messagesInRooms[roomId] ?? {
        messageIds: [],
        continuationToken: undefined,
        hasMoreResults: undefined,
      };
      const messageIds = messagesInRoom.messageIds;
      const set = new Set(messageIds);
      messages.forEach((message) => {
        if (!set.has(message.id)) {
          messageIds.push(message.id);
        }
      });

      state.messagesInRooms[roomId] = messagesInRoom;
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
      const messagesInRoom = state.messagesInRooms[roomId] ?? {
        messageIds: [],
        continuationToken: undefined,
        hasMoreResults: undefined,
      };
      const messageIds = messagesInRoom.messageIds;
      const index = messageIds.indexOf(oldMessageId);
      if (index !== -1) {
        messageIds[index] = newMessageId;
      }
      state.messagesInRooms[roomId] = messagesInRoom;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { roomId, messages } = action.payload;
      const messagesInRoom = state.messagesInRooms[roomId] ?? {
        messageIds: [],
        continuationToken: undefined,
        hasMoreResults: undefined,
      };

      const messageIds = messagesInRoom.messageIds;
      const set = new Set(messageIds);

      for (let i = messages.length - 1; i >= 0; i--) {
        const message = messages[i];
        if (!set.has(message.id)) {
          messageIds.unshift(message.id);
        }
      }
      state.messagesInRooms[roomId] = messagesInRoom;
    });
  },
});

export const { loadNewMessages, replaceMessage } = messagesSlice.actions;

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (
    params: {
      roomId: string;
      continuationToken: string | undefined;
    },
    thunkAPI
  ) => {
    const { roomId, continuationToken } = params;
    const res = await fetch(
      `/api/rooms/${roomId}/messages${
        continuationToken ? `?continuationToken=${continuationToken}` : ""
      }`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    const { messages, users, hasMoreResults } = json as {
      messages: Message[];
      users: User[];
      hasMoreResults: boolean;
    };
    return { roomId, messages, users, hasMoreResults };
  }
);

export const createNewMessage = createAsyncThunk<
  Message,
  {
    roomId: string;
    user: User;
    content: string;
    format: ContentFormat;
  }
>("messages/newMessage", async (payload, thunkAPI) => {
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
    const res = await fetch(`/api/rooms/${roomId}/message`, {
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

export default messagesSlice.reducer;
