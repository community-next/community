import { IUserService } from "./IUserService";

export interface IProvider {
  userService: IUserService;
}
