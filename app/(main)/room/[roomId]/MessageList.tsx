"use client";
import React, { Component } from "react";
import { Box, Flex, Stack } from "@community-next/design-system";
import type { User, Message } from "@community-next/provider";
import { MessageItem } from "./MessageItem";
import { debounce } from "@community-next/utils";
import { MoreMessagesLoader } from "./MoreMessagesLoader";

interface MessageItem {
  message: Message;
  user: User;
}

interface Snapshot {
  isSticked: boolean;
  clientHeight: number;
  scrollHeight: number;
  firstMessageId: string | undefined;
}

export interface MessageListProps {
  roomId: string;
  currentUser: User | undefined;
  messageItems: MessageItem[];
}

export class MessageList extends Component<MessageListProps> {
  containerRef: React.RefObject<HTMLDivElement>;
  scrollerRef: React.RefObject<HTMLDivElement>;
  resizeObserver: ResizeObserver | undefined;
  lastClientHeight: number;
  thresholds: number;
  isSticked: boolean;
  handleContainerResizeDebounce: () => void;

  constructor(props: MessageListProps) {
    super(props);
    this.containerRef = React.createRef<HTMLDivElement>();
    this.scrollerRef = React.createRef<HTMLDivElement>();
    this.lastClientHeight = 0;
    this.thresholds = 20;
    this.isSticked = true;
    this.handleContainerResize = this.handleContainerResize.bind(this);
    this.handleContainerResizeDebounce = debounce(
      this.handleContainerResize,
      200
    );
  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver(
      this.handleContainerResizeDebounce
    );
    this.lastClientHeight = this.scrollerRef.current!.clientHeight;
    this.scrollToBottom();
    if (this.containerRef.current) {
      this.resizeObserver.observe(this.containerRef.current);
    }
  }

  componentWillUnmount() {
    this.resizeObserver?.disconnect();
  }

  componentDidUpdate(
    prevProps: MessageListProps,
    prevState: {},
    snapshot: Snapshot
  ) {
    const scroller = this.scrollerRef.current;
    if (!snapshot || !scroller) {
      return;
    }

    const firstMessageId = this.getFirstMessageId(this.props);

    if (snapshot.isSticked) {
      this.scrollToBottom();
      this.isSticked = true;
    } else if (firstMessageId !== snapshot.firstMessageId) {
      // insert to the top
      scroller.scrollTop = scroller.scrollHeight - snapshot.scrollHeight;
    }

    this.lastClientHeight = snapshot.clientHeight;
  }

  getSnapshotBeforeUpdate(prevProps: MessageListProps): Snapshot {
    const scroller = this.scrollerRef.current!;
    return {
      isSticked: this.isSticky(),
      clientHeight: scroller.clientHeight,
      scrollHeight: scroller.scrollHeight,
      firstMessageId: this.getFirstMessageId(prevProps),
    };
  }

  isSticky() {
    const scroller = this.scrollerRef.current!;
    const topHeight = Math.round(scroller.scrollTop + scroller.clientHeight);
    return scroller.scrollHeight - topHeight < this.thresholds;
  }

  getFirstMessageId(props: MessageListProps) {
    return props.messageItems[0]?.message.id;
  }

  scrollToBottom() {
    const scroller = this.scrollerRef.current!;
    scroller.scroll({ top: scroller.scrollHeight, behavior: "smooth" });
  }

  handleContainerResize = () => {
    const container = this.containerRef.current;
    if (!container) {
      return;
    }

    const currentHeight = container.clientHeight;

    const diff = currentHeight - this.lastClientHeight;

    if (diff >= 1) {
      if (!this.isSticked) {
        container.scrollTop = Math.round(container.scrollTop) - diff;
      }
    } else {
      container.scrollTop = container.scrollTop - diff;
    }

    this.lastClientHeight = container.clientHeight;
  };

  handleScroll = () => {
    this.isSticked = this.isSticky();
  };

  render() {
    const { messageItems, currentUser } = this.props;
    return (
      <Flex
        className="flex-1 overflow-y-auto"
        ref={this.scrollerRef}
        onScroll={this.handleScroll}
      >
        <Stack space={4} className="p-3 w-full" ref={this.containerRef}>
          <MoreMessagesLoader />
          {messageItems.map(({ user, message }) => (
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
  }
}
