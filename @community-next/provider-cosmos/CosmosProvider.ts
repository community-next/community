import { IProvider, IUserService } from "@community-next/models";
import { CosmosDB } from "./CosmosDB";
import { UserService } from "./UserService";

export default class CosmosProvider implements IProvider {
  userService: IUserService;

  constructor() {
    const db = new CosmosDB();
    this.userService = new UserService(db);
  }
}
