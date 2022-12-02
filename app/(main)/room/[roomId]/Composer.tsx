import { Flex, styled } from "@community-next/design-system";
import React, { useCallback, useState } from "react";

export interface ComposerProps {
  roomId: string;
}

export const Composer: React.FC<ComposerProps> = ({ roomId }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValueChanged = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setContent(newValue);
  };

  const handleKeywordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Enter" || e.shiftKey) {
        return;
      }

      e.preventDefault();

      const body = {
        content,
        format: 1,
      };
      setContent("");
      setIsLoading(true);
      fetch(`/api/messages/${roomId}/new`, {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((message) => {
          console.log("#sent", message);
        })
        .catch((ex) => {
          console.error("failed to send", ex);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [content, roomId]
  );

  return (
    <Flex direction="column" border rounded borderColor className="w-full">
      <styled.textarea
        rounded
        className="p-3 w-full h-full"
        placeholder="Type your message"
        onChange={handleValueChanged}
        onKeyDown={handleKeywordKeyDown}
        disabled={isLoading}
        value={content}
      />
    </Flex>
  );
};
