import { User, IUserService } from "@community-next/provider";
import { CosmosDB, containers, CosmosContainer } from "./db";

export class UserService implements IUserService {
  private container: CosmosContainer;

  constructor(db: CosmosDB) {
    this.getUsersByIds = this.getUsersByIds.bind(this);
    this.container = db.getContainer(containers.users.containerId);
  }

  async getUsersByIds(ids: readonly string[]): Promise<User[]> {
    const users = await this.container.getItemsByIds<User>(ids);
    return users;
  }

  async getUserIdByEmail(email: string): Promise<string | null> {
    const querySpec = {
      query: "select * from c where c.email=@email",
      parameters: [{ name: "@email", value: email }],
    };
    const res = await this.container.getItem<User>(querySpec);
    return res?.id ?? null;
  }

  async createUser(user: User): Promise<User> {
    const res = await this.container.insertItem(user);
    return user;
  }

  async updateUser(user: User): Promise<void> {
    await this.container.upsertItem(user);
  }
}
