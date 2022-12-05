import { v4 as uuidv4 } from "uuid";
import { User } from "@community-next/provider";
import { createLoader } from "./dataloader";
import { createProvider } from "./provider";
import { getTimestampInSeconds } from "@community-next/utils";

const provider = createProvider();

const loader = createLoader(provider.userService.getUsersByIds);

export async function getUserById(id: string): Promise<User | null> {
  return loader.findOneById(id);
}

export async function getUserByEmail(email: string) {
  const userId = await provider.userService.getUserIdByEmail(email);
  if (!userId) {
    return null;
  }
  return getUserById(userId);
}

export async function createUser(
  email: string,
  displayName: string,
  avatarUrl?: string
) {
  const timestamp = getTimestampInSeconds();
  const user = {
    id: uuidv4(),
    email,
    displayName,
    avatarUrl,
    createdAt: timestamp,
    lastActivityAt: timestamp,
  };

  await provider.userService.createUser(user);
  return user;
}

export async function updateUser(user: User) {
  await provider.userService.updateUser(user);
}
