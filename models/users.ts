import { User } from "@community-next/models";
import { createLoader } from "./dataloader";
import { createProvider } from "./provider";

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
