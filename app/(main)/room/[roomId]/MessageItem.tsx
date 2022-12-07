import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Box, Flex, Stack, Text } from "@community-next/design-system";
import { Message, User } from "@community-next/provider";
import { Avatar } from "@community-next/design-system/Avatar";

export interface MessageItemProps {
  message: Message;
  user: User | undefined;
  isMine?: boolean;
}

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  user,
  isMine,
}) => {
  return (
    <Flex direction={isMine ? "row-reverse" : "row"}>
      <Avatar size="sm" className="m-3" src={user?.avatarUrl} />
      <Stack space={2}>
        <Box
          className="px-4 py-3"
          rounded
          backgroundColor={isMine ? "blue" : "gray"}
          border={!isMine}
          borderColor="gray"
          color="content2"
        >
          {message.content}
        </Box>
        <Text numberOfLines={1} textSize="sm" color="content3">
          {timeAgo.format(message.createdAt, "twitter")}
        </Text>
      </Stack>
    </Flex>
  );
};
