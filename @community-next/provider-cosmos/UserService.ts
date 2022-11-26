import { User, IUserService } from "@community-next/models";
import { CosmosDB } from "./CosmosDB";

export class UserService implements IUserService {
  private db: CosmosDB;

  constructor(db: CosmosDB) {
    this.db = db;
  }

  async getUsersByIds(ids: readonly string[]): Promise<User[]> {
    const querySpec = {
      query: "select * from c where ARRAY_CONTAINS(@ids, c.id)",
      parameters: [{ name: "@ids", value: ids }],
    };

    return this.db.users.getItemsByIds<User>(ids);
  }

  async getUserIdByEmail(email: string): Promise<string | null> {
    const querySpec = {
      query: "select id from c where c.email=@email",
      parameters: [{ name: "@email", value: email }],
    };
    const res = await this.db.users.getItem<{ id: string }>(querySpec);
    return res?.id ?? null;
  }
}
