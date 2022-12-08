import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  User,
  Message,
  Room,
  ContentFormat,
  MessageDraft,
} from "@community-next/provider";
import { generateUUID, getTimestampInSeconds } from "@community-next/utils";
import { updateMessage } from "./entities";
import { AppState } from "../store";

interface MessagesInRoom {
  messageIds: string[];
  continuationToken?: string;
  hasMoreResults?: boolean;
  loadingMore?: boolean;
}

const initialState = {
  messagesInRooms: {} as Record<string, MessagesInRoom>,
};

function getMessagesInRoom(
  state: typeof initialState,
  roomId: string
): MessagesInRoom {
  return (
    state.messagesInRooms[roomId] ?? {
      messageIds: [],
    }
  );
}

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
      const messagesInRoom = getMessagesInRoom(state, roomId);
      const messageIds = messagesInRoom.messageIds;
      const set = new Set(messageIds);
      messages.forEach((message) => {
        if (!set.has(message.id)) {
          messageIds.push(message.id);
        }
      });

      state.messagesInRooms[roomId] = messagesInRoom;
    },
    setLoadingMoreStatus: (
      state,
      action: PayloadAction<{
        roomId: string;
        loadingMore: boolean;
      }>
    ) => {
      const { roomId, loadingMore } = action.payload;
      const messagesInRoom = getMessagesInRoom(state, roomId);
      messagesInRoom.loadingMore = loadingMore;
      state.messagesInRooms[roomId] = messagesInRoom;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        const { roomId, messages, hasMoreResults, continuationToken } =
          action.payload;
        const messagesInRoom = getMessagesInRoom(state, roomId);

        const messageIds = messagesInRoom.messageIds;
        const set = new Set(messageIds);

        for (let i = messages.length - 1; i >= 0; i--) {
          const message = messages[i];
          if (!set.has(message.id)) {
            messageIds.unshift(message.id);
          }
        }
        messagesInRoom.continuationToken = continuationToken;
        messagesInRoom.loadingMore = false;
        messagesInRoom.hasMoreResults = hasMoreResults;
        state.messagesInRooms[roomId] = messagesInRoom;
      })
      .addCase(newMessage.fulfilled, (state, action) => {
        const { roomId, message, draftId, user } = action.payload;
        const messagesInRoom = getMessagesInRoom(state, roomId);
        const messageIds = messagesInRoom.messageIds;
        const index = messageIds.findIndex((id) => id === draftId);
        if (index !== -1) {
          messageIds[index] = message.id;
        } else {
          messageIds.push(message.id);
        }
        messagesInRoom.messageIds = messageIds;
        state.messagesInRooms[roomId] = messagesInRoom;
      });
  },
});

export const { loadNewMessages, setLoadingMoreStatus } = messagesSlice.actions;

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (roomId: string, thunkAPI) => {
    const { getState, dispatch } = thunkAPI;
    const state = getState() as AppState;

    const messagesInRoom = getMessagesInRoom(state.messages, roomId);
    const { loadingMore, continuationToken: token } = messagesInRoom;
    // can't load if it's loading
    if (loadingMore) {
      return;
    }

    dispatch(setLoadingMoreStatus({ roomId, loadingMore: true }));
    try {
      const res = await fetch(
        `/api/rooms/${roomId}/messages${
          token ? `?continuationToken=${encodeURIComponent(token)}` : ""
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
      const { messages, users, hasMoreResults, continuationToken } = json as {
        messages: Message[];
        users: User[];
        hasMoreResults: boolean;
        continuationToken: string;
      };
      return { roomId, messages, users, hasMoreResults, continuationToken };
    } catch (err) {
      return undefined;
    } finally {
      dispatch(setLoadingMoreStatus({ roomId, loadingMore: false }));
    }
  }
);

export const sendMessage = createAsyncThunk<
  { roomId: string; draft: MessageDraft; message?: Message },
  {
    id?: string;
    roomId: string;
    user: User;
    content: string;
    format: ContentFormat;
  }
>("messages/sendMessage", async (payload, thunkAPI) => {
  const { dispatch } = thunkAPI;
  const { id, roomId, user, content, format } = payload;
  const timestamp = getTimestampInSeconds();

  let draft: MessageDraft = {
    id: id ?? generateUUID(),
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

  // send the message first time
  if (!id) {
    // add draft to the message list
    dispatch(
      newMessage({ roomId, message: draft, user: user, draftId: draft.id })
    );
  } else {
    // resend
    dispatch(updateMessage({ message: draft }));
  }

  try {
    const res = await fetch(`/api/rooms/${roomId}/messages`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: draft.id,
        content,
        format,
      }),
    });
    draft = {
      ...draft,
      status: "sent",
    };
    const { message, user } = await res.json();

    return {
      roomId,
      draft,
      message,
      user,
    };
  } catch (ex) {
    // set message's status
    draft = {
      ...draft,
      status: "failed",
    };
    dispatch(updateMessage({ message: draft }));
    return { roomId, draft, message: undefined };
  }
});

// recieved a new message
export const newMessage = createAsyncThunk<
  {
    roomId: string;
    draftId: string;
    user: User;
    message: Message;
  },
  {
    roomId: string;
    draftId: string;
    user: User;
    message: Message;
  }
>("messages/newMessage", async (data, thunkAPI) => {
  const { roomId, message, draftId, user } = data;
  return { roomId, message, draftId, user };
});

export default messagesSlice.reducer;
