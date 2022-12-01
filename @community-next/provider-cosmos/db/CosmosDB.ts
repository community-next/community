import { CosmosClient, CosmosClientOptions, UniqueKey } from "@azure/cosmos";
import { CosmosContainer } from "./CosmosContainer";
import { containers } from "./schema";

export class CosmosDB {
  private databaseId: string;
  private client: CosmosClient;

  constructor() {
    const endpoint = process.env.COSMOS_ENDPOINT as string;
    const key = process.env.COSMOS_KEY as string;
    this.databaseId = process.env.COSMOS_DATABASE_ID as string;

    const cosmosClientOptions: CosmosClientOptions = { endpoint, key };
    this.client = new CosmosClient(cosmosClientOptions);

    // Create DB (if it doesn't exist)
    this.client.databases
      .createIfNotExists({ id: this.databaseId })
      .then(() => {
        // Create containers (if they don't exist)
        this.ensureContainers();
      });
  }

  get database() {
    return this.client.database(this.databaseId);
  }

  getContainer(name: string) {
    return new CosmosContainer(this.database, name);
  }

  /**
   * Ensure container exists before operation
   *
   * @param partitionKey String
   * @param uniqueKeys UniqueKey[]
   */
  private async ensureContainer(
    name: string,
    partitionKey?: string,
    uniqueKeys?: UniqueKey[]
  ): Promise<void> {
    await this.database.containers.createIfNotExists({
      id: name,
      partitionKey: partitionKey || "/id",
      uniqueKeyPolicy: uniqueKeys?.length
        ? {
            uniqueKeys: uniqueKeys,
          }
        : undefined,
    });
  }

  async ensureContainers() {
    return Promise.all(
      Object.keys(containers).map((name) => {
        const { containerId, partitionKey, uniqueKeys } = containers[name];
        return this.ensureContainer(containerId, partitionKey, uniqueKeys);
      })
    );
  }
}
