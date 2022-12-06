import React from "react";
import { Box, Flex } from "@community-next/design-system";
import { roomMessagesSelector, useAppSelector } from "@community-next/redux";

export interface MessagesProps {
  roomId: string;
}

export const Messages: React.FC<MessagesProps> = ({ roomId }) => {
  const messages = useAppSelector(roomMessagesSelector);

  return (
    <Flex className="flex-1">
      <Box>
        {messages.map(({ user, message }) => (
          <Flex key={message.id}>{JSON.stringify(message)}</Flex>
        ))}
      </Box>
    </Flex>
  );
};
