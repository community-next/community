import { IProvider } from "@community-next/models";

import CosmosProvider from "@community-next/provider-cosmos";

const provider = new CosmosProvider();

export function createProvider(): IProvider {
  return provider;
}
