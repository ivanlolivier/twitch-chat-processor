import type { MessageType } from '../types';

type FilterFn = (m: MessageType) => boolean;

class MessageFilters {
  private filters: FilterFn[];

  constructor() {
    this.filters = [];
  }

  addFilter(cb: FilterFn) {
    this.filters.push(cb);
  }

  mustBeFiltered(message: MessageType) {
    return !this.filters.reduce((prev, cb) => {
      const res = cb(message);
      return res || prev;
    }, false);
  }
}

const messageFilters = new MessageFilters();

export default messageFilters;
