import { Button } from "@community-next/design-system/Button";
import { Center } from "@community-next/design-system/Flex";

export default function Home() {
  return (
    <Center>
      <Button as="a" href="/login">
        Sign in
      </Button>
    </Center>
  );
}
