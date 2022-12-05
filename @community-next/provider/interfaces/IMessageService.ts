import { Message, Pagination, PageSet } from "../types";

export interface IMessageService {
  newMessage(message: Message): Promise<Message>;

  getMessages(roomId: string, page: Pagination): Promise<PageSet<Message>>;
}
