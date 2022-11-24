import { Box } from "@community-next/design-system/Box";
import { Container } from "@community-next/design-system/Container";
import { Center } from "@community-next/design-system/Flex";
import { HStack } from "@community-next/design-system/Stack";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="grid grid-cols-[290px_1fr] h-screen">
        <Box borderRight borderRightColor>
          <HStack as="header" space={4} className="p-6">
            <Center border borderColor rounded className="w-14 h-14"></Center>
          </HStack>
        </Box>
        <div>{children}</div>
      </div>
    </Container>
  );
}
