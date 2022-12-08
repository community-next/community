import React from "react";
import {
  currentUserSelector,
  roomMessagesSelector,
  useAppSelector,
} from "@community-next/redux";
import { MessageList } from "./MessageList";

export interface MessagesProps {
  roomId: string;
}

export const Messages: React.FC<MessagesProps> = ({ roomId }) => {
  const { messageItems } = useAppSelector(roomMessagesSelector);
  const currentUser = useAppSelector(currentUserSelector);

  return (
    <MessageList
      roomId={roomId}
      messageItems={messageItems}
      currentUser={currentUser}
    />
  );
};
