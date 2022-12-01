export interface User {
  id: string;
  email: string;
  username?: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: number;
  lastActivityAt: number;
}

export interface Password {
  hash: string;
  salt: string;
  format: string;
}
