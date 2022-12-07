import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, Message, Room } from "@community-next/provider";

interface AuthenticationState {
  isAuthenticated: boolean;
  currentUserId?: string;
}

const initialState: AuthenticationState = {
  isAuthenticated: false,
  currentUserId: undefined,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.currentUserId = user.id;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.currentUserId = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { signedIn, signOut } = authenticationSlice.actions;

export default authenticationSlice.reducer;
