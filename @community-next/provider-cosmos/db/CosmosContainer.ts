import {
  Database,
  UniqueKey,
  SqlQuerySpec,
  FeedOptions,
  Container,
  ItemDefinition,
} from "@azure/cosmos";
import { cleanCosmosProps, cleanCosmosPropsForItems } from "../lib/clean";

export class CosmosContainer {
  private name: string;
  private database: Database;

  constructor(database: Database, name: string) {
    this.name = name;
    this.database = database;
  }

  get container(): Container {
    return this.database.container(this.name);
  }

  /**
   * Generic method for retuning all items of a container using a query.
   * Returns results or an empty type array
   *
   * @param query SQL-like query
   * @param feedOptions Cosmos feed options
   * @returns Array of typed items
   */
  public async getItems<T extends Record<string, any>>(
    query: SqlQuerySpec,
    feedOptions?: FeedOptions
  ): Promise<T[]> {
    const result = await this.container.items
      .query<T>(query, feedOptions)
      .fetchAll();

    if (result.resources && result.resources.length > 0) {
      return cleanCosmosPropsForItems(result.resources);
    }

    // return an empty array if no results are received from Cosmos
    return [] as T[];
  }

  public async getItemsWithContinuationToken<T extends Record<string, any>>(
    query: SqlQuerySpec,
    feedOptions?: FeedOptions
  ) {
    const { resources, hasMoreResults, continuationToken } =
      await this.container.items.query<T>(query, feedOptions).fetchNext();
    const items = cleanCosmosPropsForItems(resources ?? []);
    return { items, hasMoreResults, continuationToken };
  }

  /**
   * Generic method for getting an item from a Cosmos container
   *
   * @param id Id of item
   * @param partitionKey Partition key of item
   * @returns Item
   */
  public async getItemById<T>(id: string, partitionKey?: string): Promise<T> {
    const { resource: item } = await this.container
      .item(id, partitionKey || id)
      .read();
    return cleanCosmosProps(item);
  }

  /**
   * Generic method for upserting (update if exists, otherwise create) item into a Cosmos container
   *
   * @param itemToUpsert Item
   * @returns Upserted item
   */
  public async upsertItem<T>(itemToUpsert: T): Promise<any> {
    const { resource: upsertedItem } = await this.container.items.upsert(
      itemToUpsert
    );
    return upsertedItem;
  }

  public async insertItem<T>(itemToInsert: T): Promise<any> {
    const { resource: insertedItem } = await this.container.items.create(
      itemToInsert as ItemDefinition
    );
    return insertedItem;
  }

  public async getItemsByIds<T extends Record<string, any>>(
    ids: readonly string[]
  ) {
    const querySpec = {
      query: "select * from c where ARRAY_CONTAINS(@ids, c.id)",
      parameters: [{ name: "@ids", value: ids }],
    };
    const result = await this.container.items.query<T>(querySpec).fetchAll();
    return cleanCosmosPropsForItems(result.resources);
  }

  public async getItem<T extends Record<string, any>>(query: SqlQuerySpec) {
    const response = await this.container.items.query<T>(query).fetchAll();
    return cleanCosmosProps(response.resources[0]);
  }
}
