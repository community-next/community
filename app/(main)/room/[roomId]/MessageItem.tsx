import React, { useCallback, useMemo } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import {
  BackgroundColor,
  Border,
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@community-next/design-system";
import { Message, MessageDraft, User } from "@community-next/provider";
import { sendMessage, useAppDispatch } from "@community-next/redux";
import { Avatar } from "@community-next/design-system/Avatar";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export interface MessageItemProps {
  message: Message;
  user: User;
  isMine?: boolean;
}

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  user,
  isMine,
}) => {
  const dispatch = useAppDispatch();
  const { backgroundColor, border, isFailed } = useMemo(() => {
    const isSending = (message as MessageDraft).status === "sending";
    const isFailed = (message as MessageDraft).status === "failed";
    let backgroundColor: BackgroundColor = "gray";
    if (isMine) {
      backgroundColor = isSending ? "gray-secondary" : "blue";
    }
    const border: Border = !isMine;
    return { backgroundColor, border, isFailed };
  }, [message, isMine]);

  const handleResend = useCallback(() => {
    dispatch(
      sendMessage({
        id: message.id,
        roomId: message.roomId,
        user,
        content: message.content,
        format: message.format,
      })
    );
  }, [
    dispatch,
    message.content,
    message.format,
    message.id,
    message.roomId,
    user,
  ]);

  return (
    <Flex direction={isMine ? "row-reverse" : "row"}>
      <Avatar size="sm" className="m-3" src={user?.avatarUrl} />
      <Stack space={2}>
        <Box
          className="px-4 py-3"
          rounded
          backgroundColor={backgroundColor}
          border={border}
          borderColor="gray"
          color="content2"
        >
          {message.content}
        </Box>
        <Text numberOfLines={1} textSize="sm" color="content3">
          {timeAgo.format(message.createdAt * 1000, "twitter")}
        </Text>
      </Stack>
      <Box>
        {isFailed ? (
          <IconButton
            Icon={BsFillExclamationCircleFill}
            variant="ghost"
            color="red"
            onClick={handleResend}
          />
        ) : undefined}
      </Box>
    </Flex>
  );
};
