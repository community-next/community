import {
  CosmosClient,
  CosmosClientOptions,
  Database,
  Container as DBContainer,
  FeedOptions,
  SqlQuerySpec,
} from "@azure/cosmos";

export class Container {
  private name: string;
  private database: Database;
  private partitionKey?: string;

  constructor(database: Database, name: string, partitionKey?: string) {
    this.name = name;
    this.database = database;
    this.partitionKey = partitionKey;

    // Create Containers (if they doesn't exist)
    this.ensureContainer();
  }

  get container(): DBContainer {
    return this.database.container(this.name);
  }

  /**
   * Ensure container exists before operation
   *
   * @param container Container
   * @param partitionKey Property to be used as partition key
   */
  private async ensureContainer(): Promise<void> {
    await this.database.containers.createIfNotExists({
      id: this.name,
      partitionKey: this.partitionKey || "/id",
    });
  }

  /**
   * Generic method for retuning all items of a container using a query.
   * Returns results or an empty type array
   *
   * @param query SQL-like query
   * @param feedOptions Cosmos feed options
   * @returns Array of typed items
   */
  public async getItems<T>(
    query: SqlQuerySpec,
    feedOptions?: FeedOptions
  ): Promise<T[]> {
    const result = await this.container.items
      .query(query, feedOptions)
      .fetchAll();

    if (result.resources && result.resources.length > 0) {
      return result.resources;
    }

    // return an empty array if no results are received from Cosmos
    return [] as T[];
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
    return item;
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

  public async getItemsByIds<T>(ids: readonly string[]) {
    const querySpec = {
      query: "select * from c where ARRAY_CONTAINS(@ids, c.id)",
      parameters: [{ name: "@ids", value: ids }],
    };
    const response = await this.container.items.query<T>(querySpec).fetchAll();
    return response.resources;
  }

  public async getItem<T>(query: SqlQuerySpec) {
    const response = await this.container.items.query<T>(query).fetchAll();
    return response.resources[0];
  }
}

export class CosmosDB {
  private database: string;
  private client: CosmosClient;

  users: Container;

  constructor() {
    const endpoint = process.env.COSMOS_ENDPOINT as string;
    const key = process.env.COSMOS_KEY as string;
    this.database = process.env.COSMOS_DATABASE_ID as string;

    const cosmosClientOptions: CosmosClientOptions = { endpoint, key };
    this.client = new CosmosClient(cosmosClientOptions);

    // Create DB (if it doesn't exist)
    this.client.databases.createIfNotExists({ id: this.database });

    const database = this.client.database(this.database);

    this.users = new Container(database, "users");
  }
}
