import { Box } from "@community-next/design-system/Box";
import { Flex } from "@community-next/design-system/Flex";
import { styled } from "@community-next/design-system/system";
import { Text } from "@community-next/design-system/Typography";

export default function Home() {
  return (
    <Flex direction="column" className="h-screen">
      <Flex className="flex-1">
        <Flex direction="column" className="w-full">
          <Flex
            borderBottom
            borderColor
            className="h-[80px] justify-between p-6"
          >
            <Text fontWeight="medium" textSize="2xl">
              Public Chat Room
            </Text>
          </Flex>
          <Flex className="flex-1"></Flex>
        </Flex>
      </Flex>
      <Flex className="h-[160px] p-6">
        <Flex direction="column" border rounded borderColor className="w-full">
          <styled.textarea
            rounded
            className="p-3 w-full h-full"
            placeholder="Type your message"
          ></styled.textarea>
        </Flex>
      </Flex>
    </Flex>
  );
}
