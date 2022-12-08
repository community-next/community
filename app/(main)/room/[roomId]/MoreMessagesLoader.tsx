import React, { useCallback } from "react";
import {
  currentUserSelector,
  roomMessagesSelector,
  useAppDispatch,
  useAppSelector,
} from "@community-next/redux";
import { Button, Center, Spinner } from "@community-next/design-system";
import { fetchMessages, changeRoom } from "@community-next/redux";

export interface MoreMessagesLoaderProps {}

export const MoreMessagesLoader: React.FC<MoreMessagesLoaderProps> = () => {
  const { roomId, hasMoreResults, loadingMore } =
    useAppSelector(roomMessagesSelector);
  const dispatch = useAppDispatch();

  const handleLoadMore = useCallback(() => {
    if (roomId) {
      dispatch(fetchMessages(roomId));
    }
  }, [dispatch, roomId]);

  if (hasMoreResults === false) {
    return null;
  }

  if (hasMoreResults === true) {
    return (
      <Center className="p-4">
        <Button
          onClick={handleLoadMore}
          variant="secondary"
          disabled={loadingMore}
        >
          Load more
        </Button>
      </Center>
    );
  }

  return (
    <Center className="p-4">{loadingMore ? <Spinner /> : undefined}</Center>
  );
};
