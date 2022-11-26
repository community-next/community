import { User } from "../types";

export interface IUserService {
  getUsersByIds(ids: readonly string[]): Promise<User[]>;
  getUserIdByEmail(email: string): Promise<string | null>;
}
