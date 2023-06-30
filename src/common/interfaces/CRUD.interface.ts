export interface CRUD<T, C, P> {
  list: (limit: number, page: number) => Promise<T[]>;
  create: (resource: C) => Promise<string>;
  putById: (id: string, resource: P) => Promise<T | null>;
  readById: (id: string) => Promise<T | null>;
  deleteById: (id: string) => Promise<boolean>;
}
