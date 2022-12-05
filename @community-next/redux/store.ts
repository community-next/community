import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import entitiesReducer from "./reducers/entities";
import messagesReducer from "./reducers/messages";
import roomsReducer from "./reducers/rooms";

export function makeStore() {
  return configureStore({
    reducer: {
      entities: entitiesReducer,
      messages: messagesReducer,
      rooms: roomsReducer,
    },
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
