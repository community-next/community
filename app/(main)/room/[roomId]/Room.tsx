"use client";
import React, { useEffect } from "react";
import { configureAbly } from "@ably-labs/react-hooks";
import { Flex, styled, Text } from "@community-next/design-system";
import { Messages } from "./Messages";
import { Composer } from "./Composer";

export interface RoomProps {
  roomId: string;
}

configureAbly({
  authUrl: "/api/ws/token-request",
});

export const Room: React.FC<RoomProps> = ({ roomId }) => {
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
        <Composer roomId={roomId} />
      </Flex>
    </Flex>
  );
};
