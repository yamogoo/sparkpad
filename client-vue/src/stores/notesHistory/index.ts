import { defineStore } from "pinia";

interface NotesHistoryStoreState {
  _sid: number | undefined;
  _size: number;
  _queue: Array<string>;
}

export const useNotesHistoryStore = defineStore("history", {
  state: (): NotesHistoryStoreState => ({
    _sid: undefined,
    _size: 6,
    _queue: [],
  }),
  getters: {
    /**
     * @description Current selected index
     */
    sid: (state) => state._sid,

    /**
     * @description All keys in the queue
     */
    allKeys: (state) => state._queue,

    /**
     * @description Current key
     */
    current: (state) => {
      const { _sid } = state;
      if (_sid) return state._queue[_sid];
      return null;
    },

    /**
     * @description Check if key already exist in the queue
     */
    hasKey: (state) => {
      return (key: string): boolean => {
        return !!state._queue.find((el) => el === key);
      };
    },

    /**
     * @description Get index
     */
    getIndex: (state) => {
      return (key: string): number | undefined => {
        return state._queue.findIndex((el) => el === key) ?? null;
      };
    },

    /**
     * @description Get element by index
     */
    getItemByIdx: (state) => {
      return (idx: number): string | undefined => {
        return state._queue[idx];
      };
    },
  },
  actions: {
    /**
     * @description Set current element SID by index (idx)
     */
    setSidByIdx(id: number): number {
      this._sid = id;
      return this._sid;
    },

    /**
     * @description Set current element SID by key (id)
     */
    setSidByKey(key: string): void {
      const idx = this.getIndex(key);
      this._sid = idx;
    },

    /**
     * @description Add new element to queue
     */
    add(key: string) {
      const isExists = this.hasKey(key);

      if (!isExists) {
        if (this._sid && this._queue.length >= this._size) this._queue.shift();
        this._queue.push(key);
      }

      this.setSidByKey(key);
    },

    /**
     * @description Remove element by Index and move to previous (if exists)
     */
    deleteByIdx(idx: number) {
      this._queue.splice(idx, 1);

      if (this._queue.length > 0) this.toPrevious();
      else this._sid = undefined;
    },

    /**
     * @description Remove element by ID and move to previous (if exists)
     */
    deleteById(id: string) {
      const idx = this._queue.findIndex((el) => el === id);
      this._queue.splice(idx, 1);

      if (this._queue.length > 0) this.toPrevious();
      else this._sid = undefined;
    },

    /**
     * @description Go to previous element (if exists)
     */
    toPrevious() {
      if (!this.sid) return;

      if (this.sid > 0) this.setSidByIdx(this.sid - 1);
      else if (this.sid === 0 && this._queue.length > 0) {
        this.setSidByIdx(this.sid + 1);
      }
    },

    /**
     * @description Change current element position in queue
     */
    changePosition(newIdx: number, oldIdx: number): void {
      // this._queue.splice(oldIdx, 0, this._queue.splice(newIdx, 1)[0]);
    },
  },
});
