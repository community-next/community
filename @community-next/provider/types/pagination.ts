export interface Pagination {
  pageSize: number;
  continuationToken?: string;
}

export interface PageSet<T> {
  items: T[];
  pageSize: number;
  continuationToken: string;
  hasMoreResults?: boolean;
}
