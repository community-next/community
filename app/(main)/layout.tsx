import {
  BsFillChatSquareQuoteFill,
  BsFillChatSquareTextFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import {
  Box,
  HStack,
  Stack,
  Text,
  Center,
} from "@community-next/design-system";

import { BsHouseFill } from "react-icons/bs";
import { SideMenu } from "./SideMenu";
import { Sidebar } from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
