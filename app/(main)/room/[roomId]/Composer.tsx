import React, { useCallback, useState } from "react";
import { Flex, styled } from "@community-next/design-system";
import { sendMessage, useAppDispatch } from "@community-next/redux";
import type { User } from "@community-next/provider";

export interface ComposerProps {
  roomId: string;
  user: User | null;
}

export const Composer: React.FC<ComposerProps> = ({ roomId, user }) => {
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();

  const handleValueChanged = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setContent(newValue);
  };

  const handleKeywordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Enter" || e.shiftKey) {
        return;
      }
      if (!user) {
        return;
      }
      e.preventDefault();

      dispatch(sendMessage({ roomId, user, content, format: 0 }));

      setContent("");
    },
    [content, dispatch, roomId, user]
  );

  return (
    <Flex direction="column" border rounded borderColor className="w-full">
      <styled.textarea
        rounded
        className="p-3 w-full h-full"
        placeholder="Type your message"
        onChange={handleValueChanged}
        onKeyDown={handleKeywordKeyDown}
        disabled={!user}
        value={content}
      />
    </Flex>
  );
};
