import React from "react";
import { Box, Flex, Stack } from "@community-next/design-system";
import {
  currentUserSelector,
  roomMessagesSelector,
  useAppSelector,
} from "@community-next/redux";
import { MessageItem } from "./MessageItem";

export interface MessagesProps {
  roomId: string;
}

export const Messages: React.FC<MessagesProps> = ({ roomId }) => {
  const messages = useAppSelector(roomMessagesSelector);
  const currentUser = useAppSelector(currentUserSelector);

  return (
    <Flex className="flex-1">
      <Stack space={4} className="p-3 w-full">
        {messages.map(({ user, message }) => (
          <MessageItem
            key={message.id}
            user={user}
            message={message}
            isMine={currentUser?.id === message.userId}
          />
        ))}
      </Stack>
    </Flex>
  );
};
