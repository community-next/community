"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { configureAbly } from "@ably-labs/react-hooks";
import { Flex, styled, Text } from "@community-next/design-system";
import { store } from "@community-next/redux";
import { Messages } from "./Messages";
import { Composer } from "./Composer";
import { User } from "@community-next/provider";

export interface RoomProps {
  roomId: string;
  user: User | null;
}

configureAbly({
  authUrl: "/api/ws/token-request",
});

export const Room: React.FC<RoomProps> = ({ roomId }) => {
  return (
    <Provider store={store}>
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
          <Composer roomId={roomId} />
        </Flex>
      </Flex>
    </Provider>
  );
};
