export type HistoryQueue = Array<string>;

export class History {
  private _size: number;
  private _queue: HistoryQueue;

  constructor(size: number) {
    this._size = size;
    this._queue = [];
  }

  private get length(): number {
    return this._queue.length;
  }

  public get peek(): string {
    return this._queue[this.length - 1];
  }

  public remove(item: string): HistoryQueue {
    const isExists = this.has(item);
    if (isExists && this.length > 0) {
      const idx = this._queue.findIndex((el) => el === item);
      return this._queue.splice(idx, 0);
    }
    throw Error("Error: Item already exist in history");
  }

  public removeLast(): HistoryQueue {
    this._queue.pop();
    return this._queue;
  }

  public get all() {
    return this._queue;
  }

  private has(item: string): boolean {
    return !!this._queue.find((el) => el === item);
  }

  public add(item: string): HistoryQueue {
    const isExists = this.has(item);
    if (!isExists) {
      if (this.length < this._size) {
        this._queue.push(item);
        return this._queue;
      } else {
        this.removeLast();
        this._queue.push(item);
        return this._queue;
      }
    }
    throw Error("Error: Item already exist in history");
  }
}
