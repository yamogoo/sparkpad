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
    sid: (state) => state._sid,

    allKeys: (state) => state._queue,

    current: (state) => {
      const { _sid } = state;
      if (_sid) return state._queue[_sid];
      return null;
    },

    hasKey: (state) => {
      return (key: string): boolean => {
        return !!state._queue.find((el) => el === key);
      };
    },

    getIndex: (state) => {
      return (key: string): number | undefined => {
        return state._queue.findIndex((el) => el === key) ?? null;
      };
    },
  },
  actions: {
    setSidByIdx(id: number): number {
      this._sid = id;
      return this._sid;
    },

    setSidByKey(key: string): void {
      const idx = this.getIndex(key);
      this._sid = idx;
    },

    add(key: string) {
      const isExists = this.hasKey(key);

      if (!isExists) {
        if (this._sid && this._queue.length >= this._size) this._queue.shift();
        this._queue.push(key);
      }

      this.setSidByKey(key);
    },

    remove(idx: number) {
      this._queue.splice(idx, 1);

      if (this._queue.length > 0) this.toPrevious();
      else this._sid = undefined;
    },

    toPrevious() {
      if (!this.sid) return;

      if (this.sid > 0) this.setSidByIdx(this.sid - 1);
      else if (this.sid === 0 && this._queue.length > 0) {
        this.setSidByIdx(this.sid + 1);
      }
    },
  },
});
