import type { User } from "@community-next/provider";

export const anonymousUser: User = {
  id: "00000000-0000-0000-0000-000000000000",
  email: "anonymous@local",
  username: "anonymous",
  displayName: "Anonymous",
  avatarUrl: "/img/avatar-default.png",
  createdAt: new Date("1999-09-01T00:00:00.000Z").getTime(),
  lastActivityAt: Date.now(),
};
