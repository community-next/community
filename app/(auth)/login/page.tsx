import {
  Box,
  Center,
  Text,
  Heading,
  Stack,
} from "@community-next/design-system";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <Center className="h-screen">
      <Stack space={6}>
        <Box className="text-center">
          <Heading as="h1">Login</Heading>
          <Text>Enter your email and password to sign in.</Text>
        </Box>
        <LoginForm />
      </Stack>
    </Center>
  );
}
