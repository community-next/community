import { Flex } from "@community-next/design-system";
import React from "react";
import { configureAbly, useChannel } from "@ably-labs/react-hooks";

export interface MessagesProps {
  roomId: string;
}

export const Messages: React.FC<MessagesProps> = ({ roomId }) => {
  const [channel] = useChannel(roomId, (message) => {
    console.log("new message", message);
  });

  return <Flex className="flex-1"></Flex>;
};
