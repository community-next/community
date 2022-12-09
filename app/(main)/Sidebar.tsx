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

export function Sidebar() {
  return (
    <Box
      as="nav"
      borderRight
      borderColor
      backgroundColor="gray-secondary"
      className="sidebar absolute md:relative top-0 -left-[362px] bottom-0 md:top-auto md:left-auto md:bottom-auto max-w-[362px] min-w-[250px] z-40 backdrop-filter-none transition-all ease-in-out flex flex-col flex-shrink-0 duration-300 shadow-md"
    >
      <Stack space={3}>
        <HStack as="header" space={4} className="p-6">
          <Center
            border
            borderColor
            color="content3"
            rounded
            className="w-14 h-14"
          >
            <BsFillChatSquareTextFill size="24" />
          </Center>
          <Box>
            <Text textSize="lg" fontWeight="medium">
              Community
            </Text>
            <Text textSize="sm">Hello</Text>
          </Box>
        </HStack>
        <SideMenu
          sections={[
            {
              links: [
                {
                  text: "Home",
                  url: "/",
                  Icon: BsHouseFill,
                  active: true,
                },
              ],
            },
            {
              title: "CHAT",
              links: [
                {
                  text: "Public Chat Room 1",
                  url: "/chat/room/1",
                  Icon: BsFillEmojiSmileFill,
                },
                {
                  text: "Public Chat Room 2",
                  url: "/chat/room/2",
                  Icon: BsFillChatSquareQuoteFill,
                },
              ],
            },
          ]}
        />
      </Stack>
    </Box>
  );
}
