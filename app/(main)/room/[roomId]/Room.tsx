"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { Flex, Text } from "@community-next/design-system";
import {
  loadNewMessages,
  signedIn,
  store,
  useAppDispatch,
} from "@community-next/redux";
import { Messages } from "./Messages";
import { Composer } from "./Composer";
import { User } from "@community-next/provider";
import { fetchMessages, changeRoom } from "@community-next/redux";

export interface RoomProps {
  roomId: string;
  user: User | null;
}

configureAbly({
  authUrl: "/api/ws/token-request",
});

export const RoomContainer: React.FC<RoomProps> = ({ roomId, user }) => {
  const dispatch = useAppDispatch();
  const [channel] = useChannel(roomId, (msg) => {
    const {
      data: { message, user },
    } = msg;
    dispatch(loadNewMessages({ roomId, messages: [message], users: [user] }));
  });

  useEffect(() => {
    dispatch(changeRoom(roomId));
    dispatch(fetchMessages({ roomId, continuationToken: undefined }));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (user) {
      dispatch(signedIn({ user }));
    }
  }, [dispatch, user]);

  return (
    <Flex direction="column" className="h-screen">
      <Flex className="flex-1">
        <Flex direction="column" className="w-full">
          <Flex
            borderBottom
            borderColor
            className="h-[80px] justify-between p-6"
          >
            <Text fontWeight="medium" textSize="2xl">
              Public Chat Room
            </Text>
          </Flex>
          <Messages roomId={roomId} />
        </Flex>
      </Flex>
      <Flex className="h-[160px] p-6">
        <Composer roomId={roomId} user={user} />
      </Flex>
    </Flex>
  );
};

export const Room: React.FC<RoomProps> = ({ roomId, user }) => (
  <Provider store={store}>
    <RoomContainer roomId={roomId} user={user} />
  </Provider>
);
