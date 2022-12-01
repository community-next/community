import {
  Message,
  IMessageService,
  PageSet,
  Pagination,
} from "@community-next/models";
import { CosmosDB, containers, CosmosContainer } from "./db";

export class MessageService implements IMessageService {
  private container: CosmosContainer;

  constructor(db: CosmosDB) {
    this.container = db.getContainer(containers.messages.containerId);
  }

  async newMessage(message: Message): Promise<Message> {
    const res = await this.container.insertItem(message);
    return message;
  }

  async getMessages(
    conversationId: string,
    page: Pagination
  ): Promise<PageSet<Message>> {
    const querySpec = {
      query: "SELECT * from c where c.conversationId = @conversationId",
      parameters: [{ name: "@conversationId", value: conversationId }],
    };
    const { items, hasMoreResults, continuationToken } =
      await this.container.getItemsWithContinuationToken<Message>(querySpec, {
        maxItemCount: page.pageSize,
        continuationToken: page.continuationToken,
      });

    return {
      items,
      pageSize: page.pageSize,
      continuationToken: page.continuationToken,
      hasMoreResults,
    };
  }
}
