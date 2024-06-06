type HistoryQueueItemUID = string;
export interface HistoryQueueItem<T> {
  uid: HistoryQueueItemUID;
  data: T;
}

export type HistoryQueue<D> = Array<HistoryQueueItem<D>>;

export type HistoryQueueSid = number | null;
export class History<D> {
  private _size: number;
  private _queue: HistoryQueue<D>;
  private _sid: HistoryQueueSid;

  constructor(size: number) {
    this._size = size;
    this._sid = null;
    this._queue = [];
  }

  private get length(): number {
    return this._queue.length;
  }

  public get front(): HistoryQueueItem<D> {
    return this._queue[this.length - 1];
  }

  public get current(): HistoryQueueItem<D> | null {
    if (this.sid) {
      return this._queue[this.sid];
    }
    return null;
  }

  public set sid(idx: HistoryQueueSid) {
    this._sid = idx;
  }

  public get sid(): HistoryQueueSid {
    return this._sid;
  }

  public remove(uid: HistoryQueueItemUID): HistoryQueue<D> {
    const isExists = this.has(uid);
    if (isExists && this.length > 0) {
      const idx = this._queue.findIndex((el) => el.uid === uid);
      return this._queue.splice(idx, 0);
    }
    throw Error("Error: Item already exist in history");
  }

  public removeLast(): HistoryQueue<D> {
    this._queue.shift();
    return this._queue;
  }

  public get all() {
    return this._queue;
  }

  private has(uid: HistoryQueueItemUID): boolean {
    return !!this._queue.find((el) => el.uid === uid);
  }

  public add(item: HistoryQueueItem<D>): HistoryQueue<D> {
    const isExists = this.has(item.uid);

    if (!isExists) {
      if (this.length >= this._size) this.removeLast();

      this._queue.push(item);
      this.sid = this.length - 1;
    }

    return this._queue;
  }
}
