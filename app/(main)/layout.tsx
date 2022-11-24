import { BsFillChatSquareTextFill } from "react-icons/bs";
import { Box } from "@community-next/design-system/Box";
import { Container } from "@community-next/design-system/Container";
import { Center } from "@community-next/design-system/Flex";
import { HStack, Stack } from "@community-next/design-system/Stack";
import { Text } from "@community-next/design-system/Typography";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="grid grid-cols-[290px_1fr] h-screen">
        <Box borderRight borderColor>
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
        </Box>
        <div>{children}</div>
      </div>
    </Container>
  );
}
