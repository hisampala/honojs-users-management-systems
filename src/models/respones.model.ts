export class ResponseItem<T> {
  data = {} as T;
  constructor(item: T) {
    this.data = item;
  }
}
export class ResponseList<T> {
  data: T[] = [];
  limit: number = 10;
  page: number = 0;
  constructor(list: T[], page: number, limit: number) {
    this.data = list;
    this.limit = limit;
    this.page = page;
  }
}
