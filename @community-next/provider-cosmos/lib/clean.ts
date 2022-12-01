export function cleanCosmosProps<T extends Record<string, any>>(item: T): T {
  delete item["_attachments"];
  delete item["_etag"];
  delete item["_rid"];
  delete item["_self"];
  delete item["_ts"];
  return item;
}

export function cleanCosmosPropsForItems<T extends Record<string, any>>(
  items: Array<T>
): T[] {
  return items.map(cleanCosmosProps);
}
