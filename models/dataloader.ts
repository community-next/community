import DataLoader from "dataloader";

// https://github.com/graphql/dataloader#batch-function
const orderDocs =
  <V extends { id: string }>(ids: readonly string[]) =>
  (docs: (V | undefined)[], keyFn?: (source: V) => string) => {
    const keyFnDef =
      keyFn ||
      ((source: V & { id: string }) => {
        if (source.id) return source.id;
        throw new Error(
          "Could not find ID for object; if using an alternate key, pass in a key function"
        );
      });

    const checkNotUndefined = (input: V | undefined): input is V => {
      return Boolean(input);
    };

    const idMap: Record<string, V> = docs
      .filter(checkNotUndefined)
      .reduce((prev: Record<string, V>, cur: V) => {
        prev[keyFnDef(cur)] = cur;
        return prev;
      }, {});
    return ids.map((id) => idMap[id]);
  };

export interface Loader<DType> {
  findOneById: (id: string) => Promise<DType | null>;
  findManyByIds: (ids: string[]) => Promise<(DType | null)[]>;
  dataLoader?: DataLoader<string, DType, string>;
}

export const createLoader = <DType extends { id: string }>(
  batchGetItems: (ids: readonly string[]) => Promise<DType[]>,
  trasformItem?: (item: DType) => DType
): Loader<DType> => {
  const loader = new DataLoader<string, DType>(async (ids) => {
    const response = await batchGetItems(ids);

    return orderDocs<DType>(ids)(response);
  });

  const methods = {
    findOneById: async (id: string) => {
      const item = await loader.load(id);
      if (trasformItem) {
        return trasformItem(item);
      }
      return item;
    },

    findManyByIds: (ids: string[]) => {
      return Promise.all(ids.map((id) => methods.findOneById(id)));
    },
    dataLoader: loader,
  };

  return methods;
};
