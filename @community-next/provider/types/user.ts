export interface User {
  id: string;
  email: string;
  username?: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: number;
  ipAddressCreated?: string;
  ipAddressLastActivity?: string;
  lastActivityAt: number;
}

export interface Password {
  hash: string;
  salt: string;
  format: string;
}
