import {
  IMessageService,
  IProvider,
  IRoomService,
  IUserService,
} from "@community-next/provider";
import { CosmosDB } from "./db";
import { MessageService } from "./MessageService";
import { RoomService } from "./RoomService";
import { UserService } from "./UserService";

export default class CosmosProvider implements IProvider {
  userService: IUserService;
  roomService: IRoomService;
  messageService: IMessageService;

  constructor() {
    const db = new CosmosDB();
    this.userService = new UserService(db);
    this.roomService = new RoomService(db);
    this.messageService = new MessageService(db);
  }
}
