import React from "react";
import { Box, Flex, Stack } from "@community-next/design-system";
import { roomMessagesSelector, useAppSelector } from "@community-next/redux";
import { MessageItem } from "./MessageItem";

export interface MessagesProps {
  roomId: string;
}

export const Messages: React.FC<MessagesProps> = ({ roomId }) => {
  const messages = useAppSelector(roomMessagesSelector);

  return (
    <Flex className="flex-1">
      <Stack space={4} className="p-3">
        {messages.map(({ user, message }) => (
          <MessageItem user={user} message={message} key={message.id} />
        ))}
      </Stack>
    </Flex>
  );
};
