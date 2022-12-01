import { IMessageService } from "./IMessageService";
import { IRoomService } from "./IRoomService";
import { IUserService } from "./IUserService";

export interface IProvider {
  userService: IUserService;
  roomService: IRoomService;
  messageService: IMessageService;
}
