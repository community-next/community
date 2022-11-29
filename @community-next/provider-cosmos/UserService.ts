import { User, IUserService } from "@community-next/models";
import { CosmosDB } from "./CosmosDB";

export class UserService implements IUserService {
  private db: CosmosDB;

  constructor(db: CosmosDB) {
    this.db = db;
    this.getUsersByIds = this.getUsersByIds.bind(this);
  }

  async getUsersByIds(ids: readonly string[]): Promise<User[]> {
    return this.db.users.getItemsByIds<User>(ids);
  }

  async getUserIdByEmail(email: string): Promise<string | null> {
    const querySpec = {
      query: "select * from c where c.email=@email",
      parameters: [{ name: "@email", value: email }],
    };
    const res = await this.db.users.getItem<User>(querySpec);
    return res?.id ?? null;
  }

  async createUser(user: User): Promise<User> {
    const res = await this.db.users.upsertItem(user);
    return user;
  }

  async updateUser(user: User): Promise<void> {
    await this.db.users.upsertItem(user);
  }
}
