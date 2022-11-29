import {
  Box,
  Center,
  Text,
  Heading,
  Stack,
} from "@community-next/design-system";
import { SignoutForm } from "./SignoutForm";

export default function Signout() {
  return (
    <Center className="h-screen">
      <Stack space={6}>
        <Box className="text-center">
          <Heading as="h1">Signout</Heading>
          <Text>Are you sure you want to sign out?</Text>
        </Box>
        <SignoutForm />
      </Stack>
    </Center>
  );
}
