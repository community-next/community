import { IProvider } from "@community-next/provider";

import CosmosProvider from "@community-next/provider-cosmos";

const provider = new CosmosProvider();

export function createProvider(): IProvider {
  return provider;
}
